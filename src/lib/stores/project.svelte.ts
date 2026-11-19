import { LOCAL_STORAGE_KEY_SETTINGS } from '#lib/constants.js';

import type { LetterSpacingUnit, ProjectSettings, FontSizeUnit } from '#lib/types.js';
import { read, write } from '#lib/utilities.js';

// import BreakpointRepository from './breakpoints-repository.svelte'; // this is getting deleted
import FontsRepository from './fonts-repository.svelte';
import LanesRepository from './lanes-repository.svelte';

class Project {
	#fontSizeUnit = $state<FontSizeUnit>('rem');
	#letterSpacingUnit = $state<LetterSpacingUnit>('rem');

	#precision = $state<number>(3);

	lanes = new LanesRepository();
	fonts = new FontsRepository();

	constructor() {
		const cached = read<ProjectSettings>(LOCAL_STORAGE_KEY_SETTINGS);

		if (cached) {
			this.fontSizeUnit = cached.fontSizeUnit;
			this.letterSpacingUnit = cached.letterSpacingUnit;
			this.precision = cached.precision;
		}

		$effect.root(() => {
			$effect(() => {
				write<ProjectSettings>(LOCAL_STORAGE_KEY_SETTINGS, {
					fontSizeUnit: this.fontSizeUnit,
					letterSpacingUnit: this.letterSpacingUnit,
					precision: this.precision
				});
			});
		});
	}

	get fontSizeUnit() {
		return this.#fontSizeUnit;
	}

	set fontSizeUnit(value: FontSizeUnit) {
		this.#fontSizeUnit = value;
	}
	
	get letterSpacingUnit() {
		return this.#letterSpacingUnit;
	}

	set letterSpacingUnit(value: LetterSpacingUnit) {
		this.#letterSpacingUnit = value;
	}

	get precision() {
		return this.#precision;
	}

	set precision(value: number) {
		this.#precision = value;
	}

	create() {
		// this.breakpoints.reset(this.unit, this.type);
		this.lanes.reset();
	}
}
const project = new Project();
export default project;
