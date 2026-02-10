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

export type WeightValue = number | 'normal' | 'bold';

export type Weight = WeightValue | Axis;

export * from '$lib/functions/types/weight';

export type Style = 'normal' | 'italic';

export * from '$lib/functions/types/style';

export type OpticalSizing = 'none' | 'auto';

export * from '$lib/functions/types/optical-size';

export type StretchString =
	| 'ultra-condensed'
	| 'extra-condensed'
	| 'condensed'
	| 'semi-condensed'
	| 'normal'
	| 'semi-expanded'
	| 'expanded'
	| 'extra-expanded'
	| 'ultra-expanded';

export type Stretch = StretchString | number;

export * from '$lib/functions/types/stretch';

export interface Face {
	id: string;
	weight: Weight;
	style: Style;
	opticalSizing: OpticalSizing;
	stretch: Stretch;
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
	weight: WeightValue;
	style: Style;
	stretch: Stretch;
	opticalSize: OpticalSizing;
	variationSettings: VariationAxisValue[];
}
