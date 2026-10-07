type ProjectType = 'standard' | 'fluid' | 'static';
type Unit = 'rem' | 'px' | 'pt';

type ProjectSettings = {
	type: ProjectType;
	unit: Unit;
	precision: number;
};

type ProjectDefault = {
	width: number;
	modifier: number;
	label: string;
};

type Breakpoint = {
	id: string;
	label: string;
	width: number;
	maxStep: number;
	minStep: number;
	defaultScale: ScaleSettings;
	cellOverrides: Record<string, CellOverride>;
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

	// the individual scale for this one
	maxStep: number;
	minStep: number;
	baseSize: number;
	ratio: number;
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
	family: string;
	weight: string | number;
	style: 'normal' | 'italic' | 'oblique';
	variationSettings?: Record<string, number>;
	laneId: string;
};

interface ModularScaleRatio {
	ratio: number;
	label: string;
}

export type {
	ProjectType,
	ProjectDefault,
	Unit,
	ProjectSettings,
	Breakpoint,
	Lane,
	ScaleSettings,
	CellOverride,
	GridCell,
	ModularScaleRatio
};
