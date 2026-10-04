import { LOCAL_STORAGE_KEY_SETTINGS } from '#lib/constants.js';

import type { ProjectSettings, ProjectType, Unit } from '#lib/types.js';
import { read, write } from '#lib/utilities.js';

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

	constructor() {
		const cached = read<ProjectSettings>(LOCAL_STORAGE_KEY_SETTINGS);

		if (cached) {
			this.type = cached.type;
			this.unit = cached.unit;
			this.precision = cached.precision;
		}

		$effect.root(() => {
			$effect(() => {
				write<ProjectSettings>(LOCAL_STORAGE_KEY_SETTINGS, {
					type: this.type,
					unit: this.unit,
					precision: this.precision
				});
			});
		});
	}

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
		this.breakpoints.reset(this.unit, this.type);
		this.lanes.reset();
	}
}

const project = new Project();
export default project;
