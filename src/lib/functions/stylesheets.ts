import { SUPPORTED_FONT_PROVIDERS } from '$lib/constants';

import type { StylesheetUrl } from '$lib/types';

import { hash } from '$lib/functions/utilities';

export function extractStylesheets(text: string): StylesheetUrl[] {
	if (!text.includes('<')) {
		return text
			.split('\n')
			.filter((url) => {
				const raw = url.trim();
				return (
					raw.startsWith('http') &&
					SUPPORTED_FONT_PROVIDERS.some((provider) => raw.includes(provider))
				);
			})
			.map((url) => {
				return { hash: hash(url), url };
			});
	}

	const urls: StylesheetUrl[] = [];
	const parser = new DOMParser();
	const dom = parser.parseFromString(text, 'text/html');

	const links = dom.querySelectorAll(
		'link[rel="stylesheet"]'
	) as NodeListOf<HTMLLinkElement>;

	links.forEach((link) => {
		if (
			SUPPORTED_FONT_PROVIDERS.some((provider) => link.href.includes(provider))
		) {
			urls.push({ hash: hash(link.href), url: link.href });
		}
	});

	return urls;
}
