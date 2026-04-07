import { type Bounds } from '../types';
import { projectStore } from '../store';

export const useBounds = (id: string) => {
	return projectStore(
		(state) =>
			state.breakpoints.find((breakpoint) => breakpoint.id === id)?.bounds
	);
};

export const incrementBound = (id: string, key: keyof Bounds) => {
	projectStore.setState((state) => {
		const index = state.breakpoints.findIndex(
			(breakpoint) => breakpoint.id === id
		);

		const breakpoint = state.breakpoints[index];
		breakpoint.bounds[key] = breakpoint.bounds[key] + 1;
	});
};

export const decrementBound = (id: string, key: keyof Bounds) => {
	projectStore.setState((state) => {
		const index = state.breakpoints.findIndex(
			(breakpoint) => breakpoint.id === id
		);

		const breakpoint = state.breakpoints[index];
		breakpoint.bounds[key] = breakpoint.bounds[key] - 1;
	});
};
