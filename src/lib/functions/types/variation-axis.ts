import {
	type VariationAxis,
	type VariationAxisValue,
	type VariationAxisValues,
	compareAxis
} from '$lib/types';

export const isVariationAxis = (value: unknown): value is VariationAxis => {
	if (value === null || value === undefined) {
		return false;
	}

	return (
		typeof value === 'object' &&
		'id' in value &&
		'name' in value &&
		'min' in value &&
		'max' in value
	);
}

export const compareVariationAxis = (
	axis1: VariationAxis,
	axis2: VariationAxis
): boolean => {
	return axis1.name === axis2.name && compareAxis(axis1, axis2);
}

export const isVariationAxisValue = (
	value: unknown
): value is VariationAxisValue => {
	if (value === null || value === undefined) {
		return false;
	}

	return (
		typeof value === 'object' &&
		'id' in value &&
		'name' in value &&
		'value' in value &&
		typeof value.value === 'number'
	);
}

export const compareVariationAxisValue = (
	value1: VariationAxisValue,
	value2: VariationAxisValue
): boolean => {
	return value1.name === value2.name && value1.value === value2.value;
}

export const isVariationAxisValues = (
	value: unknown
): value is VariationAxisValues => {
	if (value === null || value === undefined) {
		return false;
	}

	return (
		typeof value === 'object' &&
		'id' in value &&
		'name' in value &&
		'value' in value &&
		Array.isArray(value.value)
	);
}
