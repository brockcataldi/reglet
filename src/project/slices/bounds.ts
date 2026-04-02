import { isFluidBreakpointsKey, type Bounds } from '../types';
import { projectStore } from '../store';

export const useBounds = (id: string) => {
	return projectStore((state) => {
		if (state.type === 'fluid') {
			if (isFluidBreakpointsKey(id)) {
				return state.breakpoints[id].bounds;
			}
			return;
		}
		return state.breakpoints.find((t) => t.id === id)?.breakpoint.bounds;
	});
};

export const incrementBound = (id: string, key: keyof Bounds) => {
	projectStore.setState((state) => {
		if (state.type === 'fluid') {
			if (isFluidBreakpointsKey(id)) {
				const breakpoint = state.breakpoints[id];
				breakpoint.bounds[key] = breakpoint.bounds[key] + 1;
			}
			return;
		}

		const breakpoint = state.breakpoints.find(
			(t) => t.id === id
		)?.breakpoint;

		if (!breakpoint) {
			return;
		}
		breakpoint.bounds[key] = breakpoint.bounds[key] + 1;
	});
};

export const decrementBound = (id: string, key: keyof Bounds) => {
	projectStore.setState((state) => {
		if (state.type === 'fluid') {
			if (isFluidBreakpointsKey(id)) {
				const breakpoint = state.breakpoints[id];
				breakpoint.bounds[key] = breakpoint.bounds[key] - 1;
			}
			return;
		}

		const breakpoint = state.breakpoints.find(
			(t) => t.id === id
		)?.breakpoint;

		if (!breakpoint) {
			return;
		}
		breakpoint.bounds[key] = breakpoint.bounds[key] - 1;
	});
};
