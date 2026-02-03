import { WEIGHT_VALUES } from '$lib/constants';

import {
	type Weight,
	type Axis,
	type WeightValue,
	isAxis,
	compareAxis,
	toStringAxis
} from '$lib/types';

export function isWeightString(value: unknown): value is 'normal' | 'bold' {
	if (value === null || value === undefined) {
		return false;
	}

	return WEIGHT_VALUES.includes(value as 'normal' | 'bold');
}

export function isWeightValue(value: unknown): value is WeightValue {
	return typeof value === 'number' || isWeightString(value);
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

export function uniqueWeights(weights: Weight[]): Weight[] {
	const seenWeights = new Set<Weight>();
	const seenObjects = new WeakSet<Axis>();

	for (const weight of weights) {
		if (isWeightValue(weight)) {
			if (seenWeights.has(weight)) {
				continue;
			}
			seenWeights.add(weight);
		}

		if (isAxis(weight)) {
			if (seenObjects.has(weight)) {
				continue;
			}
			seenObjects.add(weight);
			seenWeights.add(weight);
		}
	}

	return [...seenWeights];
}

export function extractWeight(value: string): Weight {
	const space = value.includes(' ');

	if (!space) {
		const possibleValue = Number(value);

		if (isNaN(possibleValue)) {
			return isWeightString(value) ? value : 'normal';
		}

		return possibleValue;
	}

	const [min, max] = value.split(' ').map(Number);

	return {
		min,
		max
	};
}
