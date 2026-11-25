import type { Breakpoint, Lane, ProjectType, Tag } from '#lib/types.js';

import { adjustNumberPrecision } from '#lib/domain/project/adjust-number-precision.js';
import { toSpecimen } from '#lib/domain/project/to-specimen.js';
import { resolvePlacement } from '#lib/domain/tags/resolve-placement.js';

export type Setting = {
	tag: Tag;
	lane: Lane;
	fontSize: number;
	lineHeight: number;
	letterSpacing: number;
	// fluid only: the size slides here between min and max
	fluid: boolean;
};

export type SettingContext = {
	type: ProjectType;
	breakpoints: Breakpoint[];
	lanes: (id: string) => Lane | undefined;
	precision: number;
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const at = (tag: Tag, breakpointId: string, context: SettingContext) => {
	const placement = resolvePlacement(
		tag,
		context.breakpoints,
		breakpointId
	);
	const lane = placement && context.lanes(placement.laneId);

	return lane && placement
		? {
				lane,
				specimen: toSpecimen(lane, placement.step, context.precision)
			}
		: undefined;
};

/**
 * How a tag is set on a page `width` px wide: the breakpoint that applies
 * there, or for fluid projects the size slid between min and max.
 */
export const settingAt = (
	tag: Tag,
	width: number,
	context: SettingContext
): Setting | undefined => {
	const { breakpoints, type, precision } = context;
	const round = (n: number) => adjustNumberPrecision(n, precision);

	if (type === 'fluid' && breakpoints.length === 2) {
		const [min, max] = breakpoints;
		const low = at(tag, min.id, context);
		const high = at(tag, max.id, context) ?? low;

		if (!low || !high) return undefined;

		const t = Math.min(
			1,
			Math.max(0, (width - min.width) / (max.width - min.width || 1))
		);

		return {
			tag,
			lane: low.lane,
			fontSize: round(
				lerp(low.specimen.fontSize, high.specimen.fontSize, t)
			),
			lineHeight: round(
				lerp(low.specimen.lineHeight, high.specimen.lineHeight, t)
			),
			letterSpacing: round(
				lerp(low.specimen.letterSpacing, high.specimen.letterSpacing, t)
			),
			fluid: low.specimen.fontSize !== high.specimen.fontSize
		};
	}

	const applies =
		type === 'static'
			? breakpoints[0]
			: (breakpoints.findLast((bp) => bp.width <= width) ??
				breakpoints[0]);
	const found = applies && at(tag, applies.id, context);

	return found
		? {
				tag,
				lane: found.lane,
				fontSize: round(found.specimen.fontSize),
				lineHeight: found.specimen.lineHeight,
				letterSpacing: found.specimen.letterSpacing,
				fluid: false
			}
		: undefined;
};
