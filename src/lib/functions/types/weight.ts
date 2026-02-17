import { type Weight, isAxis, compareAxis, toStringAxis } from '$lib/types';

export function compareWeight(weight1: Weight, weight2: Weight): boolean {
	if (typeof weight1 === 'string' && typeof weight2 === 'string') {
		return weight1 === weight2;
	}

	if (isAxis(weight1) && isAxis(weight2)) {
		return compareAxis(weight1, weight2);
	}
	return false;
}

export function toStringWeight(weight: Weight): string {
	if (typeof weight === 'string') {
		return weight;
	}

	if (isAxis(weight)) {
		return toStringAxis(weight);
	}

	return '';
}

export function extractWeight(value: string): Weight {
	const space = value.includes(' ');

	if (!space) {
		return value;
	}

	const [min, max] = value.split(' ').map(Number);

	return {
		min,
		max
	};
}
