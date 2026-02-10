import {
	type Face,
	compareWeight,
	compareStretch,
	compareVariationSetting
} from '$lib/types';

export function compareFace(face1: Face, face2: Face): boolean {
	if (!compareWeight(face1.weight, face2.weight)) {
		return false;
	}

	if (face1.style !== face2.style) {
		return false;
	}

	if (face1.opticalSizing !== face2.opticalSizing) {
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
