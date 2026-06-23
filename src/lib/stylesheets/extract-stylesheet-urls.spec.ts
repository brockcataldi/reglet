import { describe, it, expect } from 'vitest';
import { extractStylesheetUrls } from './extract-stylesheet-urls';

describe('extract-stylesheet-urls', () => {
	it('empty', () => {
		expect(extractStylesheetUrls(``)).toStrictEqual([]);
	});

	it('single link based url from link tag', () => {
		expect(
			extractStylesheetUrls(
				`
<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda&display=swap" rel="stylesheet">
            `
			)
		).toStrictEqual([
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
		).toStrictEqual(['https://example.com/style.css']);
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
		).toStrictEqual([
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
		).toStrictEqual([
			'https://fonts.googleapis.com/css2?family=Bodoni+Moda&display=swap',
			'https://example.com/style.css'
		]);
	});

	it('multiple stylesheet link tags', () => {
		expect(
			extractStylesheetUrls(
				`
<link href="https://example.com/a.css" rel="stylesheet">
<link rel="stylesheet" href="https://example.com/b.css">
            `
			)
		).toStrictEqual(['https://example.com/a.css', 'https://example.com/b.css']);
	});

	it('multiple text based urls', () => {
		expect(
			extractStylesheetUrls(
				`
https://example.com/a.css
https://example.com/b.css
            `
			)
		).toStrictEqual(['https://example.com/a.css', 'https://example.com/b.css']);
	});

	it('deduplicates urls from links and text', () => {
		expect(
			extractStylesheetUrls(
				`
<link href="https://example.com/style.css" rel="stylesheet">
https://example.com/style.css
            `
			)
		).toStrictEqual(['https://example.com/style.css']);
	});

	it('deduplicates repeated link tags', () => {
		expect(
			extractStylesheetUrls(
				`
<link href="https://example.com/style.css" rel="stylesheet">
<link href="https://example.com/style.css" rel="stylesheet">
            `
			)
		).toStrictEqual(['https://example.com/style.css']);
	});

	it('ignores link tags without href', () => {
		expect(extractStylesheetUrls(`<link rel="stylesheet">`)).toStrictEqual([]);
	});

	it('ignores link tags with empty href', () => {
		expect(
			extractStylesheetUrls(`<link href="" rel="stylesheet">`)
		).toStrictEqual([]);
	});

	it('ignores non-stylesheet link tags', () => {
		expect(
			extractStylesheetUrls(
				`
<link rel="icon" href="https://example.com/favicon.ico">
<link rel="preconnect" href="https://example.com">
<link rel="preload" href="https://example.com/font.woff2" as="font">
            `
			)
		).toStrictEqual([]);
	});

	it('includes link tags with compound rel values', () => {
		expect(
			extractStylesheetUrls(
				`<link rel="stylesheet alternate" href="https://example.com/alternate.css">`
			)
		).toStrictEqual(['https://example.com/alternate.css']);
	});

	it('ignores relative paths in link hrefs', () => {
		expect(
			extractStylesheetUrls(
				`
<link href="/style.css" rel="stylesheet">
<link href="./style.css" rel="stylesheet">
<link href="../style.css" rel="stylesheet">
<link href="style.css" rel="stylesheet">
            `
			)
		).toStrictEqual([]);
	});

	it('ignores non-http(s) urls in link hrefs', () => {
		expect(
			extractStylesheetUrls(
				`
<link href="ftp://example.com/style.css" rel="stylesheet">
<link href="file:///tmp/style.css" rel="stylesheet">
<link href="data:text/css,body{color:red}" rel="stylesheet">
            `
			)
		).toStrictEqual([]);
	});

	it('extracts absolute link hrefs alongside ignored relative hrefs', () => {
		expect(
			extractStylesheetUrls(
				`
<link href="/style.css" rel="stylesheet">
<link href="https://example.com/style.css" rel="stylesheet">
<link href="./other.css" rel="stylesheet">
            `
			)
		).toStrictEqual(['https://example.com/style.css']);
	});

	it('accepts http urls in text lines', () => {
		expect(extractStylesheetUrls(`http://example.com/style.css`)).toStrictEqual(
			['http://example.com/style.css']
		);
	});

	it('ignores non-http(s) urls in text lines', () => {
		expect(
			extractStylesheetUrls(
				`
ftp://example.com/style.css
file:///tmp/style.css
data:text/css,body{color:red}
            `
			)
		).toStrictEqual([]);
	});

	it('ignores relative paths in text lines', () => {
		expect(
			extractStylesheetUrls(
				`
/style.css
./style.css
../style.css
            `
			)
		).toStrictEqual([]);
	});

	it('ignores invalid text lines', () => {
		expect(
			extractStylesheetUrls(
				`
not a url
https://
example.com/style.css
            `
			)
		).toStrictEqual([]);
	});

	it('ignores text lines containing html', () => {
		expect(
			extractStylesheetUrls(
				`
https://example.com/valid.css
<div>https://example.com/not-extracted.css</div>
            `
			)
		).toStrictEqual(['https://example.com/valid.css']);
	});

	it('ignores blank and whitespace-only lines', () => {
		expect(
			extractStylesheetUrls(
				`

   
https://example.com/style.css

            `
			)
		).toStrictEqual(['https://example.com/style.css']);
	});

	it('whitespace only input', () => {
		expect(extractStylesheetUrls(`   \n  \n  `)).toStrictEqual([]);
	});
});
