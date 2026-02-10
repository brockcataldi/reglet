import { STYLESHEETS_LOCAL_STORAGE_KEY } from '$lib/constants';
import type { Stylesheet } from '$lib/types';

import { readLocalStorage, writeLocalStorage } from '$lib/functions/utilities';

class Stylesheets {
	#stylesheets: Stylesheet[] = $state(
		readLocalStorage<Stylesheet[]>(STYLESHEETS_LOCAL_STORAGE_KEY) || []
	);

	constructor() {
		$effect.root(() => {
			$effect(() => {
				writeLocalStorage(STYLESHEETS_LOCAL_STORAGE_KEY, this.stylesheets);
			});
		});
	}

	get stylesheets() {
		return this.#stylesheets;
	}

	set stylesheets(value: Stylesheet[]) {
		this.#stylesheets = value;
	}
}

const stylesheets = new Stylesheets();
export default stylesheets;
