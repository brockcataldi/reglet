import { describe, it, expect } from 'vitest';
import { extractGoogleFonts } from './extract-google-fonts';

describe('extract-google-fonts', () => {
	it('returns empty array for non-Google Fonts URLs', () => {
		expect(
			extractGoogleFonts('https://example.com/style.css')
		).toStrictEqual([]);
		expect(
			extractGoogleFonts('http://fonts.googleapis.com/css2?family=Roboto')
		).toStrictEqual([]);
		expect(extractGoogleFonts('')).toStrictEqual([]);
	});

	it('single family name only', () => {
		expect(
			extractGoogleFonts(
				'https://fonts.googleapis.com/css2?family=Roboto&display=swap'
			)
		).toStrictEqual([
			{
				family: 'Roboto',
				faces: []
			}
		]);
	});

	it('single family with axes', () => {
		expect(
			extractGoogleFonts(
				'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap'
			)
		).toStrictEqual([
			{
				family: 'Roboto',
				faces: [{ wght: '400' }, { wght: '700' }]
			}
		]);
	});

	it('family with multiple mixed axes', () => {
		expect(
			extractGoogleFonts(
				'https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&display=swap'
			)
		).toStrictEqual([
			{
				family: 'Bodoni Moda',
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
			}
		]);
	});

	it('multiple families in one URL', () => {
		expect(
			extractGoogleFonts(
				'https://fonts.googleapis.com/css2?family=Roboto:wght@400&family=Open+Sans:wght@400;700&display=swap'
			)
		).toStrictEqual([
			{
				family: 'Roboto',
				faces: [{ wght: '400' }]
			},
			{
				family: 'Open Sans',
				faces: [{ wght: '400' }, { wght: '700' }]
			}
		]);
	});

	it('returns family with empty faces when a family param is malformed', () => {
		expect(
			extractGoogleFonts(
				'https://fonts.googleapis.com/css2?family=Roboto:wght&display=swap'
			)
		).toStrictEqual([
			{
				family: 'Roboto:wght',
				faces: []
			}
		]);
	});

	it('continues parsing other families when one is malformed', () => {
		expect(
			extractGoogleFonts(
				'https://fonts.googleapis.com/css2?family=Roboto:wght&family=Open+Sans:wght@400&display=swap'
			)
		).toStrictEqual([
			{
				family: 'Roboto:wght',
				faces: []
			},
			{
				family: 'Open Sans',
				faces: [{ wght: '400' }]
			}
		]);
	});
});
