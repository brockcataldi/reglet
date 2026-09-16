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
	maxStep: number;
	minStep: number;
	defaultScale: ScaleSettings;
	overrides: Record<string, CellOverride>; // this should probably be renamed to cellOverrides (because I have a feeling I'll want to move in laneOverrides)
};

type ScaleSettings = {
	baseSize: number;
	ratio: number;
};

type Lane = {
	id: string;
	family: string;
	weight: string | number;
	style: 'normal' | 'italic' | 'oblique';
	variationSettings?: Record<string, number>;
};

type CellOverride = {
	lineHeight?: number;
	fontSize?: number;
};

type GridCell = {
	step: number;
	fontSize: number;
	fontSizeOverridden: boolean;
	lineHeight: number;
	lineHeightOverridden: boolean;
	// laneId: string;
} & Lane;

export interface ModularScaleRatio {
  ratio: number;
  label: string;
}


export type {
	ProjectType,
	Unit,
	SettingsState,
	Breakpoint,
	Lane,
	ScaleSettings,
	CellOverride,
	GridCell
};
