import {
	compareFace,
	isStyleString,
	isWeightString,
	type FaceRule,
	type Family,
	type Style,
	type VariationSetting,
	type Weight,
	type StylesheetUrl
} from '$lib/types';

export const SUPPORTED_FONT_PROVIDERS = [
	'use.typekit.net',
	'fonts.googleapis.com'
];

export class Fonts {
	private _rawText: string = $state('');
	private _stylesheets: StylesheetUrl[] = $derived(
		this.extractStylesheets(this.rawText)
	);
	private _families: Family[] = $state([]);

	constructor() {}

	get rawText() {
		return this._rawText;
	}

	set rawText(value: string) {
		this._rawText = value;
	}

	get stylesheets() {
		return this._stylesheets;
	}

	set stylesheets(value: StylesheetUrl[]) {
		this._stylesheets = value;
	}

	get families() {
		return this._families;
	}

	set families(value: Family[]) {
		this._families = value;
	}

	private hash(str: string) {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			const char = str.charCodeAt(i);
			hash = (hash << 5) - hash + char;
			hash |= 0;
		}
		return (hash >>> 0).toString(36).padStart(7, '0');
	}

	public extractStylesheets(text: string): StylesheetUrl[] {
		if (!text.includes('<')) {
			return text
				.split('\n')
				.filter((url) => {
					const raw = url.trim();
					return (
						raw.startsWith('http') &&
						SUPPORTED_FONT_PROVIDERS.some((provider) => raw.includes(provider))
					);
				})
				.map((url) => {
					return { hash: this.hash(url), url };
				});
		}

		const urls: StylesheetUrl[] = [];
		const parser = new DOMParser();
		const dom = parser.parseFromString(text, 'text/html');

		const links = dom.querySelectorAll(
			'link[rel="stylesheet"]'
		) as NodeListOf<HTMLLinkElement>;

		links.forEach((link) => {
			if (
				SUPPORTED_FONT_PROVIDERS.some((provider) =>
					link.href.includes(provider)
				)
			) {
				urls.push({ hash: this.hash(link.href), url: link.href });
			}
		});

		return urls;
	}

	private extractStyle(value: string): Style {
		return isStyleString(value) ? value : 'normal';
	}

	private extractWeight(value: string): Weight {
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

	private extractWDTH(value: string): VariationSetting | null {
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

	public async extractFontFaces(url: string) {
		const res = await fetch(url, { mode: 'cors' });
		const cssText = await res.text();

		const sheet = new CSSStyleSheet();
		await sheet.replace(cssText.replace(/@import\s+(?:url\()?[^;]+;?/gi, ''));

		return [...sheet.cssRules]
			.filter((rule) => rule instanceof CSSFontFaceRule)
			.map((rule: CSSFontFaceRule) => {
				const style = (rule as CSSFontFaceRule).style;
				const results: FaceRule = {
					family: style
						.getPropertyValue('font-family')
						.trim()
						.replace(/^"|"$/g, ''),
					weight: this.extractWeight(
						style.getPropertyValue('font-weight').trim()
					),
					style: this.extractStyle(style.getPropertyValue('font-style').trim()),
					stretch: 'normal',
					opticalSize: 'auto',
					variationSettings: []
				};

				const wdth = this.extractWDTH(
					style.getPropertyValue('font-stretch').trim()
				);
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

	public async install() {
		const fontFaces = await Promise.all(
			this.stylesheets.map((stylesheet) =>
				this.extractFontFaces(stylesheet.url)
			)
		);

		this.families = fontFaces.reduce((acc, curr) => {
			acc.push(...curr);
			return acc;
		}, [] as Family[]);

		return this.families;
	}
}

const fonts = new Fonts();
export default fonts;
