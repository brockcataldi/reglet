import type { Breakpoint, Tag } from '#lib/types.js';
import { resolvePlacement } from './resolve-placement';

export type CellPlacement = {
	tag: Tag;
	breakpoint: Breakpoint;
	// carried up from a lower breakpoint rather than placed at this one
	inherited: boolean;
	from: Breakpoint;
};

/**
 * Every breakpoint/tag pair that lands on a specimen, ordered by breakpoint
 * and then tag. A tag placed at Root and left alone above shows once per
 * breakpoint, inherited everywhere but Root.
 */
export const placementsAtCell = (
	tags: Tag[],
	breakpoints: Breakpoint[],
	laneId: string,
	step: number
): CellPlacement[] =>
	breakpoints.flatMap((breakpoint) =>
		tags.flatMap((tag) => {
			const resolved = resolvePlacement(tag, breakpoints, breakpoint.id);

			if (
				!resolved ||
				resolved.laneId !== laneId ||
				resolved.step !== step
			) {
				return [];
			}

			const from = breakpoints.find(
				(bp) => bp.id === resolved.breakpointId
			)!;

			return [
				{ tag, breakpoint, inherited: from.id !== breakpoint.id, from }
			];
		})
	);
