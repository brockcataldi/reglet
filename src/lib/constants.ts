import type {
	Breakpoint,
	FluidScale,
	ModularScaleRatio,
	ProjectType,
	TagTemplate
} from './types';

export const LOCAL_STORAGE_KEY_FONTS = 'reglet-fonts';
export const LOCAL_STORAGE_KEY_SETTINGS = 'reglet-settings';
export const LOCAL_STORAGE_KEY_BREAKPOINTS = 'reglet-breakpoints';
export const LOCAL_STORAGE_KEY_LANES = 'reglet-lanes';
export const LOCAL_STORAGE_KEY_TAGS = 'reglet-tags';
export const LOCAL_STORAGE_KEY_DRAFT = 'reglet-draft';

export const DEFAULT_PROJECT_TYPE: ProjectType = 'standard';

export const BREAKPOINT_DEFAULTS: Record<
	ProjectType,
	Omit<Breakpoint, 'id'>[]
> = {
	static: [{ name: 'Root', width: 0 }],
	// utopia.fyi's defaults
	fluid: [
		{ name: 'Min', width: 320 },
		{ name: 'Max', width: 1240 }
	],
	standard: [
		{ name: 'Root', width: 0 },
		{ name: 'Tablet', width: 768 },
		{ name: 'Desktop', width: 1200 }
	]
};

// utopia.fyi's defaults (18px @ 1.2 → 20px @ 1.25), relative to a 1rem min base
export const FLUID_SCALE_DEFAULT: FluidScale = {
	maxBaseSize: 1.111,
	maxRatio: 1.25,
	linkRatio: false
};

/**
 * Steps assume the default lane (1rem base, 1.2 ratio) and land as close to
 * each system's published sizes as that scale allows; several tags sharing a
 * step is expected.
 */
export const TAG_TEMPLATES: TagTemplate[] = [
	{
		id: 'html',
		name: 'HTML',
		description: 'Headings, body copy and small print.',
		tags: [
			{ name: 'h1', step: 6 },
			{ name: 'h2', step: 5 },
			{ name: 'h3', step: 4 },
			{ name: 'h4', step: 3 },
			{ name: 'h5', step: 2 },
			{ name: 'h6', step: 1 },
			{ name: 'body', step: 0 },
			{ name: 'small', step: -1 }
		]
	},
	{
		id: 'material',
		name: 'Material 3',
		description:
			'Display, headline, title, body and label in three sizes.',
		tags: [
			{ name: 'display-large', step: 7 },
			{ name: 'display-medium', step: 6 },
			{ name: 'display-small', step: 5 },
			{ name: 'headline-large', step: 4 },
			{ name: 'headline-medium', step: 3 },
			{ name: 'headline-small', step: 2 },
			{ name: 'title-large', step: 1 },
			{ name: 'title-medium', step: 0 },
			{ name: 'title-small', step: -1 },
			{ name: 'body-large', step: 0 },
			{ name: 'body-medium', step: -1 },
			{ name: 'body-small', step: -2 },
			{ name: 'label-large', step: -1 },
			{ name: 'label-medium', step: -2 },
			{ name: 'label-small', step: -2 }
		]
	},
	{
		id: 'fluent',
		name: 'Fluent 2',
		description: 'The Fluent 2 web type ramp, from caption to display.',
		tags: [
			{ name: 'display', step: 8 },
			{ name: 'large-title', step: 5 },
			{ name: 'title-1', step: 4 },
			{ name: 'title-2', step: 3 },
			{ name: 'title-3', step: 2 },
			{ name: 'subtitle-1', step: 1 },
			{ name: 'subtitle-2', step: 0 },
			{ name: 'body-1', step: -1 },
			{ name: 'caption-1', step: -2 },
			{ name: 'caption-2', step: -3 }
		]
	},
	{
		id: 'custom',
		name: 'Custom',
		description: 'Start empty and name your own tags.',
		tags: []
	}
];

export const MODULAR_SCALE_RATIOS: ModularScaleRatio[] = [
	{ ratio: 1.067, label: 'Minor Second' },
	{ ratio: 1.125, label: 'Major Second' },
	{ ratio: 1.2, label: 'Minor Third' },
	{ ratio: 1.25, label: 'Major Third' },
	{ ratio: 1.333, label: 'Perfect Fourth' },
	{ ratio: 1.414, label: 'Augmented Fourth' },
	{ ratio: 1.5, label: 'Perfect Fifth' },
	{ ratio: 1.618, label: 'Golden Ratio' },
	{ ratio: 1.667, label: 'Minor Sixth' },
	{ ratio: 1.778, label: 'Major Sixth' },
	{ ratio: 1.875, label: 'Minor Seventh' },
	{ ratio: 2, label: 'Octave' },
	{ ratio: 2.5, label: 'Major Tenth' },
	{ ratio: 2.667, label: 'Major Eleventh' },
	{ ratio: 3, label: 'Major Twelfth' },
	{ ratio: 4, label: 'Double Octave' }
];

export type DeviceType = 'mobile' | 'tablet' | 'laptop' | 'desktop';

export const DEVICES = [
	{
		name: 'iPhone SE',
		slug: 'iphone-se',
		type: 'mobile',
		width: 320,
		orienation: 'tt'
	},
	{
		name: 'iPhone 16',
		slug: 'iphone-16',
		type: 'mobile',
		width: 339,
		orienation: 'tb'
	},
	{
		name: 'iPhone 16 Plus',
		slug: 'iphone-16-plus',
		type: 'mobile',
		width: 430,
		orienation: 'bt'
	},
	{
		name: 'iPhone 16 Pro Max',
		slug: 'iphone-16-pro-max',
		type: 'mobile',
		width: 440,
		orienation: 'bb'
	},
	{
		name: 'Samsung Galaxy S24',
		slug: 'samsung-galaxy-s24',
		type: 'mobile',
		width: 360,
		orienation: 'tt'
	},
	{
		name: 'Google Pixel 8',
		slug: 'google-pixel-8',
		type: 'mobile',
		width: 412,
		orienation: 'tb'
	},
	{
		name: 'iPad Mini',
		slug: 'ipad-mini',
		type: 'tablet',
		width: 768,
		orienation: 'bt'
	},
	{
		name: 'iPad Air',
		slug: 'ipad-air',
		type: 'tablet',
		width: 820,
		orienation: 'bb'
	},
	{
		name: 'iPad Pro 11"',
		slug: 'ipad-pro-11',
		type: 'tablet',
		width: 834,
		orienation: 'tt'
	},
	{
		name: 'iPad Pro 12.9"',
		slug: 'ipad-pro-12-9',
		type: 'tablet',
		width: 1024,
		orienation: 'tb'
	},
	{
		name: 'MacBook Air 13"',
		slug: 'macbook-air-13',
		type: 'laptop',
		width: 1280,
		orienation: 'bt'
	},
	{
		name: 'MacBook Pro 14"',
		slug: 'macbook-pro-14',
		type: 'laptop',
		width: 1512,
		orienation: 'bb'
	},
	{
		name: 'MacBook Pro 16"',
		slug: 'macbook-pro-16',
		type: 'laptop',
		width: 1728,
		orienation: 'tt'
	},
	{
		name: 'Monitor 1080p',
		slug: 'monitor-1080p',
		type: 'desktop',
		width: 1920,
		orienation: 'tb'
	},
	{
		name: 'Monitor 1440p',
		slug: 'monitor-1440p',
		type: 'desktop',
		width: 2560,
		orienation: 'bt'
	},
	{
		name: 'Monitor 4K',
		slug: 'monitor-4k',
		type: 'desktop',
		width: 3840,
		orienation: 'bb'
	}
] as const;
