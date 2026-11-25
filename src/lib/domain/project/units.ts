import type { FontSizeUnit, LetterSpacingUnit } from '#lib/types.js';

export type UnitOption<T extends string> = {
	value: T;
	description: string;
};

export const FONT_SIZE_UNITS: UnitOption<FontSizeUnit>[] = [
	{
		value: 'rem',
		description:
			'Relative to the root font size; best for scalable, accessible type.'
	},
	{
		value: 'px',
		description:
			'Fixed pixel units; best when you need exact, device-independent sizing.'
	},
	{
		value: 'pt',
		description:
			'Print-oriented points; mainly for print styles, not typical screen UI type.'
	},
	{
		value: 'em',
		description:
			"Relative to the parent's font size; useful for components that scale with their context, but compounds when nested."
	}
];

export const LETTER_SPACING_UNITS: UnitOption<LetterSpacingUnit>[] = [
	{
		value: 'em',
		description:
			"Relative to the element's own font size; letter spacing stays proportional at every size. The typical choice."
	},
	{
		value: 'rem',
		description:
			'Relative to the root font size; consistent spacing regardless of the text size.'
	},
	{
		value: 'ch',
		description:
			'Relative to the width of the "0" glyph; ties spacing to the typeface\'s proportions.'
	},
	{
		value: '%',
		description:
			"Percentage of the element's font size; mirrors design-tool letter spacing values (e.g. Figma)."
	},
	{
		value: 'px',
		description:
			'Fixed pixel units; exact spacing that does not scale with the text.'
	},
	{
		value: 'pt',
		description:
			'Print-oriented points; mainly for print styles, not typical screen UI type.'
	}
];
