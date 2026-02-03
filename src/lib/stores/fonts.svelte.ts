import {
	FAMILIES_LOCAL_STORAGE_KEY,
	STYLESHEETS_LOCAL_STORAGE_KEY
} from '$lib/constants';

import {
	type Face,
	type Family,
	type Stylesheet,
	type VariationSetting,
	extractFamilies
} from '$lib/types';

import { extractStylesheets } from '$lib/functions/types/stylesheet';
import { readLocalStorage, writeLocalStorage } from '$lib/functions/utilities';

export class Fonts {
	#stylesheets: Stylesheet[] = $state(
		readLocalStorage<Stylesheet[]>(STYLESHEETS_LOCAL_STORAGE_KEY) || []
	);
	#families: Family[] = $state(
		readLocalStorage<Family[]>(FAMILIES_LOCAL_STORAGE_KEY) || []
	);

	constructor() {
		$effect.root(() => {
			$effect(() => {
				writeLocalStorage(STYLESHEETS_LOCAL_STORAGE_KEY, this.stylesheets);
				writeLocalStorage(FAMILIES_LOCAL_STORAGE_KEY, this.families);
			});
		});
	}

	get stylesheets() {
		return this.#stylesheets;
	}

	set stylesheets(value: Stylesheet[]) {
		this.#stylesheets = value;
	}

	get families() {
		return this.#families;
	}

	set families(value: Family[]) {
		this.#families = value;
	}

	public async install(rawText: string) {
		this.stylesheets = extractStylesheets(rawText);

		const fontFaces = await Promise.all(
			this.stylesheets.map((stylesheet) => extractFamilies(stylesheet.url))
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
		this.families[familyIndex].faces[faceIndex].variationSettings.push(
			variationSetting
		);
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

	public clear() {
		this.stylesheets = [];
		this.families = [];
	}

	public clearFamilies() {
		this.families = [];
	}

	public clearStylesheets() {
		this.stylesheets = [];
	}
}

const fonts = new Fonts();
export default fonts;
