import { type ProjectType, type Unit } from '../types';

import { createProject } from '../helpers';
import { projectStore } from '../store';

export const setNewProject = (newUnit: Unit, newType: ProjectType) => {
	projectStore.setState((state) => {
		const { settings, breakpoints, type } = createProject(newUnit, newType);

		state.type = type;
		state.settings = settings;
		state.breakpoints = breakpoints;
	});
};
