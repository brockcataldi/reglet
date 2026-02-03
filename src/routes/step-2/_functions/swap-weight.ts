import { type WeightValue, type Weight, isAxis } from '$lib/types';

export function swapWeight(
	weight: WeightValue,
	selectedWeights: Weight[]
): WeightValue {
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
