/**
 * Serialises variation settings to a CSS `font-variation-settings` value.
 * Returns undefined when there's nothing to set, so the style is omitted.
 */
export const toFontVariationSettings = (
	settings: Record<string, number> | undefined
): string | undefined => {
	const entries = Object.entries(settings ?? {});

	if (entries.length === 0) {
		return undefined;
	}

	return entries.map(([tag, value]) => `"${tag}" ${value}`).join(', ');
};
