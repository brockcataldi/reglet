import { type FaceRule, compareFace } from '$lib/types';

export function compareFaceRule(
	faceRule1: FaceRule,
	faceRule2: FaceRule
): boolean {
	if (faceRule1.family !== faceRule2.family) {
		return false;
	}
	return compareFace(faceRule1, faceRule2);
}
