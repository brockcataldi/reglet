export type Unit = 'px' | 'rem' | 'pt';
export type ProjectType = 'traditional' | 'fluid';

export type Bounds = {
	min: number;
	max: number;
};

export type Override = {
	lineHeight: number;
	fontSize: number;
};

export type TextStyle = {
	fontFamily: string;
	fontWeight: string;
	fontStyle: string;
};

export type Cell = {
	fontFamily: string;
	fontWeight: string;
	fontStyle: string;
	lineHeight: number;
	fontSize: number;
};

export type BreakpointSettings = {
	id: string;
	base: number;
	ratio: number;
	bounds: Bounds;
	overrides: Record<string, Override>;
	textStyles: TextStyle[];
};

export type Settings = {
	unit: Unit;
	precision: number;
	type: ProjectType;
};

export type TraditionalBreakpoint = BreakpointSettings & {
	minWidth: number;
};
export type TraditionalBreakpoints = TraditionalBreakpoint[];

export type FluidBreakpoint = BreakpointSettings;
export type FluidBreakpoints = { min: FluidBreakpoint; max: FluidBreakpoint };

export const isFluidBreakpointsKey = (
	value: unknown
): value is keyof FluidBreakpoints => {
	return value === 'min' || value === 'max';
};

export type BreakpointId = string | keyof FluidBreakpoints;

export type Project = {
	settings: Settings;
	traditional: TraditionalBreakpoints;
	fluid: FluidBreakpoints;
};
