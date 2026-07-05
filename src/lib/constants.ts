export const KEY_SETTINGS = 'reglet-settings';
export const KEY_PROJECT = 'reglet-project';

export const PROJECT_DEFAULTS_FLUID = {
	min: {
		width: 300,
		modifier: 1
	},
	max: {
		width: 1000,
		modifier: 1.2
	}
} as const;

export const PROJECT_DEFAULTS_STANDARD = [
	{
		width: 0,
		modifier: 1
	},
	{
		width: 768,
		modifier: 1.1
	},
	{
		width: 1200,
		modifier: 1.2
	}
] as const;

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
