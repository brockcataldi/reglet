export interface FontFaceValue {
	type: 'value';
	unit: 'numeric' | 'percentage';
	value: number;
	variation: boolean;
}

export interface FontFaceAxis {
	type: 'axis';
	unit: 'numeric' | 'percentage';
	min: number;
	max: number;
	variation: boolean;
}

export type FontFaceProperty = FontFaceAxis | FontFaceValue | string;

export function isFontFaceAxis(value: any): value is FontFaceAxis {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	if (value.type !== 'axis') {
		return false;
	}

	if (!('unit' in value) || typeof value.unit !== 'string') {
		return false;
	}

	if (!('min' in value) || typeof value.min !== 'number') {
		return false;
	}

	if (!('max' in value) || typeof value.max !== 'number') {
		return false;
	}

	if (!('variation' in value) || typeof value.variation !== 'boolean') {
		return false;
	}

	if (value.unit !== 'numeric' && value.unit !== 'percentage') {
		return false;
	}

	return true;
}

export function compareFontFaceAxis(
	axis1: FontFaceAxis,
	axis2: FontFaceAxis
): boolean {
	if (!isFontFaceAxis(axis1) && !isFontFaceAxis(axis2)) {
		return false;
	}

	if (axis1.unit !== axis2.unit) {
		return false;
	}

	if (axis1.min !== axis2.min) {
		return false;
	}

	if (axis1.max !== axis2.max) {
		return false;
	}

	if (axis1.variation !== axis2.variation) {
		return false;
	}

	return true;
}

export function isFontFaceValue(value: any): value is FontFaceValue {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	if (value.type !== 'value') {
		return false;
	}

	if (!('unit' in value) || typeof value.unit !== 'string') {
		return false;
	}

	if (!('value' in value) || typeof value.value !== 'number') {
		return false;
	}

	if (value.unit !== 'numeric' && value.unit !== 'percentage') {
		return false;
	}

	return true;
}

export function compareFontFaceValue(
	value1: FontFaceValue,
	value2: FontFaceValue
): boolean {
	if (!isFontFaceValue(value1) && !isFontFaceValue(value2)) {
		return false;
	}

	if (value1.unit !== value2.unit) {
		return false;
	}

	if (value1.value !== value2.value) {
		return false;
	}

	return true;
}

export function compareFontFaceProperty(
	value1: FontFaceProperty,
	value2: FontFaceProperty
): boolean {
	if (typeof value1 !== typeof value2) {
		return false;
	}

	if (typeof value1 === 'string' && typeof value2 === 'string') {
		return value1 === value2;
	}

	if (isFontFaceAxis(value1) && isFontFaceAxis(value2)) {
		return compareFontFaceAxis(value1, value2);
	}

	if (isFontFaceValue(value1) && isFontFaceValue(value2)) {
		return compareFontFaceValue(value1, value2);
	}

	return false;
}

export function extractFontFaceValue(
	value: string,
	key: string,
): FontFaceAxis | FontFaceValue | string {
	const space = value.includes(' ');
	const percentage = value.includes('%');

	if (percentage) {
		value = value.replaceAll('%', '');
	}

	if (!space) {
		const possibleValue = Number(value);
		if (isNaN(possibleValue)) {
			return value;
		}

		return {
			type: 'value',
			unit: percentage ? 'percentage' : 'numeric',
			value: possibleValue,
			variation: key !== 'font-weight'
		};
	}

	const [min, max] = value.split(' ').map(Number);

	return {
		type: 'axis',
		unit: percentage ? 'percentage' : 'numeric',
		min,
		max,
		variation: key !== 'font-weight'
	};
}
