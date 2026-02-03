import {
	type VariationAxis,
	type VariationAxisValue,
	compareAxis
} from '$lib/types';

export function isVariationAxis(value: unknown): value is VariationAxis {
	if (value === null || value === undefined) {
		return false;
	}

	return (
		typeof value === 'object' &&
		'name' in value &&
		'min' in value &&
		'max' in value
	);
}

export function compareVariationAxis(
	axis1: VariationAxis,
	axis2: VariationAxis
): boolean {
	return axis1.name === axis2.name && compareAxis(axis1, axis2);
}

export function isVariationAxisValue(
	value: unknown
): value is VariationAxisValue {
	if (value === null || value === undefined) {
		return false;
	}

	return typeof value === 'object' && 'name' in value && 'value' in value;
}

export function compareVariationAxisValue(
	value1: VariationAxisValue,
	value2: VariationAxisValue
): boolean {
	return value1.name === value2.name && value1.value === value2.value;
}
