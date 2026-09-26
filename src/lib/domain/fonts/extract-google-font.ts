import type { RawGoogleFont } from './types';

export const extractGoogleFont = (str: string): RawGoogleFont => {
	const [family, axisData] = str.split(':');

	if (axisData === undefined) {
		return { family, faces: [] };
	}

	const [rawAxisNames, rawFacesValues] = axisData.split('@');

	if (rawFacesValues === undefined) {
		throw new Error('Malformed Google Fonts URL');
	}

	const axisNames: string[] = rawAxisNames.split(',');
	const axisNamesLength = axisNames.length;

	const faces = rawFacesValues.split(';').map((faceRawValues) => {
		const face: Record<string, string> = {};
		const faceValues = faceRawValues.split(',');

		if (faceValues.length !== axisNamesLength) {
			throw new Error('Malformed Google Fonts URL');
		}

		for (let i = 0; i < axisNamesLength; i++) {
			face[axisNames[i]] = faceValues[i];
		}

		return face;
	});

	return {
		family,
		faces
	};
};
