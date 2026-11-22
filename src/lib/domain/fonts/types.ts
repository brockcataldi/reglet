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
	// ordered normal, italic, oblique
	styles: AvailableFontStyle[];
	// weights available in each style; discrete weights have min === max,
	// variable weights are a range. An empty list means any weight.
	weights: Partial<Record<AvailableFontStyle, AxisRange[]>>;
	// variation axes beyond weight, keyed by tag (ex. wdth, opsz)
	axes: Record<string, AxisRange>;
};
