import type { TypeSetting } from '#lib/types.js';

// the names font menus use for the standard weights
const WEIGHT_NAMES: Record<number, string> = {
	100: 'Thin',
	200: 'ExtraLight',
	300: 'Light',
	400: 'Regular',
	500: 'Medium',
	600: 'SemiBold',
	700: 'Bold',
	800: 'ExtraBold',
	900: 'Black'
};

const KEYWORD_WEIGHTS: Record<string, number> = {
	normal: 400,
	bold: 700
};

const toWeightName = (weight: TypeSetting['weight']) => {
	const keyword =
		typeof weight === 'string'
			? KEYWORD_WEIGHTS[weight.trim()]
			: undefined;
	const number = keyword ?? Number(weight);

	// off-grid weights like 450, or anything unreadable, keep what was set
	return WEIGHT_NAMES[number] ?? `${weight}`;
};

/**
 * Names a weight and style the way font menus do: "Regular", "Bold Italic",
 * "Light Oblique". A regular-weight slant is just "Italic" or "Oblique".
 */
export const toStyleName = ({
	weight,
	style
}: Pick<TypeSetting, 'weight' | 'style'>): string => {
	const weightName = toWeightName(weight);

	if (style === 'normal') {
		return weightName;
	}

	const slant = style === 'italic' ? 'Italic' : 'Oblique';

	return weightName === 'Regular' ? slant : `${weightName} ${slant}`;
};
