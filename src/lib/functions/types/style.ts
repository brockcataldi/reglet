import type { Style } from '$lib/types';

export function isStyle(value: unknown): value is Style {
	return value === 'normal' || value === 'italic';
}

export function uniqueStyles(styles: Style[]): Style[] {
	const seenStyles = new Set<Style>();
	for (const style of styles) {
		if (isStyle(style)) {
			if (seenStyles.has(style)) {
				continue;
			}
			seenStyles.add(style);
		}
	}
	return [...seenStyles];
}

export function extractStyle(value: string): Style {
	return isStyle(value) ? value : 'normal';
}
