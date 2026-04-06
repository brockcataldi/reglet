import type { Unit } from './types';

export const CONVERSION_RATIOS: Record<string, number> = {
	'px-pt': 72 / 96,
	'px-rem': 1 / 16,
	'pt-px': 96 / 72,
	'pt-rem': ((96 / 72) * 1) / 16,
	'rem-px': 16,
	'rem-pt': 16 * (72 / 96),
};

export const LARGE_TEXT_CUTOFFS: Record<Unit, number> = {
	px: 24,
	rem: 1.5,
	pt: 18,
};
