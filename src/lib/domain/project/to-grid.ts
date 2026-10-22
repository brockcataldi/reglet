import type {
	Grid,
	GridCell,
	GridCellLocation,
	Lane,
	Specimen
} from '#lib/types.js';

import { adjustNumberPrecision } from './adjust-number-precision';

import { scale } from './scale';

export const toGrid = (lanes: Lane[], precision: number): Grid => {

	if (lanes.length === 0) {
		return {
			cells: [],
			columns: 0,
			rows: 0,
			max: 0,
			maxBuffer: 0,
			min: 0,
			minBuffer: 0
		};
	}

	const max = lanes.reduce(
		(max, lane) => (lane.maxStep > max ? lane.maxStep : max),
		lanes[0].maxStep
	);

	const maxBuffer = max + 1;

	const min = lanes.reduce(
		(min, lane) => (lane.minStep < min ? lane.minStep : min),
		lanes[0].minStep
	);

	const minBuffer = min - 1;

	const rows = Math.abs(maxBuffer - minBuffer) + 1;
	const grid: GridCell[][] = Array.from({ length: rows }, () => []);

	for (let j = 0; j < lanes.length; j++) {

		const lane = lanes[j];
		const laneMin = lane.minStep - 1;
		const laneMax = lane.maxStep + 1;
		const del = Math.abs(laneMax - laneMin) !== 1;

		let k = 0;

		for (let i = minBuffer; i <= maxBuffer; i++) {

			const location: GridCellLocation = {
				laneId: lane.id,
				step: i
			};

			if (i === laneMin) {
				grid[k].push({
					...location,
					type: 'controls',
					value: 'lower',
					delete: del
				});
				k++;
				continue;
			}

			if (i === laneMax) {
				grid[k].push({
					...location,
					type: 'controls',
					value: 'upper',
					delete: del
				});
				k++;
				continue;
			}

			if (i < laneMin || i > laneMax) {
				grid[k].push({
					...location,
					type: 'empty',
					value: null
				});
				k++;
				continue;
			}

			const override = lane.overrides[i];
			const value: Specimen = {
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
				style: lane.style
			};

			grid[k].push({
				...location,
				type: 'specimen',
				value
			});
			k++;
		}
	}

	return {
		cells: grid,
		columns: lanes.length,
		rows,
		max,
		maxBuffer,
		min,
		minBuffer
	};
};
