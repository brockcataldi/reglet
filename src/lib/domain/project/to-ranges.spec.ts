import { describe, it, expect } from 'vitest';
import { toRanges } from './to-ranges';

describe('toRanges', () => {
	it('defaults to a 2000px track with no breakpoints', () => {
		expect(toRanges([])).toEqual([[], 2000]);
	});

	it('spans each breakpoint up to the next one', () => {
		const [ranges, max] = toRanges([
			{ width: 0, id: 'root' },
			{ width: 800, id: 'md' }
		]);

		expect(max).toBe(2000);
		expect(ranges).toEqual([
			{ start: 0, end: 799, width: 799, percent: '39.95%', id: 'root' },
			{ start: 800, end: 2000, width: 1200, percent: '60%', id: 'md' }
		]);
	});

	it('extends the track past a breakpoint at or beyond 2000px', () => {
		const [ranges, max] = toRanges([
			{ width: 0, id: 'root' },
			{ width: 2400, id: 'xl' }
		]);

		expect(max).toBe(2800);
		expect(ranges.at(-1)).toMatchObject({ start: 2400, end: 2800 });
	});
});
