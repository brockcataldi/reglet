import { describe, it, expect } from 'vitest';
import { guessFallback, isFallback } from './fallback';

describe('guessFallback', () => {
	it('guesses from the family name', () => {
		expect(guessFallback('JetBrains Mono')).toBe('monospace');
		expect(guessFallback('Fira Code')).toBe('monospace');
		expect(guessFallback('Noto Sans')).toBe('sans-serif');
		expect(guessFallback('PT Serif')).toBe('serif');
		expect(guessFallback('Roboto Slab')).toBe('serif');
		expect(guessFallback('Dancing Script')).toBe('cursive');
	});

	it('falls back to sans-serif', () => {
		expect(guessFallback('Playfair Display')).toBe('sans-serif');
	});
});

describe('isFallback', () => {
	it('accepts generic families and none', () => {
		expect(isFallback('serif')).toBe(true);
		expect(isFallback('')).toBe(true);
		expect(isFallback('Arial')).toBe(false);
	});
});
