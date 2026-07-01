import { KEY_PROJECT } from '$lib/constants';
import type { Breakpoint } from '$lib/types';
import { read, write } from '$lib/utilities';
import { createDefaultProject } from '$lib/project/create-default-project';
import settings from '$lib/stores/settings.svelte';

// 0 - 768
// 768 - 1200
// 1200 - 2000 || largest + 400

class Project {
	#breakpoints = $state<Breakpoint[]>([]);
	#sortedBreakpoints = $derived(
		this.breakpoints.sort((a, b) => a.width - b.width)
	);
	// #widths = $derived(this.sortedBreakpoints.map(breakpoint => breakpoint.width));

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

	createNewProject() {
		this.breakpoints = createDefaultProject({
			type: settings.type,
			unit: settings.unit
		});
	}
}

const project = new Project();
export default project;
