import { describe, it, expect } from 'vitest';
import { toFontVariationSettings } from './to-font-variation-settings';

describe('to-font-variation-settings', () => {
	it('undefined when there are no settings', () => {
		expect(toFontVariationSettings(undefined)).toBeUndefined();
		expect(toFontVariationSettings({})).toBeUndefined();
	});

	it('single axis', () => {
		expect(toFontVariationSettings({ opsz: 14 })).toBe('"opsz" 14');
	});

	it('multiple axes, keeping case-sensitive tags', () => {
		expect(toFontVariationSettings({ opsz: 14, GRAD: -50.5 })).toBe(
			'"opsz" 14, "GRAD" -50.5'
		);
	});
});
