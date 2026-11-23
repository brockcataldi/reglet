import { LOCAL_STORAGE_KEY_LANES } from '#lib/constants.js';
import type { Lane } from '#lib/types.js';
import { createId, read, write } from '#lib/utilities.js';

class LanesRepository {
	#lanes = $state<Lane[]>([]);

	constructor() {
		const cachedLanes = read<Lane[]>(LOCAL_STORAGE_KEY_LANES);

		if (cachedLanes) {
			this.lanes = cachedLanes;
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

	/** Lanes are numbered by position, from 1; 0 when the lane is gone. */
	number(id: string) {
		return this.lanes.findIndex((lane) => lane.id === id) + 1;
	}

	/** "Lane 2" */
	name(id: string) {
		const number = this.number(id);
		return number === 0 ? 'Deleted lane' : `Lane ${number}`;
	}

	/**
	 * "Lane 2 · Roboto 400 italic": lanes can share a family and weight, so
	 * the number tells them apart.
	 */
	label(id: string) {
		const lane = this.get(id);

		if (!lane) {
			return this.name(id);
		}

		const style = lane.style === 'normal' ? '' : ` ${lane.style}`;

		return `${this.name(id)} · ${lane.family} ${lane.weight}${style}`;
	}

	/**
	 * "Step 3 · Lane 2 · Roboto 400": how the specimen view names a placement.
	 * Lane numbers shift when an earlier lane is deleted, so the family and
	 * weight keep it recognizable.
	 */
	describeStep(id: string, step: number) {
		return `Step ${step} · ${this.label(id)}`;
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

	update(id: string, patch: Partial<Omit<Lane, 'id'>>) {
		const lane = this.lanes.find((lane) => lane.id === id);

		if (!lane) {
			return;
		}

		Object.assign(lane, patch);
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

		// snapshot so nested objects (overrides, variationSettings) aren't shared
		this.lanes.push({
			...$state.snapshot(lane),
			id: createId()
		});
	}

	delete(id: string) {
		const index = this.lanes.findIndex((lane) => lane.id === id);

		if (index !== undefined) {
			this.lanes = this.lanes.toSpliced(index, 1);
		}
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
