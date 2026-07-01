import { isAbsoluteUrl } from '$lib/utilities';

export const extractStylesheetUrls = (raw: string): string[] => {
	const parser = new DOMParser();
	const dom = parser.parseFromString(raw, 'text/html');

	const linkStylesheets: string[] = Array.from(
		dom.querySelectorAll('link[rel~="stylesheet"]')
	)
		.map((stylesheet) => stylesheet.getAttribute('href')?.trim() ?? '')
		.filter((href) => {
			if (href === '') {
				return false;
			}

			return isAbsoluteUrl(href);
		});

	const textStylesheets: string[] = raw
		.split(/\r?\n/)
		.map((line) => line.trim())
		.filter((line) => {
			if (line === '' || line.includes('<') || line.includes('>')) {
				return false;
			}

			return isAbsoluteUrl(line);
		});

	return Array.from(
		new Set([...linkStylesheets, ...textStylesheets].filter(Boolean))
	);
};
