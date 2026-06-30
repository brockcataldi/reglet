import {
	PROJECT_DEFAULTS_FLUID,
	PROJECT_DEFAULTS_STANDARD
} from '$lib/constants';
import type { Unit, ProjectType, Breakpoint, Lane } from '$lib/types';
import { createId } from '$lib/utilities';

export const createDefaultBaseSize = ({ unit }: { unit: Unit }) => {
	if (unit === 'pt') {
		return 12;
	}

	if (unit === 'px') {
		return 16;
	}

	return 1;
};

export const createDefaultLane = ({
	unit,
	modifier
}: {
	unit: Unit;
	modifier: number;
}): Lane => {
	return {
		id: createId(),
		font: {
			family: 'Arial',
			weight: '400',
			style: 'normal'
		},
		scale: {
			baseSize: createDefaultBaseSize({ unit }) * modifier,
			ratio: 1.2,
			minStep: -1,
			maxStep: 6
		},
		override: []
	};
};

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

export const createDefaultProject = ({
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
