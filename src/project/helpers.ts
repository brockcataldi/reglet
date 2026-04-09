import { CONVERSION_RATIOS, LARGE_TEXT_CUTOFFS } from './constants';
import {
	type Breakpoint,
	type Values,
	type Project,
	type ProjectType,
	type Style,
	type Unit,
} from './types';

export const scale = (step: number, base: number, ratio: number): number =>
	base * Math.pow(ratio, step);

export const suffix = (value: number): string => {
	switch (Math.trunc(value).toString().at(-1)) {
		case '1':
			return `${value}st`;
		case '2':
			return `${value}nd`;
		case '3':
			return `${value}rd`;
		default:
			return `${value}th`;
	}
};

export const toPrecise = (value: number, precision: number) =>
	parseFloat(value.toFixed(precision));

export const convertUnit = (value: number, oldUnit: Unit, newUnit: Unit) => {
	const key = `${oldUnit}-${newUnit}`;
	const ratio = CONVERSION_RATIOS[key];

	if (ratio === undefined) {
		return value;
	}

	return Math.round((value * ratio + Number.EPSILON) * 100) / 100;
};

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
		breakpoints: [
			createDefaultBreakpoint(0, 1, unit),
			createDefaultBreakpoint(768, 1.1, unit),
			createDefaultBreakpoint(1200, 1.2, unit),
		],
	};
};
