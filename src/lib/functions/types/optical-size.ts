import type { OpticalSize } from '$lib/types';

export function isOpticalSize(value: unknown): value is OpticalSize {
	return value === 'none' || value === 'auto';
}

export function uniqueOpticalSizes(styles: OpticalSize[]): OpticalSize[] {
	const seenStyles = new Set<OpticalSize>();
	for (const style of styles) {
		if (isOpticalSize(style)) {
			if (seenStyles.has(style)) {
				continue;
			}
			seenStyles.add(style);
		}
	}
	return [...seenStyles];
}
