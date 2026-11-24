import { describe, it, expect } from 'vitest';
import type { Lane } from '#lib/types.js';
import {
	fluidLineHeightChanges,
	fluidPlacementError,
	isSameFont
} from './fluid-placement';

const lane = (overrides: Partial<Lane> = {}): Lane => ({
	id: 'a',
	family: 'Roboto',
	weight: 400,
	style: 'normal',
	overrides: {},
	minStep: -2,
	maxStep: 8,
	baseSize: 1,
	ratio: 1.2,
	...overrides
});

describe('isSameFont', () => {
	it('matches family, weight, style and axes', () => {
		expect(isSameFont(lane(), lane({ id: 'b', ratio: 1.5 }))).toBe(true);
		expect(isSameFont(lane(), lane({ family: 'Georgia' }))).toBe(false);
		expect(isSameFont(lane(), lane({ style: 'italic' }))).toBe(false);
		expect(isSameFont(lane(), lane({ weight: 700 }))).toBe(false);
	});

	it('treats weight keywords and numeric strings as their numbers', () => {
		expect(isSameFont(lane({ weight: 'normal' }), lane())).toBe(true);
		expect(
			isSameFont(lane({ weight: '700' }), lane({ weight: 'bold' }))
		).toBe(true);
	});

	it('compares variation settings by value, with none as empty', () => {
		expect(
			isSameFont(
				lane({ variationSettings: { wdth: 87.5, opsz: 14 } }),
				lane({ variationSettings: { opsz: 14, wdth: 87.5 } })
			)
		).toBe(true);
		expect(isSameFont(lane({ variationSettings: {} }), lane())).toBe(true);
		expect(
			isSameFont(lane({ variationSettings: { wdth: 87.5 } }), lane())
		).toBe(false);
	});
});

describe('fluidPlacementError', () => {
	it('allows a min alone', () => {
		expect(
			fluidPlacementError({ lane: lane(), step: 3 }, undefined, 3)
		).toBe(undefined);
	});

	it('needs a min before a max', () => {
		expect(
			fluidPlacementError(undefined, { lane: lane(), step: 3 }, 3)
		).toBe('Place it at min first.');
	});

	it('allows a larger or equal max, even on another lane', () => {
		const large = lane({ id: 'b', baseSize: 1.25 });

		expect(
			fluidPlacementError(
				{ lane: lane(), step: 3 },
				{ lane: lane(), step: 5 },
				3
			)
		).toBe(undefined);
		expect(
			fluidPlacementError(
				{ lane: lane(), step: 3 },
				{ lane: large, step: 3 },
				3
			)
		).toBe(undefined);
		expect(
			fluidPlacementError(
				{ lane: lane(), step: 3 },
				{ lane: lane(), step: 3 },
				3
			)
		).toBe(undefined);
	});

	it('refuses a smaller max', () => {
		expect(
			fluidPlacementError(
				{ lane: lane(), step: 3 },
				{ lane: lane(), step: 2 },
				3
			)
		).toBe("Max can't be smaller than min.");
	});

	it('compares sizes after overrides', () => {
		const overridden = lane({ overrides: { 5: { fontSize: 1 } } });

		expect(
			fluidPlacementError(
				{ lane: lane(), step: 3 },
				{ lane: overridden, step: 5 },
				3
			)
		).toBe("Max can't be smaller than min.");
	});

	it('refuses a max in a different font', () => {
		expect(
			fluidPlacementError(
				{ lane: lane(), step: 3 },
				{ lane: lane({ id: 'b', family: 'Georgia' }), step: 6 },
				3
			)
		).toBe('Max has to use the same font as min.');
	});
});

describe('fluidLineHeightChanges', () => {
	it('is false when either end is missing or both match', () => {
		expect(
			fluidLineHeightChanges({ lane: lane(), step: 3 }, undefined, 3)
		).toBe(false);
		expect(
			fluidLineHeightChanges(
				{ lane: lane(), step: 3 },
				{ lane: lane(), step: 5 },
				3
			)
		).toBe(false);
	});

	it('is true when the max sets a different line height', () => {
		const tight = lane({ overrides: { 5: { lineHeight: 1.1 } } });

		expect(
			fluidLineHeightChanges(
				{ lane: lane(), step: 3 },
				{ lane: tight, step: 5 },
				3
			)
		).toBe(true);
	});
});
