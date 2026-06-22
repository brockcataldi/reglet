import { describe, it, expect } from 'vitest';
import { extractStylesheetUrls } from './extract-stylesheet-urls';

describe('extract-stylesheet-urls', () => {
	it('empty', () => {
		expect(extractStylesheetUrls(``)).toBe([]);
	});

	it('single link based url from link tag', () => {
		expect(
			extractStylesheetUrls(
				`
<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda&display=swap" rel="stylesheet">
            `
			)
		).toBe([
			'https://fonts.googleapis.com/css2?family=Bodoni+Moda&display=swap'
		]);
	});

	it('single text based link', () => {
		expect(
			extractStylesheetUrls(
				`
https://example.com/style.css
            `
			)
		).toBe(['https://example.com/style.css']);
	});

	it('link based url with extra tags', () => {
		expect(
			extractStylesheetUrls(
				`
            <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda&display=swap" rel="stylesheet">
            `
			)
		).toBe([
			'https://fonts.googleapis.com/css2?family=Bodoni+Moda&display=swap'
		]);
	});

	it('both link based url, text based url and extra tags', () => {
		expect(
			extractStylesheetUrls(
				`
            <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda&display=swap" rel="stylesheet">

https://example.com/style.css
            `
			)
		).toBe([
			'https://fonts.googleapis.com/css2?family=Bodoni+Moda&display=swap',
			'https://example.com/style.css'
		]);
	});
});
