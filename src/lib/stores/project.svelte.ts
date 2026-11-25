import {
	DEFAULT_PROJECT_TYPE,
	LOCAL_STORAGE_KEY_SETTINGS
} from '#lib/constants.js';

import type {
	FontSizeUnit,
	LetterSpacingUnit,
	ProjectSettings,
	ProjectType,
	Tag,
	TagPlacement
} from '#lib/types.js';
import {
	guessFallback,
	isFallback,
	type Fallback
} from '#lib/domain/export/fallback.js';
import { adjustNumberPrecision } from '#lib/domain/project/adjust-number-precision.js';
import {
	convertFontSize,
	convertLetterSpacing,
	fontSizeInPx
} from '#lib/domain/project/convert-units.js';
import { createDefaultBaseSize } from '#lib/domain/project/create-default-base-size.js';
import { matchedTargets } from '#lib/domain/project/lane-links.js';
import { toSpecimen } from '#lib/domain/project/to-specimen.js';
import { validateBreakpoints } from '#lib/domain/project/validate-draft.js';
import {
	fluidPlacementError,
	type FluidEnd
} from '#lib/domain/tags/fluid-placement.js';
import { read, write } from '#lib/utilities.js';

import BreakpointsRepository from './breakpoints-repository.svelte';
import DraftRepository from './draft-repository.svelte';
import FontsRepository from './fonts-repository.svelte';
import LanesRepository from './lanes-repository.svelte';
import TagsRepository from './tags-repository.svelte';

class Project {
	#type = $state<ProjectType>(DEFAULT_PROJECT_TYPE);
	#fontSizeUnit = $state<FontSizeUnit>('rem');
	#letterSpacingUnit = $state<LetterSpacingUnit>('rem');

	#precision = $state<number>(3);
	#fallbacks = $state<Record<string, Fallback>>({});
	#prefix = $state<string>('');
	#shorthand = $state(false);

	lanes = new LanesRepository();
	fonts = new FontsRepository();
	breakpoints = new BreakpointsRepository();
	tags = new TagsRepository();
	draft = new DraftRepository();

	constructor() {
		const cached = read<ProjectSettings>(LOCAL_STORAGE_KEY_SETTINGS);

		if (cached) {
			// settings saved before project types existed have no type
			this.#type = cached.type ?? DEFAULT_PROJECT_TYPE;
			this.#fontSizeUnit = cached.fontSizeUnit;
			this.#letterSpacingUnit = cached.letterSpacingUnit;
			this.precision = cached.precision;
			this.#prefix =
				typeof cached.prefix === 'string' ? cached.prefix : '';
			this.#fallbacks = Object.fromEntries(
				Object.entries(cached.fallbacks ?? {}).filter(([, value]) =>
					isFallback(value)
				)
			) as Record<string, Fallback>;
		}

		// projects made before breakpoints existed still need a root to tag on
		if (this.breakpoints.breakpoints.length === 0) {
			this.breakpoints.reset(
				DraftRepository.defaultBreakpoints(this.type)
			);
		}

		$effect.root(() => {
			$effect(() => {
				write<ProjectSettings>(LOCAL_STORAGE_KEY_SETTINGS, {
					type: this.type,
					fontSizeUnit: this.fontSizeUnit,
					letterSpacingUnit: this.letterSpacingUnit,
					precision: this.precision,
					fallbacks: this.#fallbacks,
					prefix: this.#prefix,
					shorthand: this.#shorthand
				});
			});
		});
	}

	/** Fixed once the project is created; set through `draft` in /new. */
	get type() {
		return this.#type;
	}

	/** Change it with `changeFontSizeUnit`, which can convert sizes. */
	get fontSizeUnit() {
		return this.#fontSizeUnit;
	}

	/** Change it with `changeLetterSpacingUnit`, which can convert values. */
	get letterSpacingUnit() {
		return this.#letterSpacingUnit;
	}

	/**
	 * Switches the font size unit. With `convert`, every base size and custom
	 * font size is converted so the type stays the same size; without, the
	 * numbers stay as they are and take on the new unit.
	 */
	changeFontSizeUnit(to: FontSizeUnit, convert: boolean) {
		const from = this.#fontSizeUnit;

		if (convert && from !== to) {
			const round = (n: number) =>
				adjustNumberPrecision(
					convertFontSize(n, from, to),
					this.precision
				);

			for (const lane of this.lanes.lanes) {
				const overrides = $state.snapshot(lane.overrides);

				for (const override of Object.values(overrides)) {
					if (override.fontSize !== undefined) {
						override.fontSize = round(override.fontSize);
					}
				}

				this.lanes.update(lane.id, {
					baseSize: round(lane.baseSize),
					overrides
				});
			}
		}

		this.#fontSizeUnit = to;
	}

	/** Whether any specimen has its own letter spacing to convert. */
	get hasCustomLetterSpacing() {
		return this.lanes.lanes.some((lane) =>
			Object.values(lane.overrides).some(
				(override) => override.letterSpacing !== undefined
			)
		);
	}

	/**
	 * Switches the letter spacing unit. With `convert`, custom letter spacing
	 * is converted at each specimen's font size; values that can't be (to or
	 * from ch) keep their numbers.
	 */
	changeLetterSpacingUnit(to: LetterSpacingUnit, convert: boolean) {
		const from = this.#letterSpacingUnit;

		if (convert && from !== to) {
			for (const lane of this.lanes.lanes) {
				const overrides = $state.snapshot(lane.overrides);

				for (const [step, override] of Object.entries(overrides)) {
					if (override.letterSpacing === undefined) {
						continue;
					}

					const fontSize = toSpecimen(
						lane,
						Number(step),
						this.precision
					).fontSize;
					const converted = convertLetterSpacing(
						override.letterSpacing,
						from,
						to,
						fontSizeInPx(fontSize, this.#fontSizeUnit)
					);

					if (converted !== undefined) {
						override.letterSpacing = adjustNumberPrecision(
							converted,
							this.precision
						);
					}
				}

				this.lanes.update(lane.id, { overrides });
			}
		}

		this.#letterSpacingUnit = to;
	}

	get precision() {
		return this.#precision;
	}

	set precision(value: number) {
		this.#precision = value;
	}

	/** Put before every exported name, such as `type-` for `.type-h1`. */
	get prefix() {
		return this.#prefix;
	}

	set prefix(value: string) {
		this.#prefix = value;
	}

	/** Exports write the `font` shorthand instead of its longhands. */
	get shorthand() {
		return this.#shorthand;
	}

	set shorthand(value: boolean) {
		this.#shorthand = value;
	}

	/** The generic family a font falls back to in exports. */
	fallbackFor(family: string): Fallback {
		const key = family.trim();
		return this.#fallbacks[key] ?? guessFallback(key);
	}

	setFallback(family: string, fallback: Fallback) {
		this.#fallbacks[family.trim()] = fallback;
	}

	/** Breakpoint ids, smallest first; what tag placement methods expect. */
	get breakpointOrder() {
		return this.breakpoints.breakpoints.map((bp) => bp.id);
	}

	/**
	 * Deletes a lane along with every tag placement on it. A source's first
	 * linked lane takes over as the source.
	 */
	deleteLane(id: string) {
		this.lanes.delete(id);
		this.tags.forgetLane(id, this.breakpointOrder);
		this.#dropStrandedMax();
	}

	/**
	 * Whether another lane can be linked to a source: each linked lane lines
	 * up with a breakpoint after the first, so a group can't outgrow them.
	 */
	canLink(sourceId: string) {
		const group = this.lanes.group(sourceId);

		return (
			group !== undefined &&
			group.source.id === sourceId &&
			group.members.length < this.breakpoints.breakpoints.length
		);
	}

	/** Links a new lane to a source and matches its tags onto it. */
	linkLane(sourceId: string) {
		if (!this.canLink(sourceId)) {
			return undefined;
		}

		const lane = this.lanes.link(sourceId);

		if (lane && this.lanes.get(sourceId)?.matchSteps) {
			this.#matchGroup(sourceId, false);
		}

		return lane;
	}

	/** The lane keeps its font and its tags, and stands alone. */
	unlinkLane(id: string) {
		this.lanes.unlink(id);
	}

	/**
	 * Turns matching steps on or off for a group. Turning it on fills in the
	 * breakpoints a tag isn't placed on yet, without moving any it is.
	 */
	setMatchSteps(sourceId: string, on: boolean) {
		this.lanes.update(sourceId, { matchSteps: on });

		if (on) {
			this.#matchGroup(sourceId, false);
		}
	}

	// matching steps, for every tag placed on the source at the first
	// breakpoint; `replace` moves placements the tag already has there
	#matchGroup(sourceId: string, replace: boolean) {
		const first = this.breakpointOrder[0];

		for (const tag of this.tags.tags) {
			const placement = tag.placements[first];

			if (placement?.laneId === sourceId) {
				this.#placeMatched(tag.id, sourceId, placement.step, replace);
			}
		}
	}

	#placeMatched(
		tagId: string,
		sourceId: string,
		step: number,
		replace: boolean
	) {
		const group = this.lanes.group(sourceId);
		const tag = this.tags.get(tagId);
		const placed: { laneId: string; breakpointId: string }[] = [];

		if (!group || !tag || group.source.id !== sourceId) {
			return placed;
		}

		for (const target of matchedTargets(group, this.breakpointOrder)) {
			if (!replace && target.breakpointId in tag.placements) {
				continue;
			}

			const placement = { laneId: target.laneId, step };

			if (this.placementError(tagId, target.breakpointId, placement)) {
				continue;
			}

			this.tags.assign(
				tagId,
				target.breakpointId,
				placement,
				this.breakpointOrder
			);
			placed.push(target);
		}

		return placed;
	}

	// the group a placement matches from, when matching steps is on for it
	#matchingSource(breakpointId: string, laneId: string) {
		const group = this.lanes.group(laneId);

		return breakpointId === this.breakpointOrder[0] &&
			group?.source.id === laneId &&
			group.members.length > 1 &&
			group.source.matchSteps
			? group
			: undefined;
	}

	/**
	 * Why a tag can't be placed on a specimen at a breakpoint, or undefined
	 * when it can. Only fluid projects have rules: see fluidPlacementError.
	 */
	placementError(
		tagId: string,
		breakpointId: string,
		placement: TagPlacement
	): string | undefined {
		const tag = this.tags.get(tagId);
		const [min, max] = this.breakpoints.breakpoints;

		if (this.type !== 'fluid' || !tag || !min || !max) {
			return undefined;
		}

		const end = (id: string): FluidEnd | undefined => {
			const at = id === breakpointId ? placement : tag.placements[id];
			const lane = at && this.lanes.get(at.laneId);

			return lane && at ? { lane, step: at.step } : undefined;
		};

		return fluidPlacementError(end(min.id), end(max.id), this.precision);
	}

	/**
	 * Places a tag, unless the placement breaks the project's rules. Returns
	 * false when it can't, or the placements matching steps made with it.
	 */
	assignTag(tagId: string, breakpointId: string, placement: TagPlacement) {
		if (this.placementError(tagId, breakpointId, placement)) {
			return false;
		}

		this.tags.assign(tagId, breakpointId, placement, this.breakpointOrder);

		const matched = this.#matchingSource(breakpointId, placement.laneId)
			? this.#placeMatched(tagId, placement.laneId, placement.step, true)
			: [];

		return { matched };
	}

	/**
	 * Removes a tag's own placement at a breakpoint. In a fluid project a max
	 * can't stand without its min, so removing the min removes both.
	 */
	unassignTag(tagId: string, breakpointId: string) {
		const removed = this.tags.get(tagId)?.placements[breakpointId];
		const group =
			removed && this.#matchingSource(breakpointId, removed.laneId);

		this.tags.unassign(tagId, breakpointId, this.breakpointOrder);

		// matched placements go with it, unless they were moved by hand
		if (group && removed) {
			for (const target of matchedTargets(group, this.breakpointOrder)) {
				const placed =
					this.tags.get(tagId)?.placements[target.breakpointId];

				if (
					placed?.laneId === target.laneId &&
					placed.step === removed.step
				) {
					this.tags.unassign(
						tagId,
						target.breakpointId,
						this.breakpointOrder
					);
				}
			}
		}

		this.#dropStrandedMax();
	}

	// fluid tags slide from min to max, so a max with no min goes
	#dropStrandedMax() {
		const [min, max] = this.breakpoints.breakpoints;

		if (this.type !== 'fluid' || !min || !max) {
			return;
		}

		for (const tag of this.tags.tags) {
			if (!(min.id in tag.placements) && max.id in tag.placements) {
				this.tags.unassign(tag.id, max.id, this.breakpointOrder);
			}
		}
	}

	/**
	 * Widens or narrows a lane's step range, keeping tags on real steps. A
	 * group shares one range, so every lane in it moves together.
	 */
	stepLane(
		id: string,
		key: 'maxStep' | 'minStep',
		direction: 'increment' | 'decrement'
	) {
		const members = this.lanes.group(id)?.members ?? [];

		for (const member of members) {
			this.lanes[direction](member.id, key);
			this.tags.clampLane(member.id, member.minStep, member.maxStep);
		}
	}

	/** Why a breakpoint change can't be made, or undefined when it can. */
	breakpointError(
		change: Parameters<BreakpointsRepository['preview']>[0]
	): string | undefined {
		return validateBreakpoints(
			this.type,
			this.breakpoints.preview(change)
		)[0];
	}

	addBreakpoint(name: string, width: number) {
		if (this.type !== 'standard') {
			return undefined;
		}

		return this.breakpoints.add({ name: name.trim(), width });
	}

	updateBreakpoint(
		id: string,
		patch: Partial<{ name: string; width: number }>
	) {
		this.breakpoints.update(id, {
			...patch,
			...(patch.name !== undefined && { name: patch.name.trim() })
		});
		// a width change can reorder breakpoints and so where tags start
		this.tags.syncBreakpoints(this.breakpointOrder);
	}

	/** Only standard projects remove breakpoints, and never the root. */
	removeBreakpoint(id: string) {
		if (this.type !== 'standard' || this.breakpoints.root?.id === id) {
			return;
		}

		this.breakpoints.remove(id);
		this.tags.syncBreakpoints(this.breakpointOrder);
	}

	/** Replaces the project with the one described by the draft. */
	create() {
		const draft = $state.snapshot({
			type: this.draft.type,
			fontSizeUnit: this.draft.fontSizeUnit,
			letterSpacingUnit: this.draft.letterSpacingUnit,
			breakpoints: this.draft.breakpoints,
			tags: this.draft.tags
		});

		this.#type = draft.type;
		this.#fontSizeUnit = draft.fontSizeUnit;
		this.#letterSpacingUnit = draft.letterSpacingUnit;
		this.#fallbacks = {};
		this.#prefix = '';
		this.#shorthand = false;
		this.breakpoints.reset(draft.breakpoints);

		const lane = LanesRepository.defaultLane();
		lane.baseSize = createDefaultBaseSize({ unit: draft.fontSizeUnit });

		// widen the lane so every templated tag lands on a real step
		for (const tag of draft.tags) {
			if (tag.step !== null) {
				lane.minStep = Math.min(lane.minStep, tag.step);
				lane.maxStep = Math.max(lane.maxStep, tag.step);
			}
		}

		this.lanes.lanes = [lane];

		const root = this.breakpoints.root!;

		this.tags.reset(
			draft.tags.map((tag): Tag => ({
				id: tag.id,
				name: tag.name.trim(),
				startsAt: root.id,
				placements:
					tag.step === null
						? {}
						: { [root.id]: { laneId: lane.id, step: tag.step } }
			}))
		);

		this.draft.reset();
	}
}
const project = new Project();
export default project;
