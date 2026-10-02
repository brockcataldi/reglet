import type { Unit } from '#lib/types.js';

export const createDefaultBaseSize = ({ unit }: { unit: Unit }) => {
	if (unit === 'pt') {
		return 12;
	}

	if (unit === 'px') {
		return 16;
	}

	return 1;
};
