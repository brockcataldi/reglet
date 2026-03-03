import {
	type Face,
	type VariationSetting,
	isVariationAxis,
	isVariationAxisValue,
	compareVariationAxis,
	compareVariationAxisValue,
	type VariationAxis,
	type VariationAxisValues
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

export function consolidateVariationSetting(
	current: VariationAxis | VariationAxisValues | undefined,
	setting: VariationSetting
): VariationAxis | VariationAxisValues {
	if (!current) {
		return isVariationAxis(setting)
			? { ...setting }
			: {
					id: setting.id,
					name: setting.name,
					values: [setting.value]
				};
	}

	if (isVariationAxis(current)) {
		return isVariationAxis(setting)
			? {
					...current,
					min: setting.min < current.min ? setting.min : current.min,
					max: setting.max < current.max ? setting.max : current.max
				}
			: {
					...current,
					min: setting.value < current.min ? setting.value : current.min,
					max: setting.value < current.max ? setting.value : current.max
				};
	}

	const eMin = Math.min(...current.values);
	const eMax = Math.max(...current.values);

	return isVariationAxisValue(setting)
		? {
				...current,
				values: [...current.values, setting.value]
			}
		: {
				id: current.id,
				name: current.name,
				min: eMin < setting.min ? eMin : setting.min,
				max: eMax > setting.max ? eMax : setting.max
			};
}

export function consolidateVariationSettings(
	faces: Face[] | undefined
): (VariationAxis | VariationAxisValues)[] {
	if (faces === undefined) {
		return [];
	}

	const settings = new Map<string, VariationAxis | VariationAxisValues>();

	for (const face of faces) {
		for (const setting of face.variationSettings) {
			const current = settings.get(setting.name);
			settings.set(setting.name, consolidateVariationSetting(current, setting));
		}
	}

	return [...settings.values()];
}
