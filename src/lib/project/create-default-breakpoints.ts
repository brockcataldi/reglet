import {
	PROJECT_DEFAULTS_FLUID,
	PROJECT_DEFAULTS_STANDARD
} from '$lib/constants';

import type { Unit, ProjectType, Breakpoint } from '$lib/types';

import { createDefaultBreakpoint } from './create-default-breakpoint';

export const createDefaultBreakpoints = ({
	unit,
	type
}: {
	unit: Unit;
	type: ProjectType;
}): Breakpoint[] => {
	if (type === 'fluid') {
		return [
			createDefaultBreakpoint({
				...PROJECT_DEFAULTS_FLUID.min,
				unit
			}),
			createDefaultBreakpoint({
				...PROJECT_DEFAULTS_FLUID.max,
				unit
			})
		];
	}

	return [
		createDefaultBreakpoint({
			...PROJECT_DEFAULTS_STANDARD[0],
			unit
		}),
		createDefaultBreakpoint({
			...PROJECT_DEFAULTS_STANDARD[1],
			unit
		}),
		createDefaultBreakpoint({
			...PROJECT_DEFAULTS_STANDARD[2],
			unit
		})
	];
};
