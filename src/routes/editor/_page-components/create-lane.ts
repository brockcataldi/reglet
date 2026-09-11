import type { Lane } from '$lib/types';
import z from 'zod';

export const createLaneSchema = z.object({
	family: z.string().trim().min(1, { error: 'Family cannot be empty' }),
	weight: z.string().trim().min(1, { error: 'Weight cannot be empty' }),
	style: z.enum(['normal', 'italic', 'oblique'])
});

export type CreateLaneSchema = z.infer<typeof createLaneSchema>;

export type CreateLaneData = Omit<Lane, 'id'>;
export type OnCreateLaneData = Omit<Lane, 'id'>;
export type CreateLaneErrors = Partial<
	Record<keyof CreateLaneSchema, string>
>;

export const createLaneValidator = (
	raw: CreateLaneData
): [CreateLaneData | undefined, CreateLaneErrors] => {
	const validation = createLaneSchema.safeParse(raw);

	if (validation.success) {
		return [validation.data, {}];
	}

	const fieldErrors = z.flattenError(validation.error).fieldErrors;

	return [
		undefined,
		{
			family: fieldErrors.family?.[0],
			weight: fieldErrors.weight?.[0],
			style: fieldErrors.style?.[0]
		}
	];
};
