import { CONVERSION_RATIOS, LARGE_TEXT_CUTOFFS } from './constants';
import {
	type Breakpoint,
	type Cell,
	type Project,
	type ProjectType,
	type TextStyle,
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

	return value * ratio;
};

export const createDefaultTextStyle = (): TextStyle => ({
	id: crypto.randomUUID(),
	fontFamily: 'Arial',
	fontWeight: '400',
	fontStyle: 'normal',
});

export const createDefaultBreakpoint = (
	multiplier: number,
	unit: Unit
): Breakpoint => {
	const value = 16 * multiplier;
	return {
		base: unit === 'px' ? value : convertUnit(value, 'px', unit),
		ratio: 1.2,
		bounds: { min: -1, max: 5 },
		overrides: {},
	};
};

export const createBreakpointTable = (
	breakpoint: Breakpoint | undefined,
	textStyles: TextStyle[],
	unit: Unit,
	precision: number
): Cell[][] => {
	if (!breakpoint) {
		return [];
	}

	const cells: Cell[][] = [];
	const { bounds, base, ratio, overrides } = breakpoint;
	const cutoff = LARGE_TEXT_CUTOFFS[unit];

	for (let i = bounds.max; i >= bounds.min; i--) {
		const row: Cell[] = [];
		for (let j = 0; j < textStyles.length; j++) {
			const override = overrides[`${i}:${j}`];
			const calculated = toPrecise(scale(i, base, ratio), precision);
			const estimatedLineHeight = calculated > cutoff ? 1.15 : 1.5;

			const cell = {
				...textStyles[j],
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
		textStyles: [createDefaultTextStyle()],
		breakpoints: {
			0: createDefaultBreakpoint(1, unit),
			768: createDefaultBreakpoint(1.1, unit),
			1024: createDefaultBreakpoint(1.2, unit),
		},
	};
};
