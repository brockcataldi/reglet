import type { Breakpoint, Unit } from '$lib/types';
import { createId } from '$lib/utilities';
import { createDefaultScale } from './create-default-scale';

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
		defaultScale: createDefaultScale({ unit, modifier })
	};
};
