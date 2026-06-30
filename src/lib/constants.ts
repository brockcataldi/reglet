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
