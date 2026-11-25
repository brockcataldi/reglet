import type { FontSizeUnit, LetterSpacingUnit } from '#lib/types.js';

// the browser default root font size; em font sizes are treated like rem,
// as if every parent sat at the root size
export const ROOT_FONT_SIZE_PX = 16;

const PX_PER: Record<'rem' | 'em' | 'px' | 'pt', number> = {
	rem: ROOT_FONT_SIZE_PX,
	em: ROOT_FONT_SIZE_PX,
	px: 1,
	pt: 4 / 3
};

/** A font size in another unit, so the type stays the same size. */
export const convertFontSize = (
	value: number,
	from: FontSizeUnit,
	to: FontSizeUnit
) => (value * PX_PER[from]) / PX_PER[to];

/** A font size in px. */
export const fontSizeInPx = (value: number, unit: FontSizeUnit) =>
	value * PX_PER[unit];

/** ch hangs on the width of the font's "0", so it only converts to itself. */
export const canConvertLetterSpacing = (
	from: LetterSpacingUnit,
	to: LetterSpacingUnit
) => from === to || (from !== 'ch' && to !== 'ch');

// em and % scale with the text, so they need its font size to convert
const spacingToPx = (
	value: number,
	unit: Exclude<LetterSpacingUnit, 'ch'>,
	fontSizePx: number
) => {
	if (unit === 'em') return value * fontSizePx;
	if (unit === '%') return (value / 100) * fontSizePx;
	return value * PX_PER[unit];
};

const spacingFromPx = (
	px: number,
	unit: Exclude<LetterSpacingUnit, 'ch'>,
	fontSizePx: number
) => {
	if (unit === 'em') return px / fontSizePx;
	if (unit === '%') return (px / fontSizePx) * 100;
	return px / PX_PER[unit];
};

/**
 * Letter spacing in another unit, at a font size given in px. Undefined when
 * it can't be converted (to or from ch).
 */
export const convertLetterSpacing = (
	value: number,
	from: LetterSpacingUnit,
	to: LetterSpacingUnit,
	fontSizePx: number
): number | undefined => {
	if (from === to) return value;
	if (from === 'ch' || to === 'ch') return undefined;

	// em and % are the same thing at different scales, whatever the size
	if (from === 'em' && to === '%') return value * 100;
	if (from === '%' && to === 'em') return value / 100;

	if (
		fontSizePx <= 0 &&
		(from === 'em' || from === '%' || to === 'em' || to === '%')
	) {
		return undefined;
	}

	return spacingFromPx(
		spacingToPx(value, from, fontSizePx),
		to,
		fontSizePx
	);
};
