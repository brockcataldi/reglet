import type {
	Breakpoint,
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

/**
 * Steps assume the default lane (1rem base, 1.2 ratio) and land as close to
 * each system's published sizes as that scale allows; several tags sharing a
 * step is expected. Each step is round(log(px / 16) / log(1.2)).
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
		id: 'bootstrap',
		name: 'Bootstrap 5',
		description: 'Display headings, h1–h6, lead and small text.',
		tags: [
			{ name: 'display-1', step: 9 },
			{ name: 'display-2', step: 8 },
			{ name: 'display-3', step: 8 },
			{ name: 'display-4', step: 7 },
			{ name: 'display-5', step: 6 },
			{ name: 'display-6', step: 5 },
			{ name: 'h1', step: 5 },
			{ name: 'h2', step: 4 },
			{ name: 'h3', step: 3 },
			{ name: 'h4', step: 2 },
			{ name: 'h5', step: 1 },
			{ name: 'h6', step: 0 },
			{ name: 'lead', step: 1 },
			{ name: 'body', step: 0 },
			{ name: 'small', step: -1 }
		]
	},
	{
		id: 'tailwind',
		name: 'Tailwind CSS',
		description: 'The text-xs to text-9xl size utilities.',
		tags: [
			{ name: 'text-9xl', step: 11 },
			{ name: 'text-8xl', step: 10 },
			{ name: 'text-7xl', step: 8 },
			{ name: 'text-6xl', step: 7 },
			{ name: 'text-5xl', step: 6 },
			{ name: 'text-4xl', step: 4 },
			{ name: 'text-3xl', step: 3 },
			{ name: 'text-2xl', step: 2 },
			{ name: 'text-xl', step: 1 },
			{ name: 'text-lg', step: 1 },
			{ name: 'text-base', step: 0 },
			{ name: 'text-sm', step: -1 },
			{ name: 'text-xs', step: -2 }
		]
	},
	{
		id: 'apple',
		name: 'Apple (iOS)',
		description: 'Dynamic Type text styles at the default size.',
		tags: [
			{ name: 'large-title', step: 4 },
			{ name: 'title-1', step: 3 },
			{ name: 'title-2', step: 2 },
			{ name: 'title-3', step: 1 },
			{ name: 'headline', step: 0 },
			{ name: 'body', step: 0 },
			{ name: 'callout', step: 0 },
			{ name: 'subheadline', step: 0 },
			{ name: 'footnote', step: -1 },
			{ name: 'caption-1', step: -2 },
			{ name: 'caption-2', step: -2 }
		]
	},
	{
		id: 'carbon',
		name: 'IBM Carbon',
		description: 'Productive heading, body and label type tokens.',
		tags: [
			{ name: 'heading-07', step: 7 },
			{ name: 'heading-06', step: 5 },
			{ name: 'heading-05', step: 4 },
			{ name: 'heading-04', step: 3 },
			{ name: 'heading-03', step: 1 },
			{ name: 'heading-02', step: 0 },
			{ name: 'heading-01', step: -1 },
			{ name: 'body-02', step: 0 },
			{ name: 'body-01', step: -1 },
			{ name: 'label-01', step: -2 },
			{ name: 'helper-text-01', step: -2 },
			{ name: 'caption-01', step: -2 }
		]
	},
	{
		id: 'govuk',
		name: 'GOV.UK',
		description: 'Design System headings and body sizes on desktop.',
		tags: [
			{ name: 'heading-xl', step: 6 },
			{ name: 'heading-l', step: 4 },
			{ name: 'heading-m', step: 2 },
			{ name: 'heading-s', step: 1 },
			{ name: 'body-l', step: 2 },
			{ name: 'body', step: 1 },
			{ name: 'body-s', step: 0 }
		]
	},
	{
		id: 'utopia',
		name: 'Utopia',
		description: 'Numbered steps, for fluid type scales.',
		tags: [
			{ name: 'step-5', step: 5 },
			{ name: 'step-4', step: 4 },
			{ name: 'step-3', step: 3 },
			{ name: 'step-2', step: 2 },
			{ name: 'step-1', step: 1 },
			{ name: 'step-0', step: 0 },
			{ name: 'step--1', step: -1 },
			{ name: 'step--2', step: -2 }
		]
	},
	{
		id: 'custom',
		name: 'Blank',
		description: 'No tags; name your own.',
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
