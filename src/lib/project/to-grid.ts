import type { Breakpoint, GridCell, Lane } from '$lib/types';

import { adjustIntPrecision } from './adjust-int-precision';

import { scale } from './scale';

export const toGrid = (
	breakpoint: Breakpoint,
	lanes: Lane[],
	precision: number
): GridCell[][] => {
	const rows: GridCell[][] = [];

	for (
		let i = breakpoint.defaultScale.minStep;
		i <= breakpoint.defaultScale.maxStep;
		i++
	) {
		const row: GridCell[] = [];

		for (let j = 0; j < lanes.length; j++) {
			const { id, ...lane } = lanes[j];

			const fontSize = scale(
				breakpoint.defaultScale.baseSize,
				breakpoint.defaultScale.ratio,
				i
			);

			const cell = {
				...lane,
				step: i,
				fontSize: adjustIntPrecision(fontSize, precision),
				lineHeight: 1,
				laneId: id
			};

			row.push(cell);
		}

		rows.push(row);
	}

	return rows;
};
