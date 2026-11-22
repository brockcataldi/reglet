import type { Breakpoint, Tag } from '#lib/types.js';
import { resolvePlacement } from './resolve-placement';

export type CellTag = {
	tag: Tag;
	// placed at a lower breakpoint and carried up to this one
	inherited: boolean;
	from: Breakpoint;
};

/** The tags that land on a specimen at a breakpoint, in tag order. */
export const tagsAtCell = (
	tags: Tag[],
	breakpoints: Breakpoint[],
	breakpointId: string,
	laneId: string,
	step: number
): CellTag[] => {
	const result: CellTag[] = [];

	for (const tag of tags) {
		const resolved = resolvePlacement(tag, breakpoints, breakpointId);

		if (
			!resolved ||
			resolved.laneId !== laneId ||
			resolved.step !== step
		) {
			continue;
		}

		const from = breakpoints.find(
			(bp) => bp.id === resolved.breakpointId
		)!;

		result.push({ tag, inherited: from.id !== breakpointId, from });
	}

	return result;
};
