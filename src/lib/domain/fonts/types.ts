export type RawGoogleFont = {
	family: string;
	faces: Record<string, string>[];
};

export type FontFaceDescriptors = Pick<
	FontFace,
	'family' | 'weight' | 'style' | 'stretch'
>;

export type AxisRange = {
	min: number;
	max: number;
};

export type AvailableFontStyle = 'normal' | 'italic' | 'oblique';

export type AvailableFamily = {
	family: string;
	// discrete weights have min === max, variable weights are a range
	weights: AxisRange[];
	styles: AvailableFontStyle[];
	// variation axes beyond weight, keyed by tag (ex. wdth, opsz)
	axes: Record<string, AxisRange>;
};
