import type {
	VariationAxis,
	VariationAxisValue,
	VariationAxisValues,
	Weight
} from '$lib/types';

import { isAxisArray, isVariationAxisValues } from '$lib/types';
import { isStringArray } from '$lib/functions/utilities';

export const coerceString = (
	current: string,
	choices: string[] | undefined
) => {
	if (!choices) {
		return current;
	}

	if (!choices.includes(current)) {
		return choices[0];
	}

	return current;
};

export const coerceWeight = (
	current: string,
	choices: Weight[] | undefined
) => {
	if (!choices) {
		return current;
	}

	if (isStringArray(choices)) {
		if (!choices.includes(current)) {
			return choices[0];
		}
		return current;
	}

	if (isAxisArray(choices)) {
		const rawWeight = parseInt(current);
		const selectedWeight = choices[0];

		if (
			isNaN(rawWeight) ||
			rawWeight < selectedWeight.min ||
			rawWeight > selectedWeight.max
		) {
			return selectedWeight.min.toString();
		}
		return current;
	}

	return current;
};

export const coerceVariationSettings = (
	current: VariationAxisValue[],
	choices: (VariationAxis | VariationAxisValues)[]
): VariationAxisValue[] => {
	return choices.map((choice) => {
		const found = current.find((c) => c.name === choice.name);

		if (isVariationAxisValues(choice)) {
			if (
				choice.values.length === 1 ||
				!found ||
				!choice.values.includes(found.value)
			) {
				return {
					id: crypto.randomUUID(),
					name: choice.name,
					value: choice.values[0]
				};
			}
		} else {
			if (!found || choice.min > found.value || choice.max < found.value) {
				return {
					id: crypto.randomUUID(),
					name: choice.name,
					value: choice.min
				};
			}
		}

		return found;
	});
};
