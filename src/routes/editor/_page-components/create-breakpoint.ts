import type { Breakpoint } from '$lib/types';
import z from 'zod';

export const createBreakpointSchema = z.object({
	label: z
		.string()
		.trim()
		.min(1, { error: 'Breakpoint Label cannot be empty' }),
	width: z
		.number({ error: 'Width Threshold cannot be empty' })
		.min(0, { error: 'Width Threshold cannot be negative' })
});

export type CreateBreakpointSchema = z.infer<
	typeof createBreakpointSchema
>;

export type CreateBreakpointData = Omit<
	Breakpoint,
	'id' | 'defaultScale' | 'overrides' | 'maxStep' | 'minStep'
>;

export type OnCreateBreakpointData = Omit<Breakpoint, 'id'>;

export type CreateBreakpointErrors = Partial<
	Record<keyof CreateBreakpointSchema, string>
>;

export const createBreakpointValidator = (
	raw: CreateBreakpointData
): [CreateBreakpointData | undefined, CreateBreakpointErrors] => {
	const validation = createBreakpointSchema.safeParse(raw);

	if (validation.success) {
		return [validation.data, {}];
	}

	const fieldErrors = z.flattenError(validation.error).fieldErrors;

	return [
		undefined,
		{
			label: fieldErrors.label?.[0],
			width: fieldErrors.width?.[0]
		}
	];
};
