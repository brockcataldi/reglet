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

export interface TextStyle {
	family: string;
	weight: string;
	style: string;
	stretch: string;
	opticalSize: string;
	variationSettings: VariationAxisValue[];
}
