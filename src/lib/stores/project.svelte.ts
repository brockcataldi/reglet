import { KEY_PROJECT } from '$lib/constants';
import type { Breakpoint } from '$lib/types';

import { read, write } from '$lib/utilities';
import { createDefaultProject } from '$lib/project/create-default-project';

import settings from '$lib/stores/settings.svelte';

class Project {
	#breakpoints = $state<Breakpoint[]>([]);

	#sortedBreakpoints = $derived(
		this.breakpoints.toSorted((a, b) => a.width - b.width)
	);

	constructor() {
		const cached = read<Breakpoint[]>(KEY_PROJECT);

		if (cached) {
			this.breakpoints = cached;
		}

		$effect.root(() => {
			$effect(() => {
				write(KEY_PROJECT, this.breakpoints);
			});
		});
	}

	get breakpoints() {
		return this.#breakpoints;
	}

	set breakpoints(value: Breakpoint[]) {
		this.#breakpoints = value;
	}

	get sortedBreakpoints() {
		return this.#sortedBreakpoints;
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
		this.breakpoints = createDefaultProject({
			type: settings.type,
			unit: settings.unit
		});
	}
}

const project = new Project();
export default project;
