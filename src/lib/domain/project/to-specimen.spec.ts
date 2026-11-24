import { describe, it, expect } from 'vitest';
import type { Lane } from '#lib/types.js';
import { toSpecimen } from './to-specimen';

const lane = (overrides: Partial<Lane> = {}): Lane => ({
	id: 'a',
	family: 'Roboto',
	weight: 400,
	style: 'normal',
	overrides: {},
	minStep: -1,
	maxStep: 3,
	baseSize: 16,
	ratio: 1.5,
	...overrides
});

describe('toSpecimen', () => {
	it('scales the font size and uses defaults', () => {
		expect(toSpecimen(lane(), 1, 2)).toEqual({
			fontSize: 24,
			fontSizeOverridden: false,
			lineHeight: 1,
			lineHeightOverridden: false,
			letterSpacing: 0,
			letterSpacingOverridden: false
		});
	});

	it('rounds the scaled size to the precision', () => {
		expect(toSpecimen(lane({ ratio: 1.2 }), 3, 2).fontSize).toBe(27.65);
	});

	it('applies overrides for that step only', () => {
		const l = lane({
			overrides: {
				2: { fontSize: 40, lineHeight: 1.1, letterSpacing: -0.5 }
			}
		});

		expect(toSpecimen(l, 2, 2)).toMatchObject({
			fontSize: 40,
			fontSizeOverridden: true,
			lineHeight: 1.1,
			lineHeightOverridden: true,
			letterSpacing: -0.5,
			letterSpacingOverridden: true
		});
		expect(toSpecimen(l, 1, 2).fontSizeOverridden).toBe(false);
	});

	it('marks a zero override as overridden', () => {
		const l = lane({ overrides: { 0: { letterSpacing: 0 } } });
		expect(toSpecimen(l, 0, 2).letterSpacingOverridden).toBe(true);
	});
});
