import { useMemo } from 'react';

import {
	createBreakpointTable,
	projectStore,
	useSettingsPrecision,
	useSettingsUnit,
	useStyles,
	type Breakpoint,
} from '@/project';

export const useBreakpoint = (id: string) => {
	return projectStore((state) =>
		state.breakpoints.find((breakpoint) => breakpoint.id === id)
	);
};

export const useBreakpointBase = (id: string) => {
	return projectStore(
		(state) =>
			state.breakpoints.find((breakpoint) => breakpoint.id === id)?.base
	);
};

export const useBreakpointRatio = (id: string) => {
	return projectStore(
		(state) =>
			state.breakpoints.find((breakpoint) => breakpoint.id === id)?.ratio
	);
};

export const useBreakpointExists = (id: string | undefined) => {
	return projectStore((state) =>
		state.breakpoints.some((breakpoint) => breakpoint.id === id)
	);
};

export const useFirstBreakpointId = () => {
	return projectStore((state) => state.breakpoints[0].id);
};

type BreakpointWidth = {
	id: string;
	width: number;
};

export const useBreakpointWidths = (): BreakpointWidth[] => {
	const breakpoints = projectStore((state) => state.breakpoints);

	return useMemo(
		() =>
			breakpoints.map((breakpoint) => ({
				id: breakpoint.id,
				width: breakpoint.width,
			})),
		[breakpoints]
	);
};

export const useBreakpointTable = (id: string) => {
	const breakpoint = useBreakpoint(id);
	const precision = useSettingsPrecision();
	const unit = useSettingsUnit();
	const styles = useStyles();

	return useMemo(() => {
		return createBreakpointTable(breakpoint, styles, unit, precision);
	}, [breakpoint, styles, unit, precision]);
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
