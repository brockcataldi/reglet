import { describe, it, expect } from 'vitest';
import { toClamp, toIdentifier } from './rules';

describe('toIdentifier', () => {
	it('is used with the prefix', () => {
		expect(toIdentifier('type-h1')).toBe('type-h1');
	});

	it('keeps valid names and dashes the rest', () => {
		expect(toIdentifier('body-l')).toBe('body-l');
		expect(toIdentifier('Body Large!')).toBe('Body-Large-');
	});
});

describe('toClamp', () => {
	it('slides between two sizes', () => {
		// 16px at 400px to 32px at 1200px: 2vw + 8px
		expect(toClamp(1, 2, 'rem', 400, 1200, 3)).toBe(
			'clamp(1rem, 0.5rem + 2vw, 2rem)'
		);
	});

	it('drops the intercept when it is zero', () => {
		expect(toClamp(8, 24, 'px', 400, 1200, 3)).toBe(
			'clamp(8px, 2vw, 24px)'
		);
	});

	it('returns the plain value when nothing slides', () => {
		expect(toClamp(1, 1, 'rem', 400, 1200, 3)).toBe('1rem');
	});
});
