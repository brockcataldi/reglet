import type { Breakpoint, GridCell, Lane } from '$lib/types';

import { adjustIntPrecision } from './adjust-int-precision';

import { scale } from './scale';

export const toGrid = (
	breakpoint: Breakpoint,
	lanes: Lane[],
	precision: number
): GridCell[][] => {
	const rows: GridCell[][] = [];

	for (let i = breakpoint.minStep; i <= breakpoint.maxStep; i++) {
		const row: GridCell[] = [];

		for (let j = 0; j < lanes.length; j++) {
			const { id, ...lane } = lanes[j];

			const fontSize = scale(
				breakpoint.defaultScale.baseSize,
				breakpoint.defaultScale.ratio,
				i
			);

			const override = breakpoint.overrides[`${id}-${i}`];

			const cell = {
				...lane,
				step: i,
				fontSize:
					override?.fontSize ?? adjustIntPrecision(fontSize, precision),
				fontSizeOverridden: override?.fontSize !== undefined,
				lineHeight: override?.lineHeight ?? 1,
				lineHeightOverridden: override?.lineHeight !== undefined,
				id: `${id}-${i}`
			};

			row.push(cell);
		}

		rows.push(row);
	}

	return rows;
};
