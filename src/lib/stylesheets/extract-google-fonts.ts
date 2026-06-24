import { extractGoogleFont } from './extract-google-font';
import { isGoogleFontsUrl } from './is-google-fonts-url';
import type { RawGoogleFont } from './types';

export const extractGoogleFonts = (link: string): RawGoogleFont[] => {
	if (!isGoogleFontsUrl(link)) {
		return [];
	}

	try {
		const url = new URL(link);
		const families = url.searchParams.getAll('family');

		return families.map((family) => {
			try {
				return extractGoogleFont(family);
			} catch {
				return { family, faces: [] };
			}
		});
	} catch {
		return [];
	}
};
