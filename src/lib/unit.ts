export interface Unit {
	value: number;
	unit: 'px' | 'em' | 'rem';
}

export function toPx(unit: Unit) {
	return unit.value * (unit.unit === 'px' ? 1 : 16);
}

export function toString(unit: Unit) {
	return `${unit.value}${unit.unit}`;
}
