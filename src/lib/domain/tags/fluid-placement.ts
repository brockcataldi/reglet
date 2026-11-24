import type { Lane, TypeSetting } from '#lib/types.js';

import { toSpecimen } from '#lib/domain/project/to-specimen.js';

/** Where one end of a fluid tag sits. */
export type FluidEnd = {
	lane: Lane;
	step: number;
};

const KEYWORD_WEIGHTS: Record<string, string> = {
	normal: '400',
	bold: '700'
};

const weightOf = (weight: TypeSetting['weight']) => {
	const text = `${weight}`.trim();
	return KEYWORD_WEIGHTS[text] ?? text;
};

const sameAxes = (
	a: Record<string, number> = {},
	b: Record<string, number> = {}
) => {
	const keys = Object.keys(a);

	return (
		keys.length === Object.keys(b).length &&
		keys.every((key) => key in b && a[key] === b[key])
	);
};

/**
 * Whether two lanes set the same font, so a size can slide between them:
 * only the size interpolates, so everything else has to match.
 */
export const isSameFont = (a: TypeSetting, b: TypeSetting) =>
	a.family.trim() === b.family.trim() &&
	weightOf(a.weight) === weightOf(b.weight) &&
	a.style === b.style &&
	sameAxes(a.variationSettings, b.variationSettings);

/**
 * Why a fluid tag's min and max placements can't stand together, or
 * undefined when they can. A max needs a min to slide from, has to set the
 * same font, and can't be smaller than the min. A min alone is fine: the max
 * inherits it, so the size holds steady.
 */
export const fluidPlacementError = (
	min: FluidEnd | undefined,
	max: FluidEnd | undefined,
	precision: number
): string | undefined => {
	if (!max) {
		return undefined;
	}

	if (!min) {
		return 'Place it at min first.';
	}

	if (!isSameFont(min.lane, max.lane)) {
		return 'Max has to use the same font as min.';
	}

	const minSize = toSpecimen(min.lane, min.step, precision).fontSize;
	const maxSize = toSpecimen(max.lane, max.step, precision).fontSize;

	if (maxSize < minSize) {
		return "Max can't be smaller than min.";
	}

	return undefined;
};

/**
 * Unitless line heights can't go in a clamp(), so a tag whose line height
 * changes between min and max has to export it as a fluid length instead.
 */
export const fluidLineHeightChanges = (
	min: FluidEnd | undefined,
	max: FluidEnd | undefined,
	precision: number
) =>
	min !== undefined &&
	max !== undefined &&
	toSpecimen(min.lane, min.step, precision).lineHeight !==
		toSpecimen(max.lane, max.step, precision).lineHeight;
