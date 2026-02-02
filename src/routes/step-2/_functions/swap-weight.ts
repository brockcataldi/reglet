import type { WeightValue, Weight } from '$lib/types';
import { isAxis } from '$lib/functions/types';

export function swapWeight(
	weight: WeightValue,
	selectedWeights: Weight | Weight[]
): WeightValue {
	if (Array.isArray(selectedWeights)) {
		const numeric =
			typeof weight === 'number' ? weight : weight === 'bold' ? 700 : 400;
		const string =
			typeof weight === 'string' ? weight : weight === 700 ? 'bold' : 'normal';

		if (selectedWeights.some((w) => w === string)) {
			return string;
		}

		const possible = selectedWeights.some((w) => {
			if (isAxis(w)) {
				return numeric >= w.min && numeric <= w.max;
			}

			if (typeof w === 'number') {
				return w === numeric;
			}

			return false;
		});

		if (possible) {
			return numeric;
		}

		return isAxis(selectedWeights[0])
			? selectedWeights[0].min
			: selectedWeights[0];
	}

	if (isAxis(selectedWeights)) {
		const numeric =
			typeof weight === 'number' ? weight : weight === 'bold' ? 700 : 400;

		if (numeric < selectedWeights.min || numeric > selectedWeights.max) {
			return selectedWeights.min;
		}

		return numeric;
	}

	return selectedWeights;
}
