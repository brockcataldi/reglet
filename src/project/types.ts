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

export type Style = {
	id: string;
	fontFamily: string;
	fontWeight: string;
	fontStyle: string;
};

export type Values = {
	fontFamily: string;
	fontWeight: string;
	fontStyle: string;
	lineHeight: number;
	fontSize: number;
};

export type Breakpoint = {
	id: string;
	width: number;
	base: number;
	ratio: number;
	bounds: Bounds;
	overrides: Record<string, Override>;
};

export type Settings = {
	unit: Unit;
	precision: number;
};

export type Project = {
	settings: Settings;
	styles: Style[];
	type: 'traditional' | 'fluid';
	breakpoints: Breakpoint[];
};
