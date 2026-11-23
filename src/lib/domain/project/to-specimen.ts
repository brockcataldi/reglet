import type { Lane, Specimen } from '#lib/types.js';

import { adjustNumberPrecision } from './adjust-number-precision';
import { scale } from './scale';

/** A lane's specimen at a step, with its overrides applied. */
export const toSpecimen = (
	lane: Lane,
	step: number,
	precision: number
): Specimen => {
	const override = lane.overrides[step];

	return {
		fontSize:
			override?.fontSize ??
			adjustNumberPrecision(
				scale(lane.baseSize, lane.ratio, step),
				precision
			),
		fontSizeOverridden: override?.fontSize !== undefined,
		lineHeight: override?.lineHeight ?? 1,
		lineHeightOverridden: override?.lineHeight !== undefined,
		letterSpacing: override?.letterSpacing ?? 0,
		letterSpacingOverridden: override?.letterSpacing !== undefined
	};
};
