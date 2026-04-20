import { projectStore } from './store';
import type { Breakpoint, BreakpointWidth, ProjectType } from './types';

export const getProjectType = (): ProjectType => {
	return projectStore.getState().type;
};

export const getBreakpoints = (): Breakpoint[] => {
	return projectStore.getState().breakpoints;
};

export const getBreakpointWidths = (): BreakpointWidth[] => {
	return projectStore
		.getState()
		.breakpoints.toSorted((a, b) => a.width - b.width)
		.map((breakpoint) => ({
			id: breakpoint.id,
			width: breakpoint.width,
		}));
};
