import { LOCAL_STORAGE_KEY_BREAKPOINTS } from '$lib/constants';
import type { Breakpoint } from '$lib/types';
import { createId, read, write } from '$lib/utilities';

class BreakpointRepository {
	#breakpoints = $state<Breakpoint[]>([]);
	#sorted = $derived(
		this.breakpoints.toSorted((a, b) => a.width - b.width)
	);

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

	set breakpoints(value: Breakpoint[]) {
		this.#breakpoints = value;
	}

	get sorted() {
		return this.#sorted;
	}

	get(id: string) {
		return this.breakpoints.find((breakpoint) => breakpoint.id === id);
	}

	create(newBreakpoint: Omit<Breakpoint, 'id'>) {
		this.breakpoints.push({
			...newBreakpoint,
			id: createId()
		});
	}

	updateValue<K extends keyof Breakpoint>(
		id: string,
		key: K,
		value: Breakpoint[K]
	) {
		const breakpoint = this.breakpoints.find(
			(breakpoint) => breakpoint.id === id
		);

		if (!breakpoint) {
			return;
		}

		breakpoint[key] = value;
	}

	updateOverrideValue<
		O extends keyof Breakpoint['overrides'],
		K extends keyof Breakpoint['overrides'][O]
	>(
		breakpointId: string,
		overrideId: O,
		overrideProperty: K,
		value: Breakpoint['overrides'][O][K]
	) {
		const breakpoint = this.breakpoints.find(
			(breakpoint) => breakpoint.id === breakpointId
		);

		if (!breakpoint) {
			return;
		}

		if (!(overrideId in breakpoint.overrides)) {
			breakpoint.overrides[overrideId] = {};
		}

		breakpoint.overrides[overrideId][overrideProperty] = value;
	}

	updateDefaultScaleValue<K extends keyof Breakpoint['defaultScale']>(
		breakpointId: string,
		key: K,
		value: Breakpoint['defaultScale'][K]
	) {
		const breakpoint = this.breakpoints.find(
			(breakpoint) => breakpoint.id === breakpointId
		);

		if (!breakpoint) {
			return;
		}

		breakpoint.defaultScale[key] = value;
	}

	duplicate(id: string) {
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

	delete(id: string) {
		const index = this.breakpoints.findIndex(
			(breakpoint) => breakpoint.id === id
		);

		if (index !== undefined) {
			this.breakpoints = this.breakpoints.toSpliced(index, 1);
		}
	}
}

export default BreakpointRepository;
