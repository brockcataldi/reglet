import {
	type Family,
	type FaceRule,
	type Face,
	compareFace,
	extractWeight,
	extractWDTH
} from '$lib/types';

export function compareFamily(family1: Family, family2: Family): boolean {
	if (family1.family !== family2.family) {
		return false;
	}

	if (family1.faces.length !== family2.faces.length) {
		return false;
	}

	for (let i = 0; i < family1.faces.length; i++) {
		if (!compareFace(family1.faces[i], family2.faces[i])) {
			return false;
		}
	}

	return true;
}

export async function extractFamilies(url: string) {
	const res = await fetch(url, { mode: 'cors' });
	const cssText = await res.text();

	const sheet = new CSSStyleSheet();
	await sheet.replace(cssText.replace(/@import\s+(?:url\()?[^;]+;?/gi, ''));

	return [...sheet.cssRules]
		.filter((rule) => rule instanceof CSSFontFaceRule)
		.map((rule: CSSFontFaceRule) => {
			const style = (rule as CSSFontFaceRule).style;
			const results: FaceRule = {
				id: crypto.randomUUID(),
				family: style
					.getPropertyValue('font-family')
					.trim()
					.replace(/^"|"$/g, ''),
				weight: extractWeight(style.getPropertyValue('font-weight').trim()),
				style: style.getPropertyValue('font-style').trim(),
				stretch: 'normal',
				opticalSizing: 'auto',
				variationSettings: []
			};

			const wdth = extractWDTH(style.getPropertyValue('font-stretch').trim());

			if (wdth) {
				results.variationSettings.push(wdth);
			}

			return results;
		})
		.reduce((acc, curr) => {
			if (!acc.find((family) => family.family === curr.family)) {
				acc.push({
					id: crypto.randomUUID(),
					from: url,
					family: curr.family,
					faces: [curr]
				});
			} else {
				const f = acc.find((family) => family.family === curr.family);

				if (f) {
					if (!f.faces.find((face: Face) => compareFace(face, curr))) {
						f.faces.push(curr);
					}
				}
			}
			return acc;
		}, [] as Family[]);
}
