import { useMemo } from 'react';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import {
	isFluidBreakpointsKey,
	type Bounds,
	type BreakpointId,
	type BreakpointSettings,
	type Cell,
	type FluidBreakpoint,
	type Override,
	type Project,
	type ProjectType,
	type Settings,
	type TraditionalBreakpoint,
	type Unit,
} from '../types';

import { scale, toPrecise } from '../functions';

const createDefaultSettings = (): Settings => ({
	unit: 'rem',
	precision: 3,
	type: 'traditional',
});

const createDefaultTraditionalBreakpoint = (): TraditionalBreakpoint => ({
	id: crypto.randomUUID(),
	minWidth: 0,
	base: 1,
	ratio: 1.2,
	bounds: { min: -1, max: 5 },
	overrides: {},
	textStyles: [
		{
			fontFamily: 'Arial',
			fontWeight: '400',
			fontStyle: 'normal',
		},
	],
});

const createDefaultFluidBreakpoint = (base?: number): FluidBreakpoint => ({
	id: crypto.randomUUID(),
	base: base ?? 1,
	ratio: 1.2,
	bounds: { min: -1, max: 5 },
	overrides: {},
	textStyles: [
		{
			fontFamily: 'Arial',
			fontWeight: '400',
			fontStyle: 'normal',
		},
	],
});

const createBreakpointTable = (
	breakpoint: BreakpointSettings | undefined,
	precision: number
): Cell[][] => {
	if (!breakpoint) {
		return [];
	}

	const cells: Cell[][] = [];
	const { bounds, textStyles, base, ratio, overrides } = breakpoint;

	for (let i = bounds.max; i >= bounds.min; i--) {
		const row: Cell[] = [];
		for (let j = 0; j < textStyles.length; j++) {
			const override = overrides[`${i}:${j}`];

			const cell = {
				...textStyles[j],
				fontSize:
					override?.fontSize ??
					toPrecise(scale(i, base, ratio), precision),
				lineHeight: override?.lineHeight ?? 1,
			};

			row.push(cell);
		}
		cells.push(row);
	}
	return cells;
};

export const useProjectStore = create<Project>()(
	immer(() => ({
		settings: createDefaultSettings(),
		traditional: [createDefaultTraditionalBreakpoint()],
		fluid: {
			min: createDefaultFluidBreakpoint(),
			max: createDefaultFluidBreakpoint(1.1),
		},
	}))
);

export const useSettingsUnit = () => {
	return useProjectStore((state) => state.settings.unit);
};

export const setSettingsUnit = (unit: Unit) => {
	useProjectStore.setState((state) => {
		state.settings.unit = unit;
	});
};

export const useSettingsPrecision = () => {
	return useProjectStore((state) => state.settings.precision);
};

export const setSettingsPrecision = (precision: number) => {
	useProjectStore.setState((state) => {
		state.settings.precision = precision;
	});
};

export const useSettingsType = () => {
	return useProjectStore((state) => state.settings.type);
};

export const setSettingsType = (type: ProjectType) => {
	useProjectStore.setState((state) => {
		state.settings.type = type;
	});
};

export const useBreakpoint = (id: BreakpointId) => {
	return useProjectStore((state) => {
		if (isFluidBreakpointsKey(id)) {
			return state.fluid[id];
		}
		return state.traditional.find((t) => t.id === id);
	});
};

export const useBreakpointTextStyles = (id: BreakpointId) => {
	return useProjectStore((state) => {
		if (isFluidBreakpointsKey(id)) {
			return state.fluid[id]?.textStyles;
		}
		return state.traditional.find((t) => t.id === id)?.textStyles;
	});
};

export const useBreakpointBounds = (id: BreakpointId) => {
	return useProjectStore((state) => {
		if (isFluidBreakpointsKey(id)) {
			return state.fluid[id]?.bounds;
		}
		return state.traditional.find((t) => t.id === id)?.bounds;
	});
};

export const useTraditionalBreakpointExists = (id: string | undefined) => {
	return useProjectStore((state) =>
		state.traditional.some((t) => t.id === id)
	);
};

export const useFirstTraditionalBreakpointId = () => {
	return useProjectStore((state) => state.traditional[0]?.id);
};

export const useBreakpointTable = (id: BreakpointId) => {
	const precision = useSettingsPrecision();
	const breakpoint = useBreakpoint(id);

	return useMemo(() => {
		return createBreakpointTable(breakpoint, precision);
	}, [breakpoint, precision]);
};

export const useOverride = (id: BreakpointId, row: number, column: number) => {
	return useProjectStore((state) => {
		const key = `${row}:${column}`;

		if (isFluidBreakpointsKey(id)) {
			return state.fluid[id]?.overrides[key];
		}
		return state.traditional.find((t) => t.id === id)?.overrides[key];
	});
};

export const enableOverride = (
	id: BreakpointId,
	row: number,
	column: number
) => {
	useProjectStore.setState((state) => {
		const key = `${row}:${column}`;

		if (isFluidBreakpointsKey(id)) {
			const fluid = state.fluid[id];

			fluid.overrides[key] = {
				fontSize: toPrecise(
					scale(row, fluid.base, fluid.ratio),
					state.settings.precision
				),
				lineHeight: 1,
			};

			return;
		}

		const traditional = state.traditional.find((t) => t.id === id);

		if (!traditional) {
			return;
		}

		if (key in traditional.overrides) {
			return;
		}

		traditional.overrides[key] = {
			fontSize: toPrecise(
				scale(row, traditional.base, traditional.ratio),
				state.settings.precision
			),
			lineHeight: 1,
		};
	});
};

export const disableOverride = (
	id: BreakpointId,
	row: number,
	column: number
) => {
	useProjectStore.setState((state) => {
		const key = `${row}:${column}`;

		if (isFluidBreakpointsKey(id)) {
			delete state.fluid[id].overrides[key];
			return;
		}

		const traditional = state.traditional.find((t) => t.id === id);

		if (!traditional) {
			return;
		}

		if (!(key in traditional.overrides)) {
			return;
		}

		delete traditional.overrides[key];
	});
};

export const setOverride = (
	id: BreakpointId,
	row: number,
	column: number,
	value: Partial<Override>
) => {
	useProjectStore.setState((state) => {
		const key = `${row}:${column}`;

		if (isFluidBreakpointsKey(id)) {
			const fluid = state.fluid[id];

			fluid.overrides[key] = {
				...fluid.overrides[key],
				...value,
			};

			return;
		}

		const traditional = state.traditional.find((t) => t.id === id);

		if (!traditional) {
			return;
		}

		if (!(key in traditional.overrides)) {
			return;
		}

		traditional.overrides[key] = {
			...traditional.overrides[key],
			...value,
		};
	});
};

export const incrementBound = (id: BreakpointId, key: keyof Bounds) => {
	useProjectStore.setState((state) => {
		console.log('incrementBound');

		if (isFluidBreakpointsKey(id)) {
			console.log('fluid');
			const fluid = state.fluid[id];
			fluid.bounds[key] = fluid.bounds[key] + 1;
			return;
		}

		const traditional = state.traditional.find((t) => t.id === id);

		if (!traditional) {
			return;
		}

		console.log('traditional');

		traditional.bounds[key] = traditional.bounds[key] + 1;
	});
};

export const decrementBound = (id: BreakpointId, key: keyof Bounds) => {
	useProjectStore.setState((state) => {
		if (isFluidBreakpointsKey(id)) {
			const fluid = state.fluid[id];
			fluid.bounds[key] = fluid.bounds[key] - 1;
			return;
		}

		const traditional = state.traditional.find((t) => t.id === id);

		if (!traditional) {
			return;
		}

		traditional.bounds[key] = traditional.bounds[key] - 1;
	});
};
