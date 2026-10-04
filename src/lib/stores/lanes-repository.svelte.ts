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

	reset() {
		this.lanes = LanesRepository.defaultLanes();
	}

	create(lane: Omit<Lane, 'id'>) {
		this.lanes.push({
			...lane,
			id: createId()
		});
	}

	updateValue<K extends keyof Lane>(id: string, key: K, value: Lane[K]) {
		const lane = this.lanes.find((lane) => lane.id === id);

		if (!lane) {
			return;
		}

		lane[key] = value;
	}

	duplicate(id: string) {
		const lane = this.lanes.find((lane) => lane.id === id);

		if (!lane) {
			return;
		}

		this.lanes.push({
			...lane,
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
			style: 'normal'
		};
	}

	static defaultLanes(): Lane[] {
		return [LanesRepository.defaultLane()];
	}
}

export default LanesRepository;
