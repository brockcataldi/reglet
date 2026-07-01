import type { ProjectType, Unit, SettingsState } from '$lib/types';
import { KEY_SETTINGS } from '$lib/constants';
import { read, write } from '$lib/utilities';
import { extractStylesheetUrls } from '$lib/fonts/extract-stylesheet-urls';

class Settings {
	#type = $state<ProjectType>('standard');
	#unit = $state<Unit>('rem');
	#rawStylesheets = $state<string>('');

	#stylesheets = $derived(extractStylesheetUrls(this.rawStylesheets));

	constructor() {
		const cached = read<SettingsState>(KEY_SETTINGS);

		if (cached) {
			this.type = cached.type;
			this.unit = cached.unit;
			this.rawStylesheets = cached.rawStylesheets;
		}

		$effect.root(() => {
			$effect(() => {
				const current: SettingsState = {
					type: this.type,
					unit: this.unit,
					rawStylesheets: this.rawStylesheets
				};

				write(KEY_SETTINGS, current);
			});
		});
	}

	get type() {
		return this.#type;
	}

	set type(value: ProjectType) {
		this.#type = value;
	}

	get unit() {
		return this.#unit;
	}

	set unit(value: Unit) {
		this.#unit = value;
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

const settings = new Settings();
export default settings;
