import { describe, it, expect } from 'vitest';
import { extractGoogleFont } from './extract-google-font';

describe('extract-google-font', () => {
	it('family name only', () => {
		expect(extractGoogleFont('Roboto')).toStrictEqual({
			family: 'Roboto',
			faces: []
		});
	});

	it('family with encoded space', () => {
		expect(extractGoogleFont('Open+Sans')).toStrictEqual({
			family: 'Open+Sans',
			faces: []
		});
	});

	it('single axis, single value', () => {
		expect(extractGoogleFont('Roboto:wght@400')).toStrictEqual({
			family: 'Roboto',
			faces: [{ wght: '400' }]
		});
	});

	it('single axis, multiple values', () => {
		expect(extractGoogleFont('Roboto:wght@400;700')).toStrictEqual({
			family: 'Roboto',
			faces: [{ wght: '400' }, { wght: '700' }]
		});
	});

	it('single axis with range value', () => {
		expect(extractGoogleFont('Inter:wght@100..900')).toStrictEqual({
			family: 'Inter',
			faces: [{ wght: '100..900' }]
		});
	});

	it('two axes, multiple faces', () => {
		expect(
			extractGoogleFont('Playfair+Display:ital,wght@0,400;0,700;1,400;1,700')
		).toStrictEqual({
			family: 'Playfair+Display',
			faces: [
				{ ital: '0', wght: '400' },
				{ ital: '0', wght: '700' },
				{ ital: '1', wght: '400' },
				{ ital: '1', wght: '700' }
			]
		});
	});

	it('family with a space, multiple mixed axes', () => {
		expect(
			extractGoogleFont(
				`Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900`
			)
		).toStrictEqual({
			family: 'Bodoni+Moda',
			faces: [
				{
					ital: '0',
					opsz: '6..96',
					wght: '400..900'
				},
				{
					ital: '1',
					opsz: '6..96',
					wght: '400..900'
				}
			]
		});
	});

	it('throws when axis data is missing the @ separator', () => {
		expect(() => extractGoogleFont('Roboto:wght')).toThrow(
			'Malformed Google Fonts URL'
		);
	});

	it('throws when face values do not match axis count', () => {
		expect(() => extractGoogleFont('Roboto:wght@400,700')).toThrow(
			'Malformed Google Fonts URL'
		);
	});

	it('throws when a face has too few values', () => {
		expect(() => extractGoogleFont('Roboto:ital,wght@0')).toThrow(
			'Malformed Google Fonts URL'
		);
	});
});
