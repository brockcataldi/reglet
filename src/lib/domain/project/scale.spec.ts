import { describe, it, expect } from 'vitest';
import { scale } from './scale';
import { adjustNumberPrecision } from './adjust-number-precision';
import { createDefaultBaseSize } from './create-default-base-size';

describe('scale', () => {
	it('returns the base at step 0', () => {
		expect(scale(16, 1.25, 0)).toBe(16);
	});

	it('multiplies by the ratio per step, both directions', () => {
		expect(scale(16, 1.5, 2)).toBe(36);
		expect(scale(16, 2, -1)).toBe(8);
	});
});

describe('adjustNumberPrecision', () => {
	it('rounds to the given number of decimals', () => {
		expect(adjustNumberPrecision(1.23456, 2)).toBe(1.23);
		expect(adjustNumberPrecision(1.235, 0)).toBe(1);
	});

	it('clamps and truncates the precision', () => {
		expect(adjustNumberPrecision(1.26, -3)).toBe(1);
		expect(adjustNumberPrecision(1.26, 1.9)).toBe(1.3);
		expect(() => adjustNumberPrecision(1.2, 500)).not.toThrow();
	});

	it('passes non-finite values through', () => {
		expect(adjustNumberPrecision(Infinity, 2)).toBe(Infinity);
		expect(adjustNumberPrecision(NaN, 2)).toBeNaN();
	});
});

describe('createDefaultBaseSize', () => {
	it('picks a base per unit', () => {
		expect(createDefaultBaseSize({ unit: 'pt' })).toBe(12);
		expect(createDefaultBaseSize({ unit: 'px' })).toBe(16);
		expect(createDefaultBaseSize({ unit: 'rem' })).toBe(1);
	});
});
