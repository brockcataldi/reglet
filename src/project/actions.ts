import { LARGE_TEXT_CUTOFFS } from '@/project/constants';

import type {
	Bounds,
	Breakpoint,
	Override,
	ProjectType,
	Style,
	Unit,
} from '@/project/types';

import { createProject } from '@/project/creators';
import { convertUnit, scale, toPrecise } from '@/project/helpers';
import { projectStore } from '@/project/store';

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

export const updateBreakpoints = (breakpoints: Breakpoint[]) => {
	projectStore.setState((state) => {
		state.breakpoints = breakpoints;
	});
};

export const updateBreakpoint = (id: string, settings: Partial<Breakpoint>) => {
	projectStore.setState((state) => {
		const index = state.breakpoints.findIndex(
			(breakpoint) => breakpoint.id === id
		);

		if (index === -1) {
			return;
		}

		state.breakpoints[index] = {
			...state.breakpoints[index],
			...settings,
		};
	});
};

export const enableOverride = (id: string, row: number, column: number) => {
	projectStore.setState((state) => {
		const index = state.breakpoints.findIndex(
			(breakpoint) => breakpoint.id === id
		);

		const cutoff = LARGE_TEXT_CUTOFFS[state.settings.unit];
		const breakpoint = state.breakpoints[index];
		const calculated = toPrecise(
			scale(row, breakpoint.base, breakpoint.ratio),
			state.settings.precision
		);

		breakpoint.overrides[`${row}:${column}`] = {
			fontSize: calculated,
			lineHeight: calculated > cutoff ? 1.15 : 1.5,
		};
	});
};

export const disableOverride = (id: string, row: number, column: number) => {
	projectStore.setState((state) => {
		const index = state.breakpoints.findIndex(
			(breakpoint) => breakpoint.id === id
		);

		const key = `${row}:${column}`;
		const breakpoint = state.breakpoints[index];

		if (!(key in breakpoint.overrides)) {
			return;
		}

		delete state.breakpoints[index].overrides[key];
	});
};

export const updateOverride = (
	id: string,
	row: number,
	column: number,
	value: Partial<Override>
) => {
	projectStore.setState((state) => {
		const key = `${row}:${column}`;
		const index = state.breakpoints.findIndex(
			(breakpoint) => breakpoint.id === id
		);

		const breakpoint = state.breakpoints[index];

		if (!(key in breakpoint.overrides)) {
			return;
		}

		breakpoint.overrides[key] = {
			...breakpoint.overrides[key],
			...value,
		};
	});
};

export const addStyle = (value: Style) => {
	projectStore.setState((state) => {
		state.styles.push(value);
	});
};

export const updateStyle = (id: string, values: Partial<Style>) => {
	projectStore.setState((state) => {
		const index = state.styles.findIndex((style) => style.id === id);

		if (index === -1) {
			return;
		}

		state.styles[index] = {
			...state.styles[index],
			...values,
		};
	});
};

export const removeStyle = (id: string) => {
	projectStore.setState((state) => {
		const index = state.styles.findIndex((style) => style.id === id);
		state.styles.splice(index, 1);
	});
};

export const updateSettingsUnit = (unit: Unit) => {
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

export const updateSettingsPrecision = (precision: number) => {
	projectStore.setState((state) => {
		state.settings.precision = precision;
	});
};

export const updateNewProject = (newUnit: Unit, newType: ProjectType) => {
	projectStore.setState((state) => {
		const { settings, breakpoints, type, styles } = createProject(newUnit, newType);

		state.type = type;
		state.settings = settings;
		state.breakpoints = breakpoints;
		state.styles = styles;
	});
};

export const updateProjectType = (type: ProjectType) => {
	projectStore.setState((state) => {
		state.type = type;
	});
};
