import { redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';

// Nothing lives at /editor yet, so send people straight to the specimen.
export const load = () => {
	redirect(307, resolve('/(app)/editor/specimen'));
};
