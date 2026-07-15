import type { Unit } from '$lib/types';
import { createDefaultBaseSize } from './create-default-base-size';

export const createDefaultScale = ({
	unit,
	modifier
}: {
	unit: Unit;
	modifier: number;
}) => {
	return {
		baseSize: createDefaultBaseSize({ unit }) * modifier,
		ratio: 1.2,
		minStep: -1,
		maxStep: 6
	};
};
