import type { FontSizeUnit, LetterSpacingUnit } from '#lib/types.js';

export type UnitOption<T extends string> = {
	value: T;
	// the job the unit is best at, phrased as an answer to "what is it for?"
	useCase: string;
	description: string;
};

export const FONT_SIZE_UNITS: UnitOption<FontSizeUnit>[] = [
	{
		value: 'rem',
		useCase: 'Websites and apps',
		description:
			'Grows when a reader raises their default text size, so type stays accessible.'
	},
	{
		value: 'em',
		useCase: 'Components that resize with their container',
		description:
			"Follows the parent element's font size; compounds when nested."
	},
	{
		value: 'px',
		useCase: 'Matching a design file exactly',
		description:
			"Ignores the reader's text size setting; the numbers match Figma and Sketch."
	},
	{
		value: 'pt',
		useCase: 'Print stylesheets',
		description:
			'The unit printers and word processors use (1/72 of an inch); rare on screens.'
	}
];

export const LETTER_SPACING_UNITS: UnitOption<LetterSpacingUnit>[] = [
	{
		value: 'em',
		useCase: 'Spacing that stays in proportion at every size',
		description:
			'Set it once and it looks the same on a caption and a headline.'
	},
	{
		value: '%',
		useCase: 'Copying values straight from Figma',
		description:
			'The same as em times 100; Figma shows letter spacing this way.'
	},
	{
		value: 'ch',
		useCase: 'Spacing tied to the typeface',
		description:
			'Follows the width of the typeface\'s "0": wide typefaces get more space, narrow ones less.'
	},
	{
		value: 'rem',
		useCase: 'The same spacing at every text size',
		description:
			'Follows the root font size, so it looks loose on small text and tight on large text.'
	},
	{
		value: 'px',
		useCase: 'Exact, fixed spacing',
		description: 'Never changes, whatever the text size.'
	},
	{
		value: 'pt',
		useCase: 'Print stylesheets',
		description:
			'The unit printers and word processors use (1/72 of an inch).'
	}
];
