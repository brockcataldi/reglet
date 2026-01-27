import {
	type Face,
	type Family,
	type StylesheetUrl,
	type VariationSetting
} from '$lib/types';

import { extractStylesheets } from '$lib/functions/stylesheets';
import { extractFontFaces } from '$lib/functions/fonts';

export class Fonts {
	private _rawText: string = $state('');

	private _stylesheets: StylesheetUrl[] = $derived(
		extractStylesheets(this.rawText)
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

	get families() {
		return this._families;
	}

	set families(value: Family[]) {
		this._families = value;
	}

	public async install() {
		const fontFaces = await Promise.all(
			this.stylesheets.map((stylesheet) => extractFontFaces(stylesheet.url))
		);

		const families = fontFaces.reduce((acc: Family[], curr: Family[]) => {
			acc.push(...curr);
			return acc;
		}, [] as Family[]);

		this.families.push(...families);
	}

	public createFamily(family: Family) {
		this.families.push(family);
	}

	public deleteFamily(familyIndex: number) {
		this.families.splice(familyIndex, 1);
	}

	public createFace(familyIndex: number, face: Face) {
		this.families[familyIndex].faces.push(face);
	}

	public deleteFace(familyIndex: number, faceIndex: number) {
		this.families[familyIndex].faces.splice(faceIndex, 1);
	}

	public createVariationSetting(
		familyIndex: number,
		faceIndex: number,
		variationSetting: VariationSetting
	) {
		this.families[familyIndex].faces[faceIndex].variationSettings.push(variationSetting);
	}

	public deleteVariationSetting(
		familyIndex: number,
		faceIndex: number,
		variationIndex: number
	) {
		this.families[familyIndex].faces[faceIndex].variationSettings.splice(
			variationIndex,
			1
		);
	}
}

const fonts = new Fonts();
export default fonts;
