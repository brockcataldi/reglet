export const SUPPORTED_FONT_PROVIDERS = [
	'use.typekit.net',
	'fonts.googleapis.com'
];

export const STYLESHEETS_LOCAL_STORAGE_KEY = 'stylesheets';
export const FAMILIES_LOCAL_STORAGE_KEY = 'families';

export const WEIGHT_VALUES = ['normal', 'bold'] as const;
export const STYLE_VALUES = ['normal', 'italic', 'oblique'] as const;
export const STRETCH_VALUES = [
	'ultra-condensed',
	'extra-condensed',
	'condensed',
	'semi-condensed',
	'normal',
	'semi-expanded',
	'expanded',
	'extra-expanded',
	'ultra-expanded'
] as const;
