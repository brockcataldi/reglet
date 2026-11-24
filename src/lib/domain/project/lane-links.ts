import type { Lane, TypeSetting } from '#lib/types.js';

/** What a linked lane takes from its source: everything but the scale. */
export const FONT_KEYS = [
	'family',
	'weight',
	'style',
	'variationSettings'
] as const satisfies (keyof TypeSetting)[];

/** A copy of a lane's font, safe to put on another lane. */
export const fontOf = (lane: TypeSetting): TypeSetting => ({
	family: lane.family,
	weight: lane.weight,
	style: lane.style,
	...(lane.variationSettings && {
		variationSettings: { ...lane.variationSettings }
	})
});

/** A copy of a lane that stands alone: no link, and nothing to match. */
export const withoutLink = (lane: Lane, keepMatching = false): Lane => {
	const copy = { ...lane };
	delete copy.linkedTo;

	if (!keepMatching) {
		delete copy.matchSteps;
	}

	return copy;
};

/** A source lane followed by the lanes linked to it, in column order. */
export type LaneGroup = {
	source: Lane;
	members: Lane[];
};

/**
 * Groups lanes by link. Expects lanes already put in order by
 * normalizeLinks, so each source is followed by its linked lanes.
 */
export const toLaneGroups = (lanes: Lane[]): LaneGroup[] => {
	const groups: LaneGroup[] = [];

	for (const lane of lanes) {
		const group = groups.at(-1);

		if (lane.linkedTo && group?.source.id === lane.linkedTo) {
			group.members.push(lane);
		} else {
			groups.push({ source: lane, members: [lane] });
		}
	}

	return groups;
};

/**
 * Puts lanes into a valid linked order:
 * - a link to a lane that's gone, to itself or to another linked lane (only
 *   one level is allowed) is dropped, so that lane stands alone again
 * - every linked lane sits right after its source and its earlier siblings,
 *   so a group fills neighbouring columns
 * - linked lanes wear their source's font and share its step range, so a
 *   group's rows line up
 * Lanes that need no change are returned as they are.
 */
export const normalizeLinks = (lanes: Lane[]): Lane[] => {
	const byId = new Map(lanes.map((lane) => [lane.id, lane]));

	const isValidLink = (lane: Lane) => {
		if (!lane.linkedTo || lane.linkedTo === lane.id) {
			return false;
		}

		const source = byId.get(lane.linkedTo);
		return source !== undefined && !source.linkedTo;
	};

	const fixed = lanes.map((lane): Lane => {
		if (!lane.linkedTo) {
			return lane;
		}

		if (!isValidLink(lane)) {
			return withoutLink(lane);
		}

		const source = byId.get(lane.linkedTo)!;

		return sameFont(lane, source) &&
			lane.minStep === source.minStep &&
			lane.maxStep === source.maxStep
			? lane
			: {
					...lane,
					...fontOf(source),
					minStep: source.minStep,
					maxStep: source.maxStep
				};
	});

	const ordered: Lane[] = [];
	const placed = new Set<string>();

	for (const lane of fixed) {
		if (placed.has(lane.id) || lane.linkedTo) {
			continue;
		}

		ordered.push(lane);
		placed.add(lane.id);

		for (const linked of fixed) {
			if (linked.linkedTo === lane.id) {
				ordered.push(linked);
				placed.add(linked.id);
			}
		}
	}

	return ordered;
};

const sameFont = (a: TypeSetting, b: TypeSetting) =>
	a.family === b.family &&
	a.weight === b.weight &&
	a.style === b.style &&
	JSON.stringify(a.variationSettings ?? {}) ===
		JSON.stringify(b.variationSettings ?? {});

/**
 * Removes a lane. When it's a source, its first linked lane takes over as
 * the source and keeps the rest linked, rather than everything unlinking.
 */
export const removeLane = (lanes: Lane[], id: string): Lane[] => {
	const heir = lanes.find((lane) => lane.linkedTo === id);
	const removed = lanes.find((lane) => lane.id === id);

	return normalizeLinks(
		lanes
			.filter((lane) => lane.id !== id)
			.map((lane): Lane => {
				if (!heir || lane.linkedTo !== id) {
					return lane;
				}

				if (lane.id === heir.id) {
					return { ...withoutLink(lane), matchSteps: removed?.matchSteps };
				}

				return { ...lane, linkedTo: heir.id };
			})
	);
};

/**
 * Where matching steps sends a tag placed on a group's source at the first
 * breakpoint: the nth linked lane takes the nth breakpoint after it. Lanes
 * past the last breakpoint get nothing.
 */
export const matchedTargets = (
	group: LaneGroup,
	breakpointIds: string[]
): { laneId: string; breakpointId: string }[] =>
	group.members
		.slice(1)
		.map((lane, index) => ({
			laneId: lane.id,
			breakpointId: breakpointIds[index + 1]
		}))
		.filter((target) => target.breakpointId !== undefined);
