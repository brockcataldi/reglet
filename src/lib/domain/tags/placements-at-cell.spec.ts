import { describe, it, expect } from 'vitest';
import type { Breakpoint, Tag } from '#lib/types.js';
import { placementsAtCell } from './placements-at-cell';

const breakpoints: Breakpoint[] = [
	{ id: 'root', name: 'Root', width: 0 },
	{ id: 'desktop', name: 'Desktop', width: 1200 }
];

const tags: Tag[] = [
	{
		id: 'h1',
		name: 'h1',
		startsAt: 'root',
		placements: {
			root: { laneId: 'a', step: 6 },
			desktop: { laneId: 'a', step: 8 }
		}
	},
	{
		id: 'display',
		name: 'display',
		startsAt: 'desktop',
		placements: { desktop: { laneId: 'a', step: 6 } }
	},
	{
		id: 'h2',
		name: 'h2',
		startsAt: 'root',
		placements: { root: { laneId: 'a', step: 6 } }
	}
];

const summarize = (laneId: string, step: number) =>
	placementsAtCell(tags, breakpoints, laneId, step).map(
		({ tag, breakpoint }) => `${breakpoint.id}/${tag.id}`
	);

describe('placementsAtCell', () => {
	it('orders by breakpoint, then tag', () => {
		expect(summarize('a', 6)).toStrictEqual([
			'root/h1',
			'root/h2',
			'desktop/display'
		]);
	});

	it('does not repeat inherited placements', () => {
		expect(summarize('a', 8)).toStrictEqual(['desktop/h1']);
	});

	it('only matches the same lane', () => {
		expect(summarize('b', 6)).toStrictEqual([]);
	});
});
