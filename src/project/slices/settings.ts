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

		for (const i of Object.keys(state.breakpoints)) {
			const size = parseInt(i);
			const breakpoint = state.breakpoints[size];
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
