import {
	createContext,
	useState,
	useCallback,
	useContext,
	type ReactNode,
	useEffect,
} from 'react';

import {
	isFluidBreakpointsKey,
	type Cell,
	type FluidBreakpoint,
	type FluidBreakpoints,
	type Override,
	type Settings,
	type TraditionalBreakpoint,
	type TraditionalBreakpoints,
	type Unit,
} from '../types';

import { scale, toPrecise } from '../functions';

type ProjectContextType = {
	project: Settings;
	traditional: TraditionalBreakpoints;
	fluid: FluidBreakpoints;

	getBreakpoint: (
		id: string | keyof FluidBreakpoints
	) => TraditionalBreakpoint | FluidBreakpoint | undefined;
	getBreakpointTable: (id: string | keyof FluidBreakpoints) => Cell[][];
	getOverride: (
		id: string | keyof FluidBreakpoints,
		rowIndex: number,
		columnIndex: number
	) => Override | undefined;
	setUnit: (unit: Unit) => void;
	setPrecision: (precision: number) => void;
	unlinkCell: (
		id: string,
		rowIndex: number,
		columnIndex: number,
		cell: Cell
	) => void;
};

const ProjectContext = createContext<ProjectContextType | null>(null);

type ProjectProviderProps = {
	children: ReactNode;
};

export const ProjectProvider = ({ children }: ProjectProviderProps) => {
	const [project, setProject] = useState<Settings>({
		unit: 'rem',
		precision: 3,
		type: 'traditional',
	});

	const [fluid, setFluid] = useState<FluidBreakpoints>({
		min: {
			id: crypto.randomUUID(),
			base: 1,
			ratio: 1.2,
			bounds: { min: -1, max: 5 },
			overrides: {},
			textStyles: [
				{
					fontFamily: 'Arial',
					fontWeight: '400',
					fontStyle: 'normal',
				},
			],
		},
		max: {
			id: crypto.randomUUID(),
			base: 1.1,
			ratio: 1.2,
			bounds: { min: -1, max: 5 },
			overrides: {},
			textStyles: [
				{
					fontFamily: 'Arial',
					fontWeight: '400',
					fontStyle: 'normal',
				},
			],
		},
	});

	const [traditional, setTraditional] = useState<TraditionalBreakpoints>([
		{
			id: crypto.randomUUID(),
			minWidth: 0,
			base: 1,
			ratio: 1.2,
			bounds: { min: -1, max: 5 },
			overrides: {},
			textStyles: [
				{
					fontFamily: 'Arial',
					fontWeight: '400',
					fontStyle: 'normal',
				},
			],
		},
	]);

	const getBreakpoint = useCallback(
		(
			id: string | keyof FluidBreakpoints
		): TraditionalBreakpoint | FluidBreakpoint | undefined => {
			if (project.type === 'traditional' && !isFluidBreakpointsKey(id)) {
				return traditional.find((t) => t.id === id);
			}

			if (project.type === 'fluid' && isFluidBreakpointsKey(id)) {
				return fluid[id];
			}
			return;
		},
		[project.type, traditional, fluid]
	);

	const getBreakpointTable = useCallback(
		(id: string | keyof FluidBreakpoints): Cell[][] => {
			const cells: Cell[][] = [];
			const breakpoint = getBreakpoint(id);

			if (!breakpoint) {
				return cells;
			}

			const { bounds, textStyles, base, ratio, overrides } = breakpoint;

			for (let i = bounds.max; i >= bounds.min; i--) {
				const row: Cell[] = [];
				for (let j = 0; j < textStyles.length; j++) {
					const override = overrides[`${i}:${j}`];

					const cell = {
						...textStyles[j],
						fontSize:
							override?.fontSize ??
							toPrecise(scale(i, base, ratio), project.precision),
						lineHeight: override?.lineHeight ?? 1,
					};

					row.push(cell);
				}
				cells.push(row);
			}
			return cells;
		},
		[getBreakpoint, traditional, fluid, project.precision]
	);

	const getOverride = useCallback(
		(
			id: string | keyof FluidBreakpoints,
			rowIndex: number,
			columnIndex: number
		): Override | undefined => {
			const breakpoint = getBreakpoint(id);

			if (!breakpoint) {
				return undefined;
			}

			return breakpoint.overrides[`${rowIndex}:${columnIndex}`];
		},
		[getBreakpoint]
	);

	const setUnit = useCallback((unit: Unit) => {
		setProject((prev) => ({ ...prev, unit: unit }));
	}, []);

	const setPrecision = useCallback((precision: number) => {
		setProject((prev) => ({ ...prev, precision: precision }));
	}, []);

	const unlinkCell = useCallback(
		(id: string, rowIndex: number, columnIndex: number, cell: Cell) => {
			const key = `${rowIndex}:${columnIndex}`;

			setTraditional((prev) =>
				prev.map((p) => {
					return p.id === id
						? {
								...p,
								overrides: {
									...p.overrides,
									[key]: {
										lineHeight: cell.lineHeight,
										fontSize: cell.fontSize,
									},
								},
							}
						: p;
				})
			);
		},
		[]
	);

	return (
		<ProjectContext.Provider
			value={{
				project,
				getBreakpoint,
				getBreakpointTable,
				getOverride,
				setUnit,
				setPrecision,
				unlinkCell,
				traditional,
				fluid,
			}}
		>
			{children}
		</ProjectContext.Provider>
	);
};

export const useProject = () => {
	const context = useContext(ProjectContext);

	if (!context) {
		throw new Error('must be used within ProjectProvider');
	}

	return context;
};
