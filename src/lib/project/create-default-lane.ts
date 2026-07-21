import type { Lane } from '$lib/types';
import { createId } from '$lib/utilities';

export const createDefaultLane = (): Lane => {
	return {
		id: createId(),
		family: 'Arial',
		weight: '400',
		style: 'normal'
	};
};
