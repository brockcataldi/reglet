import type { GridCell, Lane } from '#lib/types.js';

import { adjustIntPrecision } from './adjust-int-precision';

import { scale } from './scale';

type Grid = {
	cells: (GridCell | null)[][];
	columns: number;
	rows: number;
};

export const toGrid = (lanes: Lane[], precision: number): Grid => {
	const grid: (GridCell | null)[][] = [];

	const max = lanes.reduce(
		(max, lane) => (lane.maxStep > max ? lane.maxStep : max),
		lanes[0].maxStep
	);
	const min = lanes.reduce(
		(min, lane) => (lane.maxStep < min ? lane.maxStep : min),
		lanes[0].minStep
	);

	for (const lane of lanes) {
		const column: (GridCell | null)[] = [];

		for (let i = min; i <= max; i++) {
			if (i < lane.minStep || i > lane.maxStep) {
				column.push(null);
				continue;
			}

			const fontSize = scale(lane.baseSize, lane.ratio, i);

			const cell: GridCell = {
				step: i,
				fontSize: adjustIntPrecision(fontSize, precision),
				fontSizeOverridden: false,
				lineHeight: 1.5,
				lineHeightOverridden: false,
				weight: lane.weight,
				family: lane.family,
				style: lane.style,
				laneId: lane.id
			};

			column.push(cell);
		}

		grid.push(column);
	}

	return {
		cells: grid,
		columns: lanes.length,
		rows: Math.abs(max - min)
	};
};
