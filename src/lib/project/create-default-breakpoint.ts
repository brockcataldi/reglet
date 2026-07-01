import type { Breakpoint, Unit } from '$lib/types';
import { createId } from '$lib/utilities';
import { createDefaultLane } from './create-default-lane';

export const createDefaultBreakpoint = ({
	width,
	unit,
	modifier
}: {
	width: number;
	unit: Unit;
	modifier: number;
}): Breakpoint => {
	return {
		id: createId(),
		width,
		lanes: [createDefaultLane({ unit, modifier })]
	};
};
