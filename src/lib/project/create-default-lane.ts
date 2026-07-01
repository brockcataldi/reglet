import type { Lane, Unit } from '$lib/types';
import { createId } from '$lib/utilities';
import { createDefaultBaseSize } from './create-default-base-size';

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
