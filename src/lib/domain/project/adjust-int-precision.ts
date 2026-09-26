export const adjustIntPrecision = (value: number, precision: number) => {
	if (!Number.isFinite(value)) {
		return value;
	}

	const safePrecision = Math.min(Math.max(Math.trunc(precision), 0), 100);
	return Number(value.toFixed(safePrecision));
};
