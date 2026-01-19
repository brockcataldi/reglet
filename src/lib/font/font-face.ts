import {
	type FontFaceAxis,
	type FontFaceValue,
	compareFontFaceProperty,
	extractFontFaceValue
} from './font-face-properties';

export interface FontFace {
	fontFamily: string;
	fontStyle: string;
	fontWeight: FontFaceAxis | FontFaceValue | string;
	fontStretch: FontFaceAxis | FontFaceValue | string;
}

export interface FontFamilies {
	[fontFamily: string]: {
		[type: string]: FontFace[];
	};
}

export function compareFontFace(face1: FontFace, face2: FontFace): boolean {
	if (face1.fontFamily !== face2.fontFamily) {
		return false;
	}

	if (face1.fontStyle !== face2.fontStyle) {
		return false;
	}

	if (!compareFontFaceProperty(face1.fontWeight, face2.fontWeight)) {
		return false;
	}

	if (
		face1.fontStretch &&
		face2.fontStretch &&
		!compareFontFaceProperty(face1.fontStretch, face2.fontStretch)
	) {
		return false;
	}

	return true;
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

			const results: FontFace = {
				fontFamily: style
					.getPropertyValue('font-family')
					.trim()
					.replace(/^"|"$/g, ''),
				fontWeight: extractFontFaceValue(
					style.getPropertyValue('font-weight').trim(),
					'font-weight'
				),
				fontStyle: style.getPropertyValue('font-style').trim(),
				fontStretch: 'normal'
			};

			const fontStretch = style.getPropertyValue('font-stretch').trim();

			if (fontStretch !== '') {
				results.fontStretch = extractFontFaceValue(fontStretch, 'font-stretch');
			}

			return results;
		})
		.reduce((acc, curr) => {
			if (!acc[curr.fontFamily]) {
				acc[curr.fontFamily] = {};
			}

			if (!acc[curr.fontFamily][curr.fontStyle]) {
				acc[curr.fontFamily][curr.fontStyle] = [];
			}

			if (
				acc[curr.fontFamily][curr.fontStyle].some((face) =>
					compareFontFace(face, curr)
				)
			) {
				return acc;
			}

			acc[curr.fontFamily][curr.fontStyle].push(curr);

			return acc;
		}, {} as FontFamilies);
}
