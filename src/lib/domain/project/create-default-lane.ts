import type { Lane } from '#lib/types.js';
import { createId } from '#lib/utilities.js';

export const createDefaultLane = (): Lane => {
	return {
		id: createId(),
		family: 'Arial',
		weight: '400',
		style: 'normal'
	};
};
