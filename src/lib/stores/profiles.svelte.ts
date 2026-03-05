import {
	PROFILES_GUESTS_LOCAL_STORAGE_KEY,
	PROFILES_HOST_LOCAL_STORAGE_KEY
} from '$lib/constants';
import {
	type Profile,
	type ProfileStyles,
	type ProfileMeasurements,
	type VariationAxisValue,
	createProfile
} from '$lib/types';
import { readLocalStorage, writeLocalStorage } from '$lib/functions/utilities';

class Profiles {
	#host: Profile = $state<Profile>(
		readLocalStorage<Profile>(PROFILES_HOST_LOCAL_STORAGE_KEY) ||
			createProfile()
	);

	// let metrics = $derived({
	// 	ascender: (baseline - ascender) / 200,
	// 	capHeight: (baseline - capHeight) / 200,
	// 	xHeight: (baseline - xHeight) / 200,
	// 	descender: (descender - baseline) / 200
	// });

	#guests: Profile[] = $state<Profile[]>(
		readLocalStorage<Profile[]>(PROFILES_GUESTS_LOCAL_STORAGE_KEY) || []
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

	get host(): Profile {
		return this.#host;
	}

	set host(profile: Profile) {
		this.#host = profile;
	}

	get guests(): Profile[] {
		return this.#guests;
	}

	set guests(profiles: Profile[]) {
		this.#guests = profiles;
	}

	public createGuest(profile: Profile) {
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

	updateCasing(id: string, value: string) {
		const profile = this.getProfile(id);

		if (!profile) {
			return;
		}

		profile.casing = value as 'lowercase-dominant' | 'uppercase-dominant';
	}

	updateStyles(id: string, value: Partial<ProfileStyles>) {
		const profile = this.getProfile(id);

		if (!profile) {
			return;
		}

		profile.styles = { ...profile.styles, ...value };
	}

	updateMeasurement(id: string, value: Partial<ProfileMeasurements>) {
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
