import { type Bounds } from '../types';
import { projectStore } from '../store';

export const useBounds = (id: number) => {
	return projectStore((state) => state.breakpoints[id].bounds);
};

export const incrementBound = (id: number, key: keyof Bounds) => {
	projectStore.setState((state) => {
		if (!(id in state.breakpoints)) {
			return;
		}

		const breakpoint = state.breakpoints[id];
		breakpoint.bounds[key] = breakpoint.bounds[key] + 1;
	});
};

export const decrementBound = (id: number, key: keyof Bounds) => {
	projectStore.setState((state) => {
		if (!(id in state.breakpoints)) {
			return;
		}

		const breakpoint = state.breakpoints[id];
		breakpoint.bounds[key] = breakpoint.bounds[key] - 1;
	});
};
