import type { Breakpoint, Unit } from '#lib/types.js';
import { createId } from '#lib/utilities.js';
import { createDefaultBaseSize } from './create-default-base-size';

export const createDefaultBreakpoint = ({
	width,
	label,
	unit,
	modifier
}: {
	width: number;
	label: string;
	unit: Unit;
	modifier: number;
}): Breakpoint => {
	return {
		id: createId(),
		width,
		label,
		minStep: -1,
		maxStep: 6,
		defaultScale: {
			baseSize: createDefaultBaseSize({ unit }) * modifier,
			ratio: 1.2
		},
		overrides: {}
	};
};
