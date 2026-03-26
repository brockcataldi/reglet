export type Unit = 'px' | 'rem' | 'em';
export type ProjectType = 'breakpoint' | 'fluid';

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

export type Breakpoint = {
	base: number;
	ratio: number;
	bounds: Bounds;
	overrides: Record<string, Override>;
	textStyles: TextStyle[];
};

export type Project = {
	unit: Unit;
	precision: number;
};
