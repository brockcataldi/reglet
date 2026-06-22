export const extractStylesheetUrls = (raw: string): string[] => {
	const parser = new DOMParser();
	const dom = parser.parseFromString(raw, 'text/html');

	const linkStylesheets: string[] = Array.from(
		dom.querySelectorAll('link[rel~="stylesheet"]')
	)
		.map((stylesheet) => stylesheet.getAttribute('href') ?? '')
		.filter((href) => href.trim() !== '');

	return linkStylesheets;
};
