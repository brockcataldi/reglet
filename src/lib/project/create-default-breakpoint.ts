import type { Breakpoint, Unit } from '$lib/types';
import { createId } from '$lib/utilities';
import { createDefaultLane } from './create-default-lane';

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
		lanes: [createDefaultLane({ unit, modifier })]
	};
};
