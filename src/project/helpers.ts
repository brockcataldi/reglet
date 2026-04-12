import { CONVERSION_RATIOS } from '@/project/constants';
import { type Unit } from '@/project/types';

export const scale = (step: number, base: number, ratio: number): number => {
	return base * Math.pow(ratio, step);
};

export const toPrecise = (value: number, precision: number) => {
	return parseFloat(value.toFixed(precision));
};

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

export const convertUnit = (value: number, oldUnit: Unit, newUnit: Unit) => {
	const key = `${oldUnit}-${newUnit}`;
	const ratio = CONVERSION_RATIOS[key];

	if (ratio === undefined) {
		return value;
	}

	return Math.round((value * ratio + Number.EPSILON) * 100) / 100;
};
