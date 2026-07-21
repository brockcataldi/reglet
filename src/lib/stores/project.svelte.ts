import {
	KEY_PROJECT_BREAKPOINTS,
	KEY_PROJECT_LANES
} from '$lib/constants';
import type { Breakpoint, Lane } from '$lib/types';

import { createId, read, write } from '$lib/utilities';
import { createDefaultBreakpoints } from '$lib/project/create-default-breakpoints';
import { createDefaultLane } from '$lib/project/create-default-lane';

import settings from '$lib/stores/settings.svelte';

class Project {
	#breakpoints = $state<Breakpoint[]>([]);
	#lanes = $state<Lane[]>([]);

	#sortedBreakpoints = $derived(
		this.breakpoints.toSorted((a, b) => a.width - b.width)
	);

	constructor() {
		const cachedBreakpoints = read<Breakpoint[]>(KEY_PROJECT_BREAKPOINTS);
		const cachedLanes = read<Lane[]>(KEY_PROJECT_LANES);

		if (cachedBreakpoints && cachedLanes) {
			this.breakpoints = cachedBreakpoints;
			this.lanes = cachedLanes;
		}

		$effect.root(() => {
			$effect(() => {
				write(KEY_PROJECT_BREAKPOINTS, this.breakpoints);
				write(KEY_PROJECT_LANES, this.lanes);
			});
		});
	}

	get breakpoints() {
		return this.#breakpoints;
	}

	set breakpoints(value: Breakpoint[]) {
		this.#breakpoints = value;
	}

	get lanes() {
		return this.#lanes;
	}

	set lanes(value: Lane[]) {
		this.#lanes = value;
	}

	get sortedBreakpoints() {
		return this.#sortedBreakpoints;
	}

	readBreakpoint(id: string) {
		return this.breakpoints.find((breakpoint) => breakpoint.id === id);
	}

	createBreakpoint(newBreakpoint: Omit<Breakpoint, 'id'>) {
		this.breakpoints.push({
			...newBreakpoint,
			id: createId()
		});
	}

	duplicateBreakpoint(id: string) {
		const breakpoint = this.breakpoints.find(
			(breakpoint) => breakpoint.id === id
		);

		if (!breakpoint) {
			return;
		}

		this.breakpoints.push({
			...breakpoint,
			id: createId(),
			width: breakpoint.width + 1,
			label: `${breakpoint.label} Copy`
		});
	}

	updateBreakpointName(id: string, label: string) {
		const breakpoint = this.breakpoints.find(
			(breakpoint) => breakpoint.id === id
		);

		if (!breakpoint) {
			return;
		}

		breakpoint.label = label;
	}

	updateBreakpointWidth(id: string, value: number) {
		const breakpoint = this.breakpoints.find(
			(breakpoint) => breakpoint.id === id
		);

		if (!breakpoint) {
			return;
		}

		breakpoint.width = value;
	}

	deleteBreakpoint(id: string) {
		const index = this.breakpoints.findIndex(
			(breakpoint) => breakpoint.id === id
		);

		if (index !== undefined) {
			this.breakpoints = this.breakpoints.toSpliced(index, 1);
		}
	}

	createNewProject() {
		this.breakpoints = createDefaultBreakpoints({
			type: settings.type,
			unit: settings.unit
		});

		this.lanes = [createDefaultLane()];
	}
}

const project = new Project();
export default project;
