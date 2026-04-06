import { scale, toPrecise } from '../helpers';
import { type Override } from '../types';
import { projectStore } from '../store';
import { LARGE_TEXT_CUTOFFS } from '../constants';

export const useOverride = (id: number, row: number, column: number) => {
	return projectStore(
		(state) => state.breakpoints[id].overrides[`${row}:${column}`]
	);
};

export const enableOverride = (id: number, row: number, column: number) => {
	projectStore.setState((state) => {
		if (!(id in state.breakpoints)) {
			return;
		}

		const cutoff = LARGE_TEXT_CUTOFFS[state.settings.unit];
		const breakpoint = state.breakpoints[id];
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

export const disableOverride = (id: number, row: number, column: number) => {
	projectStore.setState((state) => {
		if (!(id in state.breakpoints)) {
			return;
		}

		const key = `${row}:${column}`;
		const breakpoint = state.breakpoints[id];

		if (!(key in breakpoint.overrides)) {
			return;
		}

		delete state.breakpoints[id].overrides[key];
	});
};

export const updateOverride = (
	id: number,
	row: number,
	column: number,
	value: Partial<Override>
) => {
	projectStore.setState((state) => {
		const key = `${row}:${column}`;

		if (!(id in state.breakpoints)) {
			return;
		}

		const breakpoint = state.breakpoints[id];

		if (!(key in breakpoint.overrides)) {
			return;
		}

		breakpoint.overrides[key] = {
			...breakpoint.overrides[key],
			...value,
		};
	});
};
