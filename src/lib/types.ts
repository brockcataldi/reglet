
export type ProjectType = 'standard' | 'fluid' | 'static';
export type Unit = 'rem' | 'px' | 'pt';

export type ProjectSettings = {
	type: ProjectType;
	unit: Unit;
	precision: number;
};

export type ProjectDefault = {
	width: number;
	modifier: number;
	label: string;
};

export type ScaleSettings = {
	baseSize: number;
	ratio: number;
};

export type TypeSetting = {
	family: string;
	weight: string | number;
	style: 'normal' | 'italic' | 'oblique';
	variationSettings?: Record<string, number>;
}

export function isTypeSetting(value: unknown): value is TypeSetting{
		const candidate = value as Record<string, unknown>;

	if (
		typeof candidate.family !== 'string'
	) {
		return false;
	}

	if (
		typeof candidate.weight !== 'string' &&
		typeof candidate.weight !== 'number'
	) {
		return false;
	}

	if (
		candidate.style !== 'normal' &&
		candidate.style !== 'italic' &&
		candidate.style !== 'oblique'
	) {
		return false;
	}

	if (candidate.variationSettings !== undefined) {
		if (
			typeof candidate.variationSettings !== 'object' ||
			candidate.variationSettings === null ||
			Array.isArray(candidate.variationSettings)
		) {
			return false;
		}

		const settings = candidate.variationSettings as Record<
			string,
			unknown
		>;
		for (const val of Object.values(settings)) {
			if (typeof val !== 'number') {
				return false;
			}
		}
	}

	return true;
}

export type Lane = TypeSetting & {
	id: string;

	//
	overrides: Record<string, SpecimenOverride>;

	// the individual scale per lane
	maxStep: number;
	minStep: number;
	baseSize: number;
	ratio: number;
};

export type SpecimenOverride = {
	lineHeight?: number;
	fontSize?: number;
	// letterSpacing - soon 
};


export type Specimen = {
	fontSize: number;
	fontSizeOverridden: boolean;
	lineHeight: number;
	lineHeightOverridden: boolean;
};

export function isSpecimen(value: unknown): value is Specimen {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const candidate = value as Record<string, unknown>;

	if (
		typeof candidate.fontSize !== 'number' ||
		typeof candidate.fontSizeOverridden !== 'boolean' ||
		typeof candidate.lineHeight !== 'number' ||
		typeof candidate.lineHeightOverridden !== 'boolean'
	) {
		return false;
	}

	return true;
}

export type GridCellLocation = {
	laneId: string;
	step: number;
};

export const isGridCellLocation = (
	value: unknown
): value is GridCellLocation => {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const candidate = value as Record<string, unknown>;

	return (
		typeof candidate.laneId === 'string' &&
		typeof candidate.step === 'number'
	);
};

export type GridCell = GridCellLocation &
	(
		| { type: 'specimen'; value: Specimen }
		| { type: 'controls'; value: 'upper' | 'lower', delete: boolean }
		| { type: 'empty'; value: null }
	);

export type SpecimenGridCell = Extract<GridCell, { type: 'specimen' }>;

export const isSpecimenGridCell = (
	value: unknown
): value is SpecimenGridCell => {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const candidate = value as Record<string, unknown>;

	if (candidate.type !== 'specimen') {
		return false;
	}

	if (!isSpecimen(candidate.value)) {
		return false;
	}

	if (!isGridCellLocation(candidate)) {
		return false;
	}

	return true;
};


export type ControlsGridCell = Extract<GridCell, { type: 'controls' }>;

export const isControlsGridCell = (
	value: unknown
): value is ControlsGridCell => {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const candidate = value as Record<string, unknown>;

	if (candidate.type !== 'controls') {
		return false;
	}

	if (candidate.value !== 'upper' && candidate.value !== 'lower') {
		return false;
	}

	if (!isGridCellLocation(candidate)) {
		return false;
	}

	return true;
};

export type EmptyGridCell = Extract<GridCell, { type: 'empty' }>;

export const isEmptyGridCell = (
	value: unknown
): value is EmptyGridCell => {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const candidate = value as Record<string, unknown>;

	if (candidate.type !== 'marker') {
		return false;
	}

	if (candidate.value !== null) {
		return false;
	}

	if (!isGridCellLocation(candidate)) {
		return false;
	}

	return true;
};

export type Grid = {
	cells: GridCell[][];
	columns: number;
	rows: number;
	max: number;
	min: number;
};

export interface ModularScaleRatio {
	ratio: number;
	label: string;
}
