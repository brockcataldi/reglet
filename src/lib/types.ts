export interface Stylesheet {
	id: string;
	url: string;
}

export * from '$lib/functions/types/stylesheet';

export interface Axis {
	min: number;
	max: number;
}

export * from '$lib/functions/types/axis';

export type VariationAxis = {
	id: string;
	name: string;
} & Axis;

export interface VariationAxisValue {
	id: string;
	name: string;
	value: number;
}

export interface VariationAxisValues {
	id: string;
	name: string;
	values: number[];
}

export * from '$lib/functions/types/variation-axis';

export type VariationSetting = VariationAxisValue | VariationAxis;

export * from '$lib/functions/types/variation-setting';

export type Weight = string | Axis;

export * from '$lib/functions/types/weight';

export interface Face {
	id: string;
	weight: Weight;
	style: string;
	opticalSizing: string;
	stretch: string;
	variationSettings: VariationSetting[];
}

export * from '$lib/functions/types/face';

export type FaceRule = {
	family: string;
} & Face;

export * from '$lib/functions/types/face-rule';

export interface Family {
	id: string;
	from: string;
	family: string;
	faces: Face[];
}

export * from '$lib/functions/types/family';

export interface ProfileMeasurements {
	capHeight: number;
	ascender: number;
	xHeight: number;
	baseline: number;
	descender: number;
}

export interface ProfileMetrics {
	capHeight: number;
	ascender: number;
	xHeight: number;
	descender: number;
}

export interface ProfileStyles {
	family: string;
	weight: string;
	style: string;
	stretch: string;
	opticalSizing: string;
	transform: string;
	variationSettings: VariationAxisValue[];
}

export interface Profile {
	id: string;
	ref: string;
	casing: 'lowercase-dominant' | 'uppercase-dominant';
	styles: ProfileStyles;
	measurements: ProfileMeasurements;
	metrics: ProfileMetrics;
}

export * from '$lib/functions/types/profile';
