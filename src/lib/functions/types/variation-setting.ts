import {
	type VariationSetting,
	isVariationAxis,
	isVariationAxisValue,
	compareVariationAxis,
	compareVariationAxisValue
} from '$lib/types';

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

export function uniqueVariationSettings(variationSettings: VariationSetting[]) {
	const seen = new Set<VariationSetting>();
	const seenObjects = new WeakSet<VariationSetting>();

	for (const variationSetting of variationSettings) {
		if (seenObjects.has(variationSetting)) {
			continue;
		}
		seenObjects.add(variationSetting);
		seen.add(variationSetting);
	}

	return [...seen];
}

export function extractWDTH(value: string): VariationSetting | null {
	if (value === '') {
		return null;
	}

	const space = value.includes(' ');
	const percentage = value.includes('%');

	if (percentage) {
		value = value.replaceAll('%', '');
	}

	if (!space) {
		const possibleValue = Number(value);

		if (isNaN(possibleValue)) {
			return null;
		}

		return {
			id: crypto.randomUUID(),
			name: 'wdth',
			value: possibleValue
		};
	}

	const [min, max] = value.split(' ').map(Number);

	return {
		id: crypto.randomUUID(),
		name: 'wdth',
		min,
		max
	};
}
