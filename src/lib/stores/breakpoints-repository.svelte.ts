import { LOCAL_STORAGE_KEY_BREAKPOINTS } from '#lib/constants.js';
import type { Breakpoint } from '#lib/types.js';
import { createId, read, write } from '#lib/utilities.js';

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
		this.breakpoints = BreakpointsRepository.sort(breakpoints);
	}

	/** The breakpoints as they'd be after a change, for validating first. */
	preview(change: {
		add?: Omit<Breakpoint, 'id'>;
		update?: { id: string; patch: Partial<Omit<Breakpoint, 'id'>> };
		remove?: string;
	}): Omit<Breakpoint, 'id'>[] {
		let next: Omit<Breakpoint, 'id'>[] = this.breakpoints
			.filter((bp) => bp.id !== change.remove)
			.map((bp) =>
				bp.id === change.update?.id
					? { ...bp, ...change.update.patch }
					: bp
			);

		if (change.add) {
			next = [...next, change.add];
		}

		return BreakpointsRepository.sort(next);
	}

	add(breakpoint: Omit<Breakpoint, 'id'>): Breakpoint {
		const created = { ...breakpoint, id: createId() };
		this.reset([...this.breakpoints, created]);
		return created;
	}

	/** Width changes re-sort, which can change what inherits from what. */
	update(id: string, patch: Partial<Omit<Breakpoint, 'id'>>) {
		this.reset(
			this.breakpoints.map((bp) =>
				bp.id === id ? { ...bp, ...patch } : bp
			)
		);
	}

	remove(id: string) {
		this.breakpoints = this.breakpoints.filter((bp) => bp.id !== id);
	}

	static sort<T extends { width: number }>(breakpoints: T[]): T[] {
		return breakpoints.toSorted((a, b) => a.width - b.width);
	}
}

export default BreakpointsRepository;
