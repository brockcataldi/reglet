import { useMemo } from 'react';
import { create } from 'zustand';

import {
	isFluidBreakpointsKey,
	type BreakpointId,
	type BreakpointSettings,
	type Cell,
	type Override,
	type Project,
	type ProjectType,
	type Unit,
} from '../types';

import { scale, toPrecise } from '../functions';

export const createInitialProject = () => ({
	settings: {
		unit: 'rem',
		precision: 3,
		type: 'traditional',
	},
	traditional: [
		{
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
		},
	],
	fluid: {
		min: {
			id: crypto.randomUUID(),
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
		},
		max: {
			id: crypto.randomUUID(),
			base: 1.1,
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
		},
	},
});

export const useProjectStore = create<Project>(() => ({
	settings: {
		unit: 'rem',
		precision: 3,
		type: 'traditional',
	},
	traditional: [
		{
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
		},
	],
	fluid: {
		min: {
			id: crypto.randomUUID(),
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
		},
		max: {
			id: crypto.randomUUID(),
			base: 1.1,
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
		},
	},
}));

export const useSettingsUnit = () => {
	return useProjectStore((state) => state.settings.unit);
};

export const setSettingsUnit = (unit: Unit) => {
	useProjectStore.setState((state) => ({
		settings: { ...state.settings, unit },
	}));
};

export const useSettingsPrecision = () => {
	return useProjectStore((state) => state.settings.precision);
};

export const setSettingsPrecision = (precision: number) => {
	useProjectStore.setState((state) => ({
		settings: { ...state.settings, precision },
	}));
};

export const useSettingsType = () => {
	return useProjectStore((state) => state.settings.type);
};

export const setSettingsType = (type: ProjectType) => {
	useProjectStore.setState((state) => ({
		settings: { ...state.settings, type },
	}));
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
	if (!id) {
		return;
	}

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
		return buildBreakpointTable(breakpoint, precision);
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
	const key = `${row}:${column}`;

	useProjectStore.setState((state) => {
		return {
			traditional: state.traditional.map((traditional) =>
				traditional.id === id
					? {
							...traditional,
							overrides: {
								...traditional.overrides,
								[key]: {
									fontSize: toPrecise(
										scale(
											row,
											traditional.base,
											traditional.ratio
										),
										state.settings.precision
									),
									lineHeight: 1,
								},
							},
						}
					: traditional
			),
		};
	});
};

export const disableOverride = (
	id: BreakpointId,
	row: number,
	column: number
) => {};

export const setOverride = (
	id: BreakpointId,
	row: number,
	column: number,
	value: Partial<Override>
) => {};

const buildBreakpointTable = (
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
