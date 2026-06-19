import { read, write } from '$lib/utilities';

type ProjectType = 'standard' | 'fluid';
type Unit = 'rem' | 'px' | 'pt';

type ProjectSettingsState = {
	type: ProjectType;
	unit: Unit;
	stylesheets: string;
};

const PROJECT_SETTINGS_KEY: string = 'project-settings';

class ProjectSettings {
	#type = $state<ProjectType>('standard');
	#unit = $state<Unit>('rem');
	#stylesheets = $state<string>('');

	constructor() {
		const cached = read<ProjectSettingsState>(PROJECT_SETTINGS_KEY);

		if (cached) {
			this.type = cached.type;
			this.unit = cached.unit;
			this.stylesheets = cached.stylesheets;
		}

		$effect.root(() => {
			$effect(() => {
				const current: ProjectSettingsState = {
					type: this.type,
					unit: this.unit,
					stylesheets: this.stylesheets
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

	get stylesheets() {
		return this.#stylesheets;
	}

	set stylesheets(value: string) {
		this.#stylesheets = value;
	}
}

const projectSettings = new ProjectSettings();

export default projectSettings;
