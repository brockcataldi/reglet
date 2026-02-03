import { STRETCH_VALUES } from '$lib/constants';

import type { StretchString, Stretch } from '$lib/types';

export function isStretchString(value: unknown): value is Stretch {
	if (value === null || value === undefined) {
		return false;
	}

	return STRETCH_VALUES.includes(value as StretchString);
}

export function compareStretch(stretch1: Stretch, stretch2: Stretch): boolean {
	if (typeof stretch1 === 'number' && typeof stretch2 === 'number') {
		return stretch1 === stretch2;
	}

	if (stretch1 === stretch2) {
		return true;
	}

	return false;
}

export function uniqueStretches(stretches: Stretch[]): Stretch[] {
	const seenStretches = new Set<Stretch>();
	for (const stretch of stretches) {
		if (isStretchString(stretch)) {
			if (seenStretches.has(stretch)) {
				continue;
			}
			seenStretches.add(stretch);
		}
	}
	return [...seenStretches];
}
