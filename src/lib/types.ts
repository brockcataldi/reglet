type ProjectType = 'standard' | 'fluid';
type Unit = 'rem' | 'px' | 'pt';

type SettingsState = {
	type: ProjectType;
	unit: Unit;
	precision: number;
	rawStylesheets: string;
};

type Breakpoint = {
	id: string;
	label: string;
	width: number;
	defaultScale: FullScaleSettings;
	overrides: Record<string, number>;
};

type ScaleSettings = {
	baseSize: number;
	ratio: number;
};

type FullScaleSettings = {
	maxStep: number;
	minStep: number;
} & ScaleSettings;

type Lane = {
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

type GridCell = {
	step: number;
	fontSize: number;
	lineHeight: number;
	laneId: string;
} & Omit<Lane, 'id'>;

export type {
	ProjectType,
	Unit,
	SettingsState,
	Breakpoint,
	Lane,
	ScaleSettings,
	StepOverride,
	GridCell
};
