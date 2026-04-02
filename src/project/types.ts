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
	id: string;
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

export type Breakpoint = {
	base: number;
	ratio: number;
	bounds: Bounds;
	overrides: Record<string, Override>;
};

export type Settings = {
	unit: Unit;
	precision: number;
};

export type TraditionalBreakpoint = {
	id: string;
	minWidth: number;
	breakpoint: Breakpoint;
};

export const isTraditionalBreakpoint = (
	value: unknown
): value is TraditionalBreakpoint => {
	return (
		value !== null &&
		typeof value === 'object' &&
		'id' in value &&
		'minWidth' in value &&
		'breakpoint' in value
	);
};

export type FluidBreakpoints = {
	min: Breakpoint;
	max: Breakpoint;
};

export const isFluidBreakpointsKey = (
	value: unknown
): value is keyof FluidBreakpoints => {
	return value === 'min' || value === 'max';
};

export type Project =
	| {
			settings: Settings;
			textStyles: TextStyle[];
			type: 'traditional';
			breakpoints: TraditionalBreakpoint[];
	  }
	| {
			settings: Settings;
			textStyles: TextStyle[];
			type: 'fluid';
			breakpoints: FluidBreakpoints;
	  };
