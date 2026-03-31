import type { Unit } from './types';

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

const CONVERSION_RATIOS: Record<string, number> = {
	'px-pt': 72 / 96,
	'px-rem': 1 / 16,
	'pt-px': 96 / 72,
	'pt-rem': ((96 / 72) * 1) / 16,
	'rem-px': 16,
	'rem-pt': 16 * (72 / 96),
};

export const convertUnit = (value: number, oldUnit: Unit, newUnit: Unit) => {
	const key = `${oldUnit}-${newUnit}`;
	const ratio = CONVERSION_RATIOS[key];

	if (!ratio) {
		return value;
	}

	return value * ratio;
};
