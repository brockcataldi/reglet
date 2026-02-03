import type { Axis } from '$lib/types';

export function isAxis(value: unknown): value is Axis {
	if (value === null || value === undefined) {
		return false;
	}

	return typeof value === 'object' && 'min' in value && 'max' in value;
}

export function compareAxis(axis1: Axis, axis2: Axis): boolean {
	return axis1.min === axis2.min && axis1.max === axis2.max;
}

export function toStringAxis(axis: Axis): string {
	return `${axis.min}..${axis.max}`;
}
