import { useMemo } from 'react';
import {
	isFluidBreakpointsKey,
	isTraditionalBreakpoint,
	type Breakpoint,
	type FluidBreakpoints,
} from '../types';
import { createBreakpointTable } from '../helpers';
import { projectStore } from '../store';
import { useSettingsPrecision, useSettingsUnit } from './settings';
import { useTextStyles } from './text-styles';

export const useBreakpoint = (id: string) => {
	return projectStore((state) => {
		if (state.type === 'fluid') {
			if (isFluidBreakpointsKey(id)) {
				return state.breakpoints[id];
			}
			return;
		}

		return state.breakpoints.find((t) => t.id === id);
	});
};

export const useBreakpointBounds = (id: string) => {
	return projectStore((state) => {
		if (state.type === 'fluid') {
			if (isFluidBreakpointsKey(id)) {
				return state.breakpoints[id].bounds;
			}
			return;
		}
		return state.breakpoints.find((t) => t.id === id)?.breakpoint.bounds;
	});
};

export const useBreakpointBase = (id: string) => {
	return projectStore((state) => {
		if (state.type === 'fluid') {
			if (isFluidBreakpointsKey(id)) {
				return state.breakpoints[id].base;
			}
			return;
		}
		return state.breakpoints.find((t) => t.id === id)?.breakpoint.base;
	});
};

export const useBreakpointRatio = (id: string) => {
	return projectStore((state) => {
		if (state.type === 'fluid') {
			if (isFluidBreakpointsKey(id)) {
				return state.breakpoints[id].ratio;
			}
			return;
		}
		return state.breakpoints.find((t) => t.id === id)?.breakpoint.ratio;
	});
};

export const useBreakpointExists = (id: string | undefined) => {
	return projectStore((state) => {
		if (state.type === 'fluid') {
			return isFluidBreakpointsKey(id);
		}

		return state.breakpoints.some((t) => t.id === id);
	});
};

export const useFirstBreakpointId = () => {
	return projectStore((state) => {
		if (state.type === 'fluid') {
			return 'min' as keyof FluidBreakpoints;
		}

		return state.breakpoints[0].id;
	});
};

export const useBreakpointTable = (id: string) => {
	const precision = useSettingsPrecision();
	const breakpoint = useBreakpoint(id);
	const unit = useSettingsUnit();
	const textStyles = useTextStyles();

	return useMemo(() => {
		return createBreakpointTable(
			isTraditionalBreakpoint(breakpoint)
				? breakpoint.breakpoint
				: breakpoint,
			textStyles,
			unit,
			precision
		);
	}, [breakpoint, textStyles, unit, precision]);
};

export const updateBreakpoint = (id: string, settings: Partial<Breakpoint>) => {
	projectStore.setState((state) => {
		if (state.type === 'fluid') {
			if (isFluidBreakpointsKey(id)) {
				state.breakpoints[id] = {
					...state.breakpoints[id],
					...settings,
				};
			}
			return;
		}

		const index = state.breakpoints.findIndex((t) => t.id === id);

		if (index === -1) {
			return;
		}

		state.breakpoints[index].breakpoint = {
			...state.breakpoints[index].breakpoint,
			...settings,
		};
	});
};
