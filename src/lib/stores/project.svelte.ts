import {
	DEFAULT_PROJECT_TYPE,
	FLUID_SCALE_DEFAULT,
	LOCAL_STORAGE_KEY_SETTINGS
} from '#lib/constants.js';

import type {
	FontSizeUnit,
	LetterSpacingUnit,
	ProjectSettings,
	ProjectType,
	Tag
} from '#lib/types.js';
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
			this.fontSizeUnit = cached.fontSizeUnit;
			this.letterSpacingUnit = cached.letterSpacingUnit;
			this.precision = cached.precision;
		}

		$effect.root(() => {
			$effect(() => {
				write<ProjectSettings>(LOCAL_STORAGE_KEY_SETTINGS, {
					type: this.type,
					fontSizeUnit: this.fontSizeUnit,
					letterSpacingUnit: this.letterSpacingUnit,
					precision: this.precision
				});
			});
		});
	}

	/** Fixed once the project is created; set through `draft` in /new. */
	get type() {
		return this.#type;
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

	/** Replaces the project with the one described by the draft. */
	create() {
		const draft = $state.snapshot({
			type: this.draft.type,
			breakpoints: this.draft.breakpoints,
			tags: this.draft.tags
		});

		this.#type = draft.type;
		this.breakpoints.reset(draft.breakpoints);

		const lane = LanesRepository.defaultLane();

		if (draft.type === 'fluid') {
			lane.fluid = { ...FLUID_SCALE_DEFAULT };
		}

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
