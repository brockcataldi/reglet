import {
	PROFILES_GUESTS_LOCAL_STORAGE_KEY,
	PROFILES_HOST_LOCAL_STORAGE_KEY
} from '$lib/constants';
import type {
	TextProfile,
	TextProfileStyle,
	TextProfileMeasurements,
	VariationAxisValue
} from '$lib/types';
import { readLocalStorage, writeLocalStorage } from '$lib/functions/utilities';

class Profiles {
	#host: TextProfile = $state<TextProfile>(
		readLocalStorage<TextProfile>(PROFILES_HOST_LOCAL_STORAGE_KEY) || {
			id: crypto.randomUUID(),
			ref: '',
			grammar: 'lowercase-dominant',
			styles: {
				family: '',
				weight: '400',
				style: 'normal',
				stretch: 'normal',
				opticalSizing: 'auto',
				variationSettings: []
			},
			measurements: {
				ascender: 0,
				capHeight: 50,
				xHeight: 100,
				baseline: 150,
				descender: 200
			}
		}
	);

	#guests: TextProfile[] = $state<TextProfile[]>(
		readLocalStorage<TextProfile[]>(PROFILES_GUESTS_LOCAL_STORAGE_KEY) || []
	);

	constructor() {
		$effect.root(() => {
			$effect(() => {
				writeLocalStorage(PROFILES_HOST_LOCAL_STORAGE_KEY, this.host);
			});
			$effect(() => {
				writeLocalStorage(PROFILES_GUESTS_LOCAL_STORAGE_KEY, this.guests);
			});
		});
	}

	get host(): TextProfile {
		return this.#host;
	}

	set host(profile: TextProfile) {
		this.#host = profile;
	}

	get guests(): TextProfile[] {
		return this.#guests;
	}

	set guests(profiles: TextProfile[]) {
		this.#guests = profiles;
	}

	public createGuest(profile: TextProfile) {
		this.#guests.unshift(profile);
	}

	public deleteGuest(id: string) {
		const index = this.guests.findIndex((guest) => guest.id === id);

		if (index === -1) {
			return;
		}

		this.guests.splice(index, 1);
	}

	getProfile(id: string) {
		if (this.host.id === id) {
			return this.host;
		}

		return this.guests.find((g) => g.id === id);
	}

	exists(id: unknown) {
		if (typeof id !== 'string') {
			return false;
		}

		return this.getProfile(id) !== undefined;
	}

	updateRef(id: string, value: string) {
		const profile = this.getProfile(id);

		if (!profile) {
			return;
		}

		profile.ref = value;
	}

	updateStyles(id: string, value: Partial<TextProfileStyle>) {
		const profile = this.getProfile(id);

		if (!profile) {
			return;
		}

		profile.styles = { ...profile.styles, ...value };
	}

	updateMeasurement(id: string, value: Partial<TextProfileMeasurements>) {
		const profile = this.getProfile(id);

		if (!profile) {
			return;
		}

		profile.measurements = { ...profile.measurements, ...value };
	}

	updateVariationSetting(
		styleId: string,
		variationId: string,
		value: VariationAxisValue
	) {
		const profile = this.getProfile(styleId);

		if (!profile) {
			return;
		}

		const index = profile.styles.variationSettings.findIndex(
			(setting) => setting.id === variationId
		);
		profile.styles.variationSettings[index] = value;
	}
}

const profiles = new Profiles();
export default profiles;
