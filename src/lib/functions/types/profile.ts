import type { Profile } from '$lib/types';

export const createDefaultProfile = (): Profile => {
	return {
		id: crypto.randomUUID(),
		ref: '',
		casing: 'lowercase-dominant',
		styles: {
			family: '',
			weight: '400',
			style: 'normal',
			stretch: 'normal',
			opticalSizing: 'auto',
			transform: 'none',
			variationSettings: []
		},
		measurements: {
			ascender: 0,
			capHeight: 50,
			xHeight: 100,
			baseline: 150,
			descender: 200
		},
		metrics: {
			ascender: 0.75,
			capHeight: 0.5,
			xHeight: 0.25,
			descender: 0.25
		}
	};
};
