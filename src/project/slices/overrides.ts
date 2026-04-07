import { scale, toPrecise } from '../helpers';
import { type Override } from '../types';
import { projectStore } from '../store';
import { LARGE_TEXT_CUTOFFS } from '../constants';

export const useOverride = (id: string, row: number, column: number) => {
	return projectStore(
		(state) =>
			state.breakpoints.find((breakpoint) => breakpoint.id === id)
				?.overrides[`${row}:${column}`]
	);
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
