import {
	compareFace,
	isStyleString,
	isWeightString,
	type FaceRule,
	type Family,
	type Style,
	type VariationSetting,
	type Weight
} from '$lib/types';

export function extractStyle(value: string): Style {
	return isStyleString(value) ? value : 'normal';
}

export function extractWeight(value: string): Weight {
	const space = value.includes(' ');

	if (!space) {
		const possibleValue = Number(value);

		if (isNaN(possibleValue)) {
			return isWeightString(value) ? value : 'normal';
		}

		return possibleValue;
	}

	const [min, max] = value.split(' ').map(Number);

	return {
		min,
		max
	};
}

export function extractWDTH(value: string): VariationSetting | null {
	if (value === '') {
		return null;
	}

	const space = value.includes(' ');
	const percentage = value.includes('%');

	if (percentage) {
		value = value.replaceAll('%', '');
	}

	if (!space) {
		const possibleValue = Number(value);

		if (isNaN(possibleValue)) {
			return null;
		}

		return {
			name: 'wdth',
			value: possibleValue
		};
	}

	const [min, max] = value.split(' ').map(Number);

	return {
		name: 'wdth',
		min,
		max
	};
}

export async function extractFontFaces(url: string) {
	const res = await fetch(url, { mode: 'cors' });
	const cssText = await res.text();

	const sheet = new CSSStyleSheet();
	await sheet.replace(cssText);

	return [...sheet.cssRules]
		.filter((rule) => rule instanceof CSSFontFaceRule)
		.map((rule: CSSFontFaceRule) => {
			const style = (rule as CSSFontFaceRule).style;
			const results: FaceRule = {
				family: style
					.getPropertyValue('font-family')
					.trim()
					.replace(/^"|"$/g, ''),
				weight: extractWeight(style.getPropertyValue('font-weight').trim()),
				style: extractStyle(style.getPropertyValue('font-style').trim()),
				stretch: 'normal',
				opticalSize: 'auto',
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
					family: curr.family,
					stack: 'sans-serif',
					faces: [curr]
				});
			} else {
				const f = acc.find((family) => family.family === curr.family);

				if (f) {
					if (!f.faces.find((face) => compareFace(face, curr))) {
						f.faces.push(curr);
					}
				}
			}
			return acc;
		}, [] as Family[]);
}
