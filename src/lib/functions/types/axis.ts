import type { Axis } from '$lib/types';

export const isAxis = (value: unknown): value is Axis => {
	if (value === null || value === undefined) {
		return false;
	}

	return typeof value === 'object' && 'min' in value && 'max' in value;
}

export const compareAxis = (axis1: Axis, axis2: Axis): boolean => {
	return axis1.min === axis2.min && axis1.max === axis2.max;
}

export const toStringAxis = (axis: Axis): string => {
	return `${axis.min}..${axis.max}`;
}

export const isAxisArray = (raw: unknown): raw is Axis[] => {
	if (!Array.isArray(raw)) {
		return false;
	}

	for (const value of raw) {
		if (!isAxis(value)) {
			return false;
		}
	}

	return true;
};

export const consolidateAxes = (axes: Axis[]): Axis => {
	let { min, max } = axes[0];

	for (const axis of axes.slice(1)) {
		if (axis.min < min) {
			min = axis.min;
		}

		if (axis.max > max) {
			max = axis.max;
		}
	}

	return { min, max };
};
