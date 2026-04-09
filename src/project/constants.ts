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

export const RATIOS: [number, string][] = [
	[1.067, 'Minor Second'],
	[1.125, 'Major Second'],
	[1.2, 'Minor Third'],
	[1.25, 'Major Third'],
	[1.333, 'Perfect Fourth'],
	[1.414, 'Augmented Fourth (Tritone)'],
	[1.5, 'Perfect Fifth'],
	[1.618, 'Golden Ratio'],
	[1.667, 'Minor Sixth'],
	[1.778, 'Major Sixth'],
	[1.875, 'Minor Seventh'],
	[2, 'Octave'],
];

export const WEB_SAFE_FONTS: string[] = [
	'Arial',
	'Helvetica',
	'Verdana',
	'Tahoma',
	'Trebuchet MS',
	'Impact',
	'Gill Sans',
	'Times New Roman',
	'Georgia',
	'Palatino',
	'Baskerville',
	'Garamond',
	'Courier New',
	'Lucida Console',
	'Monaco',
	'Brush Script MT',
	'Comic Sans MS',
];
