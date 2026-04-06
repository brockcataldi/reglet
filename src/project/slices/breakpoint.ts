import { useMemo } from 'react';
import { type Breakpoint } from '../types';
import { createBreakpointTable } from '../helpers';
import { projectStore } from '../store';
import { useSettingsPrecision, useSettingsUnit } from './settings';
import { useTextStyles } from './text-styles';

export const useBreakpoint = (id: number) => {
	return projectStore((state) => state.breakpoints[id]);
};

export const useBreakpointBase = (id: number) => {
	return projectStore((state) => state.breakpoints[id].base);
};

export const useBreakpointRatio = (id: number) => {
	return projectStore((state) => state.breakpoints[id].ratio);
};

export const useBreakpointExists = (id: number | undefined) => {
	return projectStore((state) =>
		id === undefined ? false : id in state.breakpoints
	);
};

export const useFirstBreakpointId = () => {
	return projectStore((state) => Object.keys(state.breakpoints)[0]);
};

export const useBreakpointTable = (id: number) => {
	const precision = useSettingsPrecision();
	const breakpoint = useBreakpoint(id);
	const unit = useSettingsUnit();
	const textStyles = useTextStyles();

	return useMemo(() => {
		return createBreakpointTable(breakpoint, textStyles, unit, precision);
	}, [breakpoint, textStyles, unit, precision]);
};

export const updateBreakpoint = (id: number, settings: Partial<Breakpoint>) => {
	projectStore.setState((state) => {
		if (!(id in state.breakpoints)) {
			return;
		}

		state.breakpoints[id] = {
			...state.breakpoints[id],
			...settings,
		};
	});
};
