import { type ProjectType, type Unit } from '../types';

import { convertUnit } from '../helpers';
import { projectStore } from '../store';

export const useSettingsUnit = () => {
	return projectStore((state) => state.settings.unit);
};

export const useSettingsPrecision = () => {
	return projectStore((state) => state.settings.precision);
};

export const useSettingsType = () => {
	return projectStore((state) => state.type);
};

export const setSettingsType = (type: ProjectType) => {
	projectStore.setState((state) => {
		state.type = type;
	});
};

export const setSettingsUnit = (unit: Unit) => {
	projectStore.setState((state) => {
		const oldUnit = state.settings.unit;
		state.settings.unit = unit;

		if (state.type === 'traditional') {
			for (let i = 0; i < state.breakpoints.length; i++) {
				state.breakpoints[i].breakpoint.base = convertUnit(
					state.breakpoints[i].breakpoint.base,
					oldUnit,
					unit
				);
			}
			return;
		}

		state.breakpoints.min.base = convertUnit(
			state.breakpoints.min.base,
			oldUnit,
			unit
		);
		state.breakpoints.max.base = convertUnit(
			state.breakpoints.max.base,
			oldUnit,
			unit
		);
	});
};

export const setSettingsPrecision = (precision: number) => {
	projectStore.setState((state) => {
		state.settings.precision = precision;
	});
};
