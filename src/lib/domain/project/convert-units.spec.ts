import { describe, expect, it } from 'vitest';

import {
	canConvertLetterSpacing,
	convertFontSize,
	convertLetterSpacing
} from './convert-units';

describe('convertFontSize', () => {
	it('converts between rem, px and pt at a 16px root', () => {
		expect(convertFontSize(1, 'rem', 'px')).toBe(16);
		expect(convertFontSize(1, 'rem', 'pt')).toBeCloseTo(12);
		expect(convertFontSize(24, 'px', 'rem')).toBe(1.5);
		expect(convertFontSize(12, 'pt', 'px')).toBeCloseTo(16);
	});

	it('treats em like rem', () => {
		expect(convertFontSize(2, 'em', 'rem')).toBe(2);
		expect(convertFontSize(1, 'em', 'px')).toBe(16);
	});
});

describe('convertLetterSpacing', () => {
	it('converts em and % without a font size', () => {
		expect(convertLetterSpacing(0.05, 'em', '%', 0)).toBeCloseTo(5);
		expect(convertLetterSpacing(5, '%', 'em', 0)).toBeCloseTo(0.05);
	});

	it('uses the font size for relative to fixed units', () => {
		expect(convertLetterSpacing(0.1, 'em', 'px', 32)).toBeCloseTo(3.2);
		expect(convertLetterSpacing(2, 'px', 'em', 40)).toBeCloseTo(0.05);
		expect(convertLetterSpacing(10, '%', 'rem', 32)).toBeCloseTo(0.2);
	});

	it('converts fixed units regardless of the font size', () => {
		expect(convertLetterSpacing(0.125, 'rem', 'px', 99)).toBe(2);
		expect(convertLetterSpacing(3, 'pt', 'px', 99)).toBeCloseTo(4);
	});

	it("can't convert to or from ch", () => {
		expect(convertLetterSpacing(1, 'ch', 'em', 16)).toBeUndefined();
		expect(convertLetterSpacing(1, 'em', 'ch', 16)).toBeUndefined();
		expect(convertLetterSpacing(1, 'ch', 'ch', 16)).toBe(1);
		expect(canConvertLetterSpacing('ch', 'px')).toBe(false);
		expect(canConvertLetterSpacing('em', 'px')).toBe(true);
	});
});
