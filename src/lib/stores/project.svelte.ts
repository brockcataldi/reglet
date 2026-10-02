import { createDefaultBreakpoints } from '#lib/domain/project/create-default-breakpoints.js';
import { createDefaultLane } from '#lib/domain/project/create-default-lane.js';

import type { ProjectType, Unit } from '#lib/types.js';

import BreakpointRepository from './breakpoints-repository.svelte';
import FontsRepository from './fonts-repository.svelte';
import LanesRepository from './lanes-repository.svelte';

class Project {
	#type = $state<ProjectType>('standard');
	#unit = $state<Unit>('rem');
	#precision = $state<number>(3);

	breakpoints = new BreakpointRepository();
	lanes = new LanesRepository();
	fonts = new FontsRepository();

	get type() {
		return this.#type;
	}

	set type(value: ProjectType) {
		this.#type = value;
	}

	get unit() {
		return this.#unit;
	}

	set unit(value: Unit) {
		this.#unit = value;
	}

	get precision() {
		return this.#precision;
	}

	set precision(value: number) {
		this.#precision = value;
	}

	create() {
		this.breakpoints.breakpoints = createDefaultBreakpoints({
			type: this.type,
			unit: this.unit
		});

		this.lanes.lanes = [createDefaultLane()];
	}
}

const project = new Project();
export default project;
