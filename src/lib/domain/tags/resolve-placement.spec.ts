import { describe, it, expect } from 'vitest';
import type { Breakpoint, Tag } from '#lib/types.js';
import { resolvePlacement } from './resolve-placement';

const breakpoints: Breakpoint[] = [
	{ id: 'root', name: 'Root', width: 0 },
	{ id: 'tablet', name: 'Tablet', width: 768 },
	{ id: 'desktop', name: 'Desktop', width: 1200 }
];

const tag = (overrides: Partial<Tag>): Tag => ({
	id: 't',
	name: 'h1',
	startsAt: 'root',
	placements: {},
	...overrides
});

describe('resolvePlacement', () => {
	it('uses the placement at the breakpoint itself', () => {
		const h1 = tag({
			placements: {
				root: { laneId: 'a', step: 6 },
				desktop: { laneId: 'b', step: 8 }
			}
		});

		expect(resolvePlacement(h1, breakpoints, 'desktop')).toStrictEqual({
			laneId: 'b',
			step: 8
		});
	});

	it('inherits the closest placement below', () => {
		const h1 = tag({ placements: { root: { laneId: 'a', step: 6 } } });

		expect(resolvePlacement(h1, breakpoints, 'desktop')).toStrictEqual({
			laneId: 'a',
			step: 6
		});
	});

	it('has no placement below the breakpoint it starts at', () => {
		const display = tag({
			startsAt: 'desktop',
			placements: { desktop: { laneId: 'a', step: 9 } }
		});

		expect(
			resolvePlacement(display, breakpoints, 'tablet')
		).toBeUndefined();
		expect(
			resolvePlacement(display, breakpoints, 'desktop')
		).toStrictEqual({
			laneId: 'a',
			step: 9
		});
	});

	it('ignores stray placements below the start', () => {
		const display = tag({
			startsAt: 'tablet',
			placements: { root: { laneId: 'a', step: 1 } }
		});

		expect(
			resolvePlacement(display, breakpoints, 'desktop')
		).toBeUndefined();
	});

	it('returns undefined for unknown breakpoints', () => {
		const h1 = tag({ placements: { root: { laneId: 'a', step: 6 } } });

		expect(resolvePlacement(h1, breakpoints, 'nope')).toBeUndefined();
		expect(
			resolvePlacement({ ...h1, startsAt: 'nope' }, breakpoints, 'root')
		).toBeUndefined();
	});
});
