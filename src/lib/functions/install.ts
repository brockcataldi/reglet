import type { Family } from '$lib/types';
import fonts from '$lib/stores/fonts.svelte';
import stylesheets from '$lib/stores/stylesheets.svelte';

import { extractStylesheets, extractFamilies } from '$lib/types';

const install = async (rawText: string) => {
	stylesheets.stylesheets = extractStylesheets(rawText);

	const fontFaces = await Promise.all(
		stylesheets.stylesheets.map((stylesheet) => extractFamilies(stylesheet.url))
	);

	const families = fontFaces.reduce((acc: Family[], curr: Family[]) => {
		acc.push(...curr);
		return acc;
	}, [] as Family[]);

	fonts.families = families;
};

export default install;
