import { FAMILIES_LOCAL_STORAGE_KEY } from '$lib/constants';

import {
	type Face,
	type Family,
	type Style,
	type VariationSetting,
	type OpticalSizing,
	type Stretch,
	type Weight
} from '$lib/types';

import { readLocalStorage, writeLocalStorage } from '$lib/functions/utilities';

export class Fonts {
	#families: Family[] = $state(
		readLocalStorage<Family[]>(FAMILIES_LOCAL_STORAGE_KEY) || []
	);

	constructor() {
		$effect.root(() => {
			$effect(() => {
				writeLocalStorage(FAMILIES_LOCAL_STORAGE_KEY, this.families);
			});
		});
	}

	get families() {
		return this.#families;
	}

	set families(value: Family[]) {
		this.#families = value;
	}

	// public async install(rawText: string) {
	// 	this.stylesheets = extractStylesheets(rawText);

	// 	const fontFaces = await Promise.all(
	// 		this.stylesheets.map((stylesheet) => extractFamilies(stylesheet.url))
	// 	);

	// 	const families = fontFaces.reduce((acc: Family[], curr: Family[]) => {
	// 		acc.push(...curr);
	// 		return acc;
	// 	}, [] as Family[]);

	// 	this.families.push(...families);
	// }

	public getFamily(familyId: string): Family | undefined {
		return this.families.find((f) => f.id === familyId);
	}

	public createFamily(family: Family) {
		this.families.push(family);
	}

	public deleteFamily(familyId: string) {
		const index = this.families.findIndex((f) => f.id === familyId);

		if (index === -1) {
			return;
		}

		this.families.splice(index, 1);
	}

	public updateFamilyFamily(familyId: string, value: string) {
		const family = this.getFamily(familyId);

		if (!family) {
			return;
		}

		family.family = value;
	}

	public getFace(familyId: string, faceId: string): Face | undefined {
		return this.getFamily(familyId)?.faces.find((f) => f.id === faceId);
	}

	public createFace(familyIndex: number, face: Face) {
		this.families[familyIndex].faces.push(face);
	}

	public deleteFace(familyId: string, faceId: string) {
		const family = this.getFamily(familyId);

		if (!family) {
			return;
		}

		const index = family.faces.findIndex((face) => face.id === faceId);

		if (index === -1) {
			return;
		}

		family.faces.splice(index, 1);
	}

	public updateWeight(familyId: string, faceId: string, value: Weight) {
		const face = this.getFace(familyId, faceId);

		if (!face) {
			return;
		}

		face.weight = value;
	}

	public updateStyle(familyId: string, faceId: string, value: Style) {
		const face = this.getFace(familyId, faceId);

		if (!face) {
			return;
		}

		face.style = value;
	}

	public updateOpticalSizing(
		familyId: string,
		faceId: string,
		value: OpticalSizing
	) {
		const face = this.getFace(familyId, faceId);

		if (!face) {
			return;
		}

		face.opticalSizing = value;
	}

	public updateStretch(familyId: string, faceId: string, value: Stretch) {
		const face = this.getFace(familyId, faceId);

		if (!face) {
			return;
		}

		face.stretch = value;
	}

	public getVariationSetting(
		familyId: string,
		faceId: string,
		variationId: string
	) {
		return this.getFace(familyId, faceId)?.variationSettings.find(
			(f) => f.id === variationId
		);
	}

	public createVariationSetting(
		familyId: string,
		faceId: string,
		variationSetting: VariationSetting
	) {
		const face = this.getFace(familyId, faceId);

		if (!face) {
			return;
		}

		face.variationSettings.push(variationSetting);
	}

	public updateVariationSetting(
		familyId: string,
		faceId: string,
		variationId: string,
		value: VariationSetting
	) {
		const face = this.getFace(familyId, faceId);

		if (!face) {
			return;
		}

		const index = face.variationSettings.findIndex(
			(variationSetting) => variationSetting.id === variationId
		);

		face.variationSettings[index] = value;
	}

	public deleteVariationSetting(
		familyId: string,
		faceId: string,
		variationId: string
	) {
		const face = this.getFace(familyId, faceId);

		if (!face) {
			return;
		}

		const index = face.variationSettings.findIndex(
			(variationSetting) => variationSetting.id === variationId
		);

		face.variationSettings.splice(index, 1);
	}

	public clear() {
		this.families = [];
	}
}

const fonts = new Fonts();
export default fonts;
