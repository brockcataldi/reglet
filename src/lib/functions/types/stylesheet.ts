import { STYLESHEETS_LOCAL_STORAGE_KEY } from '$lib/constants';

import type { Stylesheet } from '$lib/types';

import { readLocalStorage } from '$lib/functions/utilities';

export function extractStylesheets(text: string): Stylesheet[] {
	if (!text.includes('<')) {
		return text
			.split('\n')
			.filter((url) => {
				const raw = url.trim();
				return raw.startsWith('https');
			})
			.map((url) => {
				return { id: crypto.randomUUID(), url };
			});
	}

	const urls: Stylesheet[] = [];
	const parser = new DOMParser();
	const dom = parser.parseFromString(text, 'text/html');

	const links = dom.querySelectorAll(
		'link[rel="stylesheet"]'
	) as NodeListOf<HTMLLinkElement>;

	links.forEach((link) =>
		urls.push({ id: crypto.randomUUID(), url: link.href })
	);

	return urls;
}

export function getStylesheetsFromLocalStorage(): string {
	const stylesheets = readLocalStorage<Stylesheet[]>(
		STYLESHEETS_LOCAL_STORAGE_KEY
	);

	if (!stylesheets) {
		return '';
	}
	return stylesheets.map((stylesheet) => stylesheet.url).join('\n');
}
