import { LOCAL_STORAGE_KEY_BREAKPOINTS } from '#lib/constants.js';
import type { Breakpoint } from '#lib/types.js';
import { read, write } from '#lib/utilities.js';

/** The project's breakpoints, smallest first; the first is the root. */
class BreakpointsRepository {
	#breakpoints = $state<Breakpoint[]>([]);

	constructor() {
		const cached = read<Breakpoint[]>(LOCAL_STORAGE_KEY_BREAKPOINTS);

		if (cached) {
			this.breakpoints = cached;
		}

		$effect.root(() => {
			$effect(() => {
				write(LOCAL_STORAGE_KEY_BREAKPOINTS, this.breakpoints);
			});
		});
	}

	get breakpoints() {
		return this.#breakpoints;
	}

	set breakpoints(breakpoints: Breakpoint[]) {
		this.#breakpoints = breakpoints;
	}

	get root(): Breakpoint | undefined {
		return this.breakpoints[0];
	}

	get(id: string) {
		return this.breakpoints.find((bp) => bp.id === id);
	}

	reset(breakpoints: Breakpoint[]) {
		this.breakpoints = breakpoints.toSorted((a, b) => a.width - b.width);
	}
}

export default BreakpointsRepository;
