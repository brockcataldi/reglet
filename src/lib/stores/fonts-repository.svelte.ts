import { LOCAL_STORAGE_KEY_FONTS } from '#lib/constants.js';
import { extractGoogleFonts } from '#lib/domain/fonts/extract-google-fonts.js';
import { extractStylesheetUrls } from '#lib/domain/fonts/extract-stylesheet-urls.js';
import { groupFontFaces } from '#lib/domain/fonts/group-font-faces.js';
import { mergeGoogleAxes } from '#lib/domain/fonts/merge-google-axes.js';
import type { AvailableFamily } from '#lib/domain/fonts/types.js';
import { read, write } from '#lib/utilities.js';

class FontsRepository {
	#rawStylesheets = $state<string>('');
	#stylesheets = $derived(extractStylesheetUrls(this.rawStylesheets));
	#googleFonts = $derived(this.#stylesheets.flatMap(extractGoogleFonts));
	#available = $state<AvailableFamily[]>([]);

	constructor() {
		const cached = read<string>(LOCAL_STORAGE_KEY_FONTS);

		if (cached) {
			this.rawStylesheets = cached;
		}

		$effect.root(() => {
			$effect(() => {
				write(LOCAL_STORAGE_KEY_FONTS, this.rawStylesheets);
			});
		});
	}

	get rawStylesheets() {
		return this.#rawStylesheets;
	}

	set rawStylesheets(value: string) {
		this.#rawStylesheets = value;
	}

	get stylesheets() {
		return this.#stylesheets;
	}

	/** Families declared by the loaded stylesheets. Call `refresh` to update. */
	get available() {
		return this.#available;
	}

	/**
	 * Re-reads the @font-face rules the browser has registered. Call after a
	 * stylesheet loads or is removed; FontFaceSet has no event for either.
	 */
	refresh() {
		if (typeof document === 'undefined') {
			return;
		}

		this.#available = mergeGoogleAxes(
			groupFontFaces(document.fonts),
			this.#googleFonts
		);
	}

	find(family: string): AvailableFamily | undefined {
		const key = family.trim().toLowerCase();
		return this.#available.find(
			(entry) => entry.family.toLowerCase() === key
		);
	}
}

export default FontsRepository;
