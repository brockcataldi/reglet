import { LARGE_TEXT_CUTOFFS } from '@/project/constants';

import { convertUnit, toPrecise, scale } from '@/project/helpers';

import {
	type Breakpoint,
	type Values,
	type Project,
	type ProjectType,
	type Style,
	type Unit,
} from '@/project/types';

export const createDefaultTextStyle = (): Style => ({
	id: crypto.randomUUID(),
	fontFamily: 'Arial',
	fontWeight: '400',
	fontStyle: 'normal',
});

export const createDefaultBreakpoint = (
	width: number,
	multiplier: number,
	unit: Unit
): Breakpoint => {
	return {
		id: crypto.randomUUID(),
		width,
		base:
			unit === 'px'
				? 16 * multiplier
				: convertUnit(16 * multiplier, 'px', unit),
		ratio: 1.2,
		bounds: { min: -1, max: 5 },
		overrides: {},
	};
};

export const createBreakpointTable = (
	breakpoint: Breakpoint | undefined,
	style: Style[],
	unit: Unit,
	precision: number
): Values[][] => {
	if (!breakpoint) {
		return [];
	}

	const cells: Values[][] = [];
	const { bounds, base, ratio, overrides } = breakpoint;
	const cutoff = LARGE_TEXT_CUTOFFS[unit];

	for (let i = bounds.max; i >= bounds.min; i--) {
		const row: Values[] = [];
		for (let j = 0; j < style.length; j++) {
			const override = overrides[`${i}:${j}`];
			const calculated = toPrecise(scale(i, base, ratio), precision);
			const estimatedLineHeight = calculated > cutoff ? 1.15 : 1.5;

			const cell = {
				...style[j],
				fontSize: override?.fontSize ?? calculated,
				lineHeight: override?.lineHeight ?? estimatedLineHeight,
			};

			row.push(cell);
		}
		cells.push(row);
	}
	return cells;
};

export const createProject = (unit: Unit, type: ProjectType): Project => {
	return {
		type,
		settings: {
			unit,
			precision: 3,
		},
		styles: [createDefaultTextStyle()],
		breakpoints:
			type === 'traditional'
				? [
						createDefaultBreakpoint(0, 1, unit),
						createDefaultBreakpoint(768, 1.1, unit),
						createDefaultBreakpoint(1200, 1.2, unit),
					]
				: [
						createDefaultBreakpoint(360, 1, unit),
						createDefaultBreakpoint(1240, 1.2, unit),
					],
	};
};
