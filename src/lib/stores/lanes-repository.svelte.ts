import { LOCAL_STORAGE_KEY_LANES } from '#lib/constants.js';
import {
	FONT_KEYS,
	fontOf,
	normalizeLinks,
	removeLane,
	toLaneGroups,
	withoutLink
} from '#lib/domain/project/lane-links.js';
import type { Lane } from '#lib/types.js';
import { createId, read, write } from '#lib/utilities.js';

class LanesRepository {
	#lanes = $state<Lane[]>([]);

	constructor() {
		const cachedLanes = read<Lane[]>(LOCAL_STORAGE_KEY_LANES);

		if (cachedLanes) {
			this.lanes = normalizeLinks(cachedLanes);
		}

		$effect.root(() => {
			$effect(() => {
				write(LOCAL_STORAGE_KEY_LANES, this.lanes);
			});
		});
	}

	get lanes() {
		return this.#lanes;
	}

	set lanes(lanes: Lane[]) {
		this.#lanes = lanes;
	}

	get(id: string) {
		return this.lanes.find((lane) => lane.id === id);
	}

	/** The source lane and the lanes linked to it, in column order. */
	get groups() {
		return toLaneGroups(this.lanes);
	}

	/** The group a lane belongs to, as source or linked lane. */
	group(id: string) {
		return this.groups.find((group) =>
			group.members.some((lane) => lane.id === id)
		);
	}

	/**
	 * "2" or "1b": groups are numbered by position, from 1, and linked lanes
	 * take a letter after their source's number. Empty when the lane is gone.
	 */
	number(id: string) {
		const groups = this.groups;
		const index = groups.findIndex((group) =>
			group.members.some((lane) => lane.id === id)
		);

		if (index === -1) {
			return '';
		}

		const member = groups[index].members.findIndex(
			(lane) => lane.id === id
		);
		const letter = member === 0 ? '' : String.fromCharCode(97 + member);

		return `${index + 1}${letter}`;
	}

	/** "Lane 2" or "Lane 1b" */
	name(id: string) {
		const number = this.number(id);
		return number === '' ? 'Deleted lane' : `Lane ${number}`;
	}

	/**
	 * "Lane 2 (Roboto 400 italic)": lanes can share a family and weight, so
	 * the number tells them apart.
	 */
	label(id: string) {
		const lane = this.get(id);

		if (!lane) {
			return this.name(id);
		}

		const style = lane.style === 'normal' ? '' : ` ${lane.style}`;

		return `${this.name(id)} (${lane.family} ${lane.weight}${style})`;
	}

	reset() {
		this.lanes = LanesRepository.defaultLanes();
	}

	create(lane: Omit<Lane, 'id'>) {
		this.lanes.push({
			...lane,
			id: createId()
		});
	}

	/**
	 * A linked lane's font comes from its source, so font changes to it are
	 * ignored, and font changes to a source carry over to its linked lanes.
	 */
	update(id: string, patch: Partial<Omit<Lane, 'id' | 'linkedTo'>>) {
		const lane = this.lanes.find((lane) => lane.id === id);

		if (!lane) {
			return;
		}

		const changes: Partial<Lane> = { ...patch };

		if (lane.linkedTo) {
			for (const key of FONT_KEYS) {
				delete changes[key];
			}
		}

		Object.assign(lane, changes);

		if (FONT_KEYS.some((key) => key in changes)) {
			for (const linked of this.lanes) {
				if (linked.linkedTo === lane.id) {
					Object.assign(linked, fontOf(lane));
				}
			}
		}
	}

	/**
	 * Adds a lane linked to a source lane, after the source's other linked
	 * lanes. It starts as a copy of the source's scale and step range.
	 */
	link(sourceId: string) {
		const source = this.get(sourceId);

		if (!source || source.linkedTo) {
			return undefined;
		}

		const lane: Lane = {
			...fontOf(source),
			id: createId(),
			linkedTo: source.id,
			overrides: {},
			baseSize: source.baseSize,
			ratio: source.ratio,
			minStep: source.minStep,
			maxStep: source.maxStep
		};

		source.matchSteps ??= true;
		this.lanes = normalizeLinks([...this.lanes, lane]);

		return this.get(lane.id);
	}

	/** The lane keeps its copy of the font and moves out after its group. */
	unlink(id: string) {
		this.lanes = normalizeLinks(
			this.lanes.map((lane) =>
				lane.id === id ? withoutLink(lane, true) : lane
			)
		);
	}

	increment<K extends Extract<keyof Lane, 'maxStep' | 'minStep'>>(
		id: string,
		key: K
	) {
		const lane = this.lanes.find((lane) => lane.id === id);

		if (!lane) {
			return;
		}

		lane[key] = lane[key] + 1;
	}

	decrement<K extends Extract<keyof Lane, 'maxStep' | 'minStep'>>(
		id: string,
		key: K
	) {
		const lane = this.lanes.find((lane) => lane.id === id);

		if (!lane) {
			return;
		}

		lane[key] = lane[key] - 1;
	}

	updateOverrideValue<
		S extends keyof Lane['overrides'],
		P extends keyof Lane['overrides'][S]
	>(id: string, step: S, key: P, value: Lane['overrides'][S][P]) {
		const lane = this.lanes.find((lane) => lane.id === id);

		if (!lane) {
			return;
		}

		if (!(step in lane.overrides)) {
			lane.overrides[step] = {};
		}

		lane.overrides[step][key] = value;
	}

	duplicate(id: string) {
		const lane = this.lanes.find((lane) => lane.id === id);

		if (!lane) {
			return;
		}

		// snapshot so nested objects (overrides, variationSettings) aren't
		// shared; the copy stands alone, since a group fills neighbouring columns
		this.lanes.push({
			...withoutLink($state.snapshot(lane)),
			id: createId()
		});
	}

	/** Deleting a source makes its first linked lane the new source. */
	delete(id: string) {
		this.lanes = removeLane(this.lanes, id);
	}

	static defaultLane(): Lane {
		return {
			id: createId(),
			family: 'Arial',
			weight: '400',
			style: 'normal',
			overrides: {},
			baseSize: 1,
			ratio: 1.2,
			minStep: -1,
			maxStep: 6
		};
	}

	static defaultLanes(): Lane[] {
		return [LanesRepository.defaultLane()];
	}
}

export default LanesRepository;
