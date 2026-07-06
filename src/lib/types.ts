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
	lanes: Lane[];
};

type Lane = {
	id: string;
	font: FontSettings;
	scale: ScaleSettings;
	override: StepOverride[];
};

type FontSettings = {
	family: string;
	weight: string | number;
	style: 'normal' | 'italic' | 'oblique';
	variationSettings?: Record<string, number>;
};

type ScaleSettings = {
	maxStep: number; // upper bound of the modular scale
	minStep: number; // lower bound of the modular scale
	baseSize: number; // in the current project unit
	ratio: number;
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
	Lane,
	FontSettings,
	ScaleSettings,
	StepOverride
};
