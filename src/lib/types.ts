type ProjectType = 'standard' | 'fluid';
type Unit = 'rem' | 'px' | 'pt';

type SettingsState = {
	type: ProjectType;
	unit: Unit;
	rawStylesheets: string;
};

type Breakpoint = {
	id: string; // uuid
	label: string;
	width: number;
	defaultScale: FullScaleSettings;
};

type ScaleSettings = {
	baseSize: number;
	ratio: number;
};

type FullScaleSettings = {
	maxStep: number;
	minStep: number;
} & ScaleSettings;

// type Lane = {
// 	id: string;
// 	font: FontSettings;
// 	// // scale: ScaleSettings; to be added after, I think we make this optional overrides
// 	// override: StepOverride[];
// };

type FontLane = {
	id: string;
	family: string;
	weight: string | number;
	style: 'normal' | 'italic' | 'oblique';
	variationSettings?: Record<string, number>;
};

type StepOverride = {
	step: number;
	lineHeight?: number;
	fontSize?: number;
};

export type {
	ProjectType,
	Unit,
	SettingsState,
	Breakpoint,
	FontLane,
	ScaleSettings,
	StepOverride
};
