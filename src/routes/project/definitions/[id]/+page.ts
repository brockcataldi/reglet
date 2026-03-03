import type { PageLoad } from './$types';
import * as z from 'zod';

const pageSchema = z.uuid({ version: 'v4' });

export const load: PageLoad = ({ params }) => {
	const parsed = pageSchema.safeParse(params.id);

	if (parsed.success) {
		return {
			id: parsed.data
		};
	}

	return { id: null };
};
