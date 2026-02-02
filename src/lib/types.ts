export interface StylesheetUrl {
	hash: string;
	url: string;
}

export interface Axis {
	min: number;
	max: number;
}

export type VariationAxis = {
	name: string;
} & Axis;

export interface VariationAxisValue {
	name: string;
	value: number;
}

export type VariationSetting = VariationAxisValue | VariationAxis;

export type WeightValue = number | 'normal' | 'bold';

export type Weight = WeightValue | Axis;

export type Style = 'normal' | 'italic';

export type OpticalSize = 'none' | 'auto';

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

export interface Face {
	weight: Weight;
	style: Style;
	opticalSize: OpticalSize;
	stretch: Stretch;
	variationSettings: VariationSetting[];
}

export type FaceRule = {
	family: string;
} & Face;

export interface Family {
	id: string;
	family: string;
	faces: Face[];
}

export interface StylesheetUrl {
	hash: string;
	url: string;
}

export interface TextStyle {
	family: string;
	weight: WeightValue;
	style: Style;
	stretch: Stretch;
	opticalSize: OpticalSize;
	variationSettings: VariationAxisValue[];
}
