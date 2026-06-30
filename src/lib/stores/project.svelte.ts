import type { Breakpoint } from '$lib/types';
import { read, write } from '$lib/utilities';
import { createDefaultProject } from '$lib/stores/project';
import settings from '$lib/stores/settings.svelte';
import { KEY_PROJECT } from '$lib/constants';

class Project {
	#breakpoints = $state<Breakpoint[]>([]);

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

	createNewProject() {
		this.breakpoints = createDefaultProject({
			type: settings.type,
			unit: settings.unit
		});
	}
}

const project = new Project();
export default project;
