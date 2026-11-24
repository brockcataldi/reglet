import { describe, it, expect } from 'vitest';
import { isGoogleFontsUrl } from './is-google-fonts-url';

describe('isGoogleFontsUrl', () => {
	it('accepts css2 API urls', () => {
		expect(
			isGoogleFontsUrl('https://fonts.googleapis.com/css2?family=Inter')
		).toBe(true);
	});

	it('rejects the legacy API, plain http and other hosts', () => {
		expect(
			isGoogleFontsUrl('https://fonts.googleapis.com/css?family=Inter')
		).toBe(false);
		expect(
			isGoogleFontsUrl('http://fonts.googleapis.com/css2?family=Inter')
		).toBe(false);
		expect(isGoogleFontsUrl('https://example.com/css2?family=Inter')).toBe(
			false
		);
	});
});
