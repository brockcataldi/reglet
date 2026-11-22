import { describe, it, expect } from 'vitest';
import type { Breakpoint, Tag } from '#lib/types.js';
import { tagsAtCell } from './tags-at-cell';

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
		id: 'body',
		name: 'body',
		startsAt: 'root',
		placements: { root: { laneId: 'a', step: 0 } }
	},
	{
		id: 'lead',
		name: 'lead',
		startsAt: 'desktop',
		placements: { desktop: { laneId: 'a', step: 0 } }
	}
];

describe('tagsAtCell', () => {
	it('finds tags placed on the cell at the breakpoint', () => {
		expect(
			tagsAtCell(tags, breakpoints, 'root', 'a', 6).map((t) => t.tag.id)
		).toStrictEqual(['h1']);
		expect(tagsAtCell(tags, breakpoints, 'desktop', 'a', 6)).toStrictEqual(
			[]
		);
	});

	it('marks inherited tags with where they come from', () => {
		const [body, lead] = tagsAtCell(tags, breakpoints, 'desktop', 'a', 0);

		expect(body.tag.id).toBe('body');
		expect(body.inherited).toBe(true);
		expect(body.from.id).toBe('root');
		expect(lead.tag.id).toBe('lead');
		expect(lead.inherited).toBe(false);
	});

	it('leaves out tags that start higher up', () => {
		expect(
			tagsAtCell(tags, breakpoints, 'root', 'a', 0).map((t) => t.tag.id)
		).toStrictEqual(['body']);
	});

	it('only matches the same lane', () => {
		expect(tagsAtCell(tags, breakpoints, 'root', 'b', 6)).toStrictEqual(
			[]
		);
	});
});
