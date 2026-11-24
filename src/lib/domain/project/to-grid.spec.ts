import { describe, it, expect } from 'vitest';
import type { Lane } from '#lib/types.js';
import { toGrid } from './to-grid';

const lane = (overrides: Partial<Lane> = {}): Lane => ({
	id: 'a',
	family: 'Roboto',
	weight: 400,
	style: 'normal',
	overrides: {},
	minStep: 0,
	maxStep: 2,
	baseSize: 16,
	ratio: 1.5,
	...overrides
});

describe('toGrid', () => {
	it('returns an empty grid with no lanes', () => {
		expect(toGrid([], 2)).toEqual({
			cells: [],
			columns: 0,
			rows: 0,
			max: 0,
			min: 0
		});
	});

	it('puts controls one step past each end of a lane', () => {
		const grid = toGrid([lane()], 2);

		expect(grid).toMatchObject({ columns: 1, rows: 5, min: 0, max: 2 });
		expect(grid.cells.map((row) => row[0].type)).toEqual([
			'controls',
			'specimen',
			'specimen',
			'specimen',
			'controls'
		]);
		expect(grid.cells[0][0]).toMatchObject({ step: -1, value: 'lower' });
		expect(grid.cells[4][0]).toMatchObject({ step: 3, value: 'upper' });
	});

	it('lists rows from the lowest step up', () => {
		const steps = toGrid([lane()], 2).cells.map((row) => row[0].step);
		expect(steps).toEqual([-1, 0, 1, 2, 3]);
	});

	it('fills shorter lanes with empty cells to the widest span', () => {
		const grid = toGrid(
			[lane(), lane({ id: 'b', minStep: 1, maxStep: 1 })],
			2
		);

		expect(grid.rows).toBe(5);
		expect(grid.cells.every((row) => row.length === 2)).toBe(true);
		expect(grid.cells.map((row) => row[1].type)).toEqual([
			'empty',
			'controls',
			'specimen',
			'controls',
			'empty'
		]);
	});

	it('allows deleting a step only when a lane has more than one', () => {
		const grid = toGrid(
			[lane(), lane({ id: 'b', minStep: 1, maxStep: 1 })],
			2
		);
		const controls = grid.cells
			.flat()
			.filter((cell) => cell.type === 'controls');

		expect(
			controls.filter((c) => c.laneId === 'a').every((c) => c.delete)
		).toBe(true);
		expect(
			controls.filter((c) => c.laneId === 'b').every((c) => !c.delete)
		).toBe(true);
	});

	it('computes specimen values at each step', () => {
		const cell = toGrid([lane()], 2).cells[3][0];
		expect(cell.type === 'specimen' && cell.value.fontSize).toBe(36);
	});
});
