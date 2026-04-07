import { type Unit } from '../types';

import { convertUnit } from '../helpers';
import { projectStore } from '../store';

export const useSettingsUnit = () => {
	return projectStore((state) => state.settings.unit);
};

export const useSettingsPrecision = () => {
	return projectStore((state) => state.settings.precision);
};

export const setSettingsUnit = (unit: Unit) => {
	projectStore.setState((state) => {
		const oldUnit = state.settings.unit;
		state.settings.unit = unit;

		for (let i = 0; i < state.breakpoints.length; i++) {
			const breakpoint = state.breakpoints[i];
			breakpoint.base = convertUnit(breakpoint.base, oldUnit, unit);

			for (const [key, value] of Object.entries(breakpoint.overrides)) {
				breakpoint.overrides[key] = {
					fontSize: convertUnit(value.fontSize, oldUnit, unit),
					lineHeight: value.lineHeight,
				};
			}
		}
	});
};

export const setSettingsPrecision = (precision: number) => {
	projectStore.setState((state) => {
		state.settings.precision = precision;
	});
};
