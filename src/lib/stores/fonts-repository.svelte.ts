import { LOCAL_STORAGE_KEY_FONTS } from '$lib/constants';
import { extractStylesheetUrls } from '$lib/domain/fonts/extract-stylesheet-urls';
import { read, write } from '$lib/utilities';

class FontsRepository {
	#rawStylesheets = $state<string>('');
	#stylesheets = $derived(extractStylesheetUrls(this.rawStylesheets));

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
}

export default FontsRepository;
