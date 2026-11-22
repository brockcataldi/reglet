import type { TypeSetting } from '#lib/types.js';
import type { AvailableFamily, AxisRange } from './types';

const clamp = (value: number, { min, max }: AxisRange) =>
	Math.min(Math.max(value, min), max);

const fitWeight = (
	weight: TypeSetting['weight'],
	ranges: AxisRange[]
): TypeSetting['weight'] => {
	if (ranges.length === 0) {
		return weight;
	}

	const parsed = Number(weight);
	const target = Number.isFinite(parsed) ? parsed : 400;

	let best = target;
	let bestDistance = Infinity;

	for (const range of ranges) {
		const candidate = clamp(target, range);
		const distance = Math.abs(candidate - target);

		// ties go to the heavier weight, matching CSS fallback for >= 400
		if (
			distance < bestDistance ||
			(distance === bestDistance && candidate > best)
		) {
			best = candidate;
			bestDistance = distance;
		}
	}

	return String(best);
};

/**
 * Snaps a type setting to what the family actually provides: an available
 * style, then the nearest weight that style comes in, and only the family's
 * axes, clamped to their ranges. Unknown families are left untouched.
 */
export const fitTypeSetting = (
	setting: TypeSetting,
	family: AvailableFamily | undefined
): TypeSetting => {
	if (!family) {
		return setting;
	}

	const style =
		family.styles.length === 0 || family.styles.includes(setting.style)
			? setting.style
			: family.styles.includes('normal')
				? 'normal'
				: family.styles[0];

	const variationSettings: Record<string, number> = {};

	for (const [tag, value] of Object.entries(
		setting.variationSettings ?? {}
	)) {
		const range = family.axes[tag];

		if (range) {
			variationSettings[tag] = clamp(value, range);
		}
	}

	return {
		...setting,
		weight: fitWeight(setting.weight, family.weights[style] ?? []),
		style,
		variationSettings
	};
};
