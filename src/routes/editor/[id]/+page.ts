import { error } from '@sveltejs/kit';

import type { PageLoad } from './$types';

import { z } from 'zod';

const IdSchema = z.uuidv4();

export const load: PageLoad = ({ params }) => {
	const parsed = IdSchema.safeParse(params.id);

	if (!parsed.success) {
		error(404, 'Breakpoint not found');
	}

	return {
		id: parsed.data
	};
};
