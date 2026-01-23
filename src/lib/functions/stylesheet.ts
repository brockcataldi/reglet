export const SUPPORTED_FONT_PROVIDERS = [
	'use.typekit.net',
	'fonts.googleapis.com'
];

export interface StylesheetUrl {
	hash: string;
	url: string;
}

export function hash(str: string) {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash |= 0;
	}
	return (hash >>> 0).toString(36).padStart(7, '0');
}

export function extractStylesheetUrls(text: string): StylesheetUrl[] {
	const urls: StylesheetUrl[] = [];
	const parser = new DOMParser();
	const dom = parser.parseFromString(
		text.replace(/@import\s+(?:url\()?[^;]+;?/gi, ''),
		'text/html'
	);
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
