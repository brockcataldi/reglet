import type { GridCell, Lane } from '#lib/types.js';

import { adjustNumberPrecision } from './adjust-number-precision';

import { scale } from './scale';

type Grid = {
	cells: (GridCell | null)[][];
	columns: number;
	rows: number;
};

export const toGrid = (lanes: Lane[], precision: number): Grid => {
	if (lanes.length === 0) {
		return { cells: [], columns: 0, rows: 0 };
	}

	const max = lanes.reduce(
		(max, lane) => (lane.maxStep > max ? lane.maxStep : max),
		lanes[0].maxStep
	);

	const min = lanes.reduce(
		(min, lane) => (lane.maxStep < min ? lane.maxStep : min),
		lanes[0].minStep
	);

	const rows = Math.abs(max - min) + 1;
	const grid: (GridCell | null)[][] = Array.from(
		{ length: rows },
		() => []
	);

	for (let j = 0; j < lanes.length; j++) {
		const lane = lanes[j];
		let k = 0;

		for (let i = min; i <= max; i++) {
			if (i < lane.minStep || i > lane.maxStep) {
				grid[k].push(null);
				k++;
				continue;
			}

			const override = lane.overrides[i];

			const cell: GridCell = {
				step: i,
				fontSize:
					override?.fontSize ??
					adjustNumberPrecision(
						scale(lane.baseSize, lane.ratio, i),
						precision
					),
				fontSizeOverridden: override?.fontSize !== undefined,
				lineHeight: override?.lineHeight ?? 1,
				lineHeightOverridden: override?.lineHeight !== undefined,
				weight: lane.weight,
				family: lane.family,
				style: lane.style,
				laneId: lane.id
			};

			grid[k].push(cell);
			k++;
		}
	}

	return {
		cells: grid,
		columns: lanes.length,
		rows
	};
};
