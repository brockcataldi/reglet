import type { Breakpoint, Tag, TagPlacement } from '#lib/types.js';

/**
 * Where a tag sits at a breakpoint: its own placement there, or the closest
 * one below it, never reaching under the breakpoint the tag starts at.
 * `breakpoints` must be ordered smallest first.
 */
export const resolvePlacement = (
	tag: Tag,
	breakpoints: Breakpoint[],
	breakpointId: string
): TagPlacement | undefined => {
	const start = breakpoints.findIndex((bp) => bp.id === tag.startsAt);
	const target = breakpoints.findIndex((bp) => bp.id === breakpointId);

	if (start === -1 || target === -1 || target < start) {
		return undefined;
	}

	for (let i = target; i >= start; i--) {
		const placement = tag.placements[breakpoints[i].id];

		if (placement) {
			return placement;
		}
	}

	return undefined;
};
