import type { Breakpoint, Tag } from '#lib/types.js';

export type CellPlacement = {
	tag: Tag;
	breakpoint: Breakpoint;
};

/**
 * Tags placed directly on a specimen, one entry per breakpoint they're placed
 * at, ordered by breakpoint and then tag. Inherited placements aren't
 * repeated; they belong to the breakpoint that set them.
 */
export const placementsAtCell = (
	tags: Tag[],
	breakpoints: Breakpoint[],
	laneId: string,
	step: number
): CellPlacement[] =>
	breakpoints.flatMap((breakpoint) =>
		tags
			.filter((tag) => {
				const placement = tag.placements[breakpoint.id];
				return placement?.laneId === laneId && placement.step === step;
			})
			.map((tag) => ({ tag, breakpoint }))
	);
