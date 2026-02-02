import type {
	Axis,
	VariationAxis,
	VariationAxisValue,
	VariationSetting,
	Style,
	Stretch,
	Weight,
	Family,
	Face,
	FaceRule,
	StretchString
} from '$lib/types';

import { WEIGHT_VALUES, STYLE_VALUES, STRETCH_VALUES } from '$lib/constants';

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

export function isVariationSetting(value: unknown): value is VariationSetting {
	if (value === null || value === undefined) {
		return false;
	}

	return isVariationAxisValue(value) || isVariationAxis(value);
}

export function compareVariationSetting(
	setting1: VariationSetting,
	setting2: VariationSetting
): boolean {
	if (isVariationAxisValue(setting1) && isVariationAxisValue(setting2)) {
		return compareVariationAxisValue(setting1, setting2);
	}

	if (isVariationAxis(setting1) && isVariationAxis(setting2)) {
		return compareVariationAxis(setting1, setting2);
	}

	return false;
}

export function isWeightString(value: unknown): value is 'normal' | 'bold' {
	if (value === null || value === undefined) {
		return false;
	}

	return WEIGHT_VALUES.includes(value as 'normal' | 'bold');
}

export function compareWeight(weight1: Weight, weight2: Weight): boolean {
	if (typeof weight1 === 'number' && typeof weight2 === 'number') {
		return weight1 === weight2;
	}

	if (isWeightString(weight1) && isWeightString(weight2)) {
		return weight1 === weight2;
	}

	if (isAxis(weight1) && isAxis(weight2)) {
		return compareAxis(weight1, weight2);
	}
	return false;
}

export function toStringWeight(weight: Weight): string {
	if (typeof weight === 'number') {
		return weight.toString();
	}

	if (isWeightString(weight)) {
		return weight;
	}

	if (isAxis(weight)) {
		return toStringAxis(weight);
	}

	return '';
}

export function isStyleString(value: unknown): value is Style {
	if (value === null || value === undefined) {
		return false;
	}

	return STYLE_VALUES.includes(value as Style);
}

export function isStretchString(value: unknown): value is Stretch {
	if (value === null || value === undefined) {
		return false;
	}

	return STRETCH_VALUES.includes(value as StretchString);
}

export function compareStretch(stretch1: Stretch, stretch2: Stretch): boolean {
	if (typeof stretch1 === 'number' && typeof stretch2 === 'number') {
		return stretch1 === stretch2;
	}

	if (stretch1 === stretch2) {
		return true;
	}

	return false;
}

export function compareFace(face1: Face, face2: Face): boolean {
	if (!compareWeight(face1.weight, face2.weight)) {
		return false;
	}

	if (face1.style !== face2.style) {
		return false;
	}

	if (face1.obliqueAngle !== face2.obliqueAngle) {
		return false;
	}

	if (face1.opticalSize !== face2.opticalSize) {
		return false;
	}

	if (!compareStretch(face1.stretch, face2.stretch)) {
		return false;
	}

	if (face1.variationSettings.length !== face2.variationSettings.length) {
		return false;
	}

	for (let i = 0; i < face1.variationSettings.length; i++) {
		if (
			!compareVariationSetting(
				face1.variationSettings[i],
				face2.variationSettings[i]
			)
		) {
			return false;
		}
	}

	return true;
}

export function compareFaceRule(
	faceRule1: FaceRule,
	faceRule2: FaceRule
): boolean {
	if (faceRule1.family !== faceRule2.family) {
		return false;
	}

	return compareFace(faceRule1, faceRule2);
}

export function compareFamily(family1: Family, family2: Family): boolean {
	if (family1.family !== family2.family) {
		return false;
	}

	if (family1.faces.length !== family2.faces.length) {
		return false;
	}

	for (let i = 0; i < family1.faces.length; i++) {
		if (!compareFace(family1.faces[i], family2.faces[i])) {
			return false;
		}
	}

	return true;
}
