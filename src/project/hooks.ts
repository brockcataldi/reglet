import { useMemo } from 'react';
import { projectStore } from '@/project/store';
import type { BreakpointWidth } from '@/project/types';
import { createBreakpointTable } from '@/project/creators';

export const useBounds = (id: string) => {
	return projectStore(
		(state) =>
			state.breakpoints.find((breakpoint) => breakpoint.id === id)?.bounds
	);
};

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

export const useBreakpointWidths = (): BreakpointWidth[] => {
	const breakpoints = projectStore((state) => state.breakpoints);

	return useMemo(
		() =>
			breakpoints
				.map((breakpoint) => ({
					id: breakpoint.id,
					width: breakpoint.width,
				}))
				.sort((a, b) => a.width - b.width),
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

export const useOverride = (id: string, row: number, column: number) => {
	return projectStore(
		(state) =>
			state.breakpoints.find((breakpoint) => breakpoint.id === id)
				?.overrides[`${row}:${column}`]
	);
};

export const useStyles = () => {
	return projectStore((state) => state.styles);
};

export const useStylesLength = () => {
	return projectStore((state) => state.styles.length);
};

export const useStyle = (id: string) => {
	return projectStore((state) =>
		state.styles.find((style) => style.id === id)
	);
};

export const useSettingsUnit = () => {
	return projectStore((state) => state.settings.unit);
};

export const useSettingsPrecision = () => {
	return projectStore((state) => state.settings.precision);
};

export const useProjectType = () => {
	return projectStore((state) => state.type);
};
