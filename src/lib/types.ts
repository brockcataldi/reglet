// standard: root plus any number of breakpoints above it
// fluid: a fixed min and max; tags are placed at both and sizes slide between
// static: no breakpoints, just the root
export type ProjectType = 'standard' | 'fluid' | 'static';

export type FontSizeUnit = 'rem' | 'px' | 'pt' | 'em';
export type LetterSpacingUnit = 'em' | 'px' | 'rem' | 'ch' | 'pt' | '%';

export type Unit = FontSizeUnit | LetterSpacingUnit;

export type ProjectSettings = {
	type: ProjectType;
	fontSizeUnit: FontSizeUnit;
	letterSpacingUnit: LetterSpacingUnit;
	precision: number;
};

/**
 * Breakpoints are ordered by width, smallest first. The first one is the root:
 * `standard` projects can add as many as they like above it, `static`
 * projects only have the root, and `fluid` projects have exactly two (min and
 * max) that fluid sizes interpolate between.
 */
export type Breakpoint = {
	id: string;
	name: string;
	width: number;
};

export type TagPlacement = {
	laneId: string;
	step: number;
};

/**
 * A named role (h1, body-l, caption…) pinned to specimens. A tag applies from
 * `startsAt` upward; a breakpoint without its own placement inherits the
 * closest one below it. Static projects only ever place on the root. Fluid
 * projects place on min and max, and the size slides between the two.
 */
export type Tag = {
	id: string;
	name: string;
	startsAt: string;
	placements: Record<string, TagPlacement>;
};

export type TagTemplateTag = {
	name: string;
	step: number;
};

export type TagTemplate = {
	id: string;
	name: string;
	description: string;
	tags: TagTemplateTag[];
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
};

export function isTypeSetting(value: unknown): value is TypeSetting {
	const candidate = value as Record<string, unknown>;

	if (typeof candidate.family !== 'string') {
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

	// a linked lane follows its source lane's font but keeps its own scale;
	// links are one level deep, and linked lanes sit right after their source
	linkedTo?: string;
	// on a source lane: a tag placed on it at the first breakpoint is also
	// placed on the nth linked lane at the nth breakpoint, at the same step
	matchSteps?: boolean;

	// the individual scale per lane
	maxStep: number;
	minStep: number;
	baseSize: number;
	ratio: number;
};

export type SpecimenOverride = {
	lineHeight?: number;
	fontSize?: number;
	letterSpacing?: number;
};

export type Specimen = {
	fontSize: number;
	fontSizeOverridden: boolean;
	lineHeight: number;
	lineHeightOverridden: boolean;
	letterSpacing: number;
	letterSpacingOverridden: boolean;
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
		typeof candidate.lineHeightOverridden !== 'boolean' ||
		typeof candidate.letterSpacing !== 'number' ||
		typeof candidate.letterSpacingOverridden !== 'boolean'
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
		| { type: 'controls'; value: 'upper' | 'lower'; delete: boolean }
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
