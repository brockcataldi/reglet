import type { OpticalSizing } from '$lib/types';

export function isOpticalSizing(value: unknown): value is OpticalSizing {
	return value === 'none' || value === 'auto';
}

export function uniqueOpticalSizes(sizings: OpticalSizing[]): OpticalSizing[] {
	const seenSizing = new Set<OpticalSizing>();
	for (const sizing of sizings) {
		if (isOpticalSizing(sizing)) {
			if (seenSizing.has(sizing)) {
				continue;
			}
			seenSizing.add(sizing);
		}
	}
	return [...seenSizing];
}
