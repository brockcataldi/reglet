import type { LayoutLoad } from './$types';
import * as z from 'zod';

const paramsSchema = z.uuid({ version: 'v4' });

export const load: LayoutLoad = ({ params }) => {
	const parsed = paramsSchema.safeParse(params.id);

	if (parsed.success) {
		return {
			id: parsed.data
		};
	}

	return { id: undefined };
};
