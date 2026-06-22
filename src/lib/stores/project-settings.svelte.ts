import { read, write } from '$lib/utilities';
import { extractStylesheetUrls } from '$lib/stylesheets/extract-stylesheet-urls';

type ProjectType = 'standard' | 'fluid';
type Unit = 'rem' | 'px' | 'pt';

type ProjectSettingsState = {
	type: ProjectType;
	unit: Unit;
	rawStylesheets: string;
};

const PROJECT_SETTINGS_KEY: string = 'project-settings';

class ProjectSettings {
	#type = $state<ProjectType>('standard');
	#unit = $state<Unit>('rem');
	#rawStylesheets = $state<string>('');

	#stylesheets = $derived(extractStylesheetUrls(this.rawStylesheets));

	constructor() {
		const cached = read<ProjectSettingsState>(PROJECT_SETTINGS_KEY);

		if (cached) {
			this.type = cached.type;
			this.unit = cached.unit;
			this.rawStylesheets = cached.rawStylesheets;
		}

		$effect.root(() => {
			$effect(() => {
				const current: ProjectSettingsState = {
					type: this.type,
					unit: this.unit,
					rawStylesheets: this.rawStylesheets
				};

				write(PROJECT_SETTINGS_KEY, current);
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

const projectSettings = new ProjectSettings();
export default projectSettings;
