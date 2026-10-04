import {
	LOCAL_STORAGE_KEY_BREAKPOINTS,
	PROJECT_DEFAULTS
} from '#lib/constants.js';
import { createDefaultBaseSize } from '#lib/domain/project/create-default-base-size.js';
import type { Breakpoint, ProjectType, Unit } from '#lib/types.js';
import { createId, read, write } from '#lib/utilities.js';

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

	reset(unit: Unit, type: ProjectType) {
		this.breakpoints = BreakpointRepository.defaultBreakpoints(unit, type);
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

	updateCellOverrideValue<
		O extends keyof Breakpoint['cellOverrides'],
		K extends keyof Breakpoint['cellOverrides'][O]
	>(
		breakpointId: string,
		overrideId: O,
		overrideProperty: K,
		value: Breakpoint['cellOverrides'][O][K]
	) {
		const breakpoint = this.breakpoints.find(
			(breakpoint) => breakpoint.id === breakpointId
		);

		if (!breakpoint) {
			return;
		}

		if (!(overrideId in breakpoint.cellOverrides)) {
			breakpoint.cellOverrides[overrideId] = {};
		}

		breakpoint.cellOverrides[overrideId][overrideProperty] = value;
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

	static defaultBreakpoint(
		width: number,
		label: string,
		unit: Unit,
		modifier: number
	): Breakpoint {
		return {
			id: createId(),
			width,
			label,
			minStep: -1,
			maxStep: 6,
			defaultScale: {
				baseSize: createDefaultBaseSize({ unit }) * modifier,
				ratio: 1.2
			},
			cellOverrides: {}
		};
	}

	static defaultBreakpoints(unit: Unit, type: ProjectType): Breakpoint[] {
		return PROJECT_DEFAULTS[type].map(({ width, label, modifier }) =>
			BreakpointRepository.defaultBreakpoint(width, label, unit, modifier)
		);
	}
}

export default BreakpointRepository;
