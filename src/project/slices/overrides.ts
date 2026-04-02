import { scale, toPrecise } from '../helpers';
import { isFluidBreakpointsKey, type Override } from '../types';
import { projectStore } from '../store';

export const useOverride = (id: string, row: number, column: number) => {
	return projectStore((state) => {
		const key = `${row}:${column}`;

		if (state.type === 'fluid') {
			if (isFluidBreakpointsKey(id)) {
				return state.breakpoints[id].overrides[key];
			}
			return;
		}

		return state.breakpoints.find((t) => t.id === id)?.breakpoint.overrides[
			key
		];
	});
};

export const enableOverride = (id: string, row: number, column: number) => {
	projectStore.setState((state) => {
		const key = `${row}:${column}`;

		const cutoff = state.settings.unit === 'px' ? 24 : 1.5;

		if (state.type === 'fluid') {
			if (isFluidBreakpointsKey(id)) {
				const breakpoint = state.breakpoints[id];
				const calculated = toPrecise(
					scale(row, breakpoint.base, breakpoint.ratio),
					state.settings.precision
				);

				breakpoint.overrides[key] = {
					fontSize: calculated,
					lineHeight: calculated > cutoff ? 1.15 : 1.5,
				};
			}
			return;
		}

		const breakpoint = state.breakpoints.find(
			(t) => t.id === id
		)?.breakpoint;

		if (!breakpoint) {
			return;
		}

		if (key in breakpoint.overrides) {
			return;
		}

		const calculated = toPrecise(
			scale(row, breakpoint.base, breakpoint.ratio),
			state.settings.precision
		);

		breakpoint.overrides[key] = {
			fontSize: calculated,
			lineHeight: calculated > cutoff ? 1.15 : 1.5,
		};
	});
};

export const disableOverride = (id: string, row: number, column: number) => {
	projectStore.setState((state) => {
		const key = `${row}:${column}`;

		if (state.type === 'fluid') {
			if (isFluidBreakpointsKey(id)) {
				const breakpoint = state.breakpoints[id];

				if (!(key in breakpoint.overrides)) {
					return;
				}

				delete state.breakpoints[id].overrides[key];
			}
			return;
		}

		const breakpoint = state.breakpoints.find(
			(t) => t.id === id
		)?.breakpoint;

		if (!breakpoint) {
			return;
		}

		if (!(key in breakpoint.overrides)) {
			return;
		}

		delete breakpoint.overrides[key];
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

		if (state.type === 'fluid') {
			if (isFluidBreakpointsKey(id)) {
				const breakpoint = state.breakpoints[id];

				if (!(key in breakpoint.overrides)) {
					return;
				}

				breakpoint.overrides[key] = {
					...breakpoint.overrides[key],
					...value,
				};
			}
			return;
		}

		const breakpoint = state.breakpoints.find(
			(t) => t.id === id
		)?.breakpoint;

		if (!breakpoint) {
			return;
		}

		if (!(key in breakpoint.overrides)) {
			return;
		}

		breakpoint.overrides[key] = {
			...breakpoint.overrides[key],
			...value,
		};
	});
};
