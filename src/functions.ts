export const scale = (step: number, base: number, ratio: number): number =>
	base * Math.pow(ratio, step);

export const suffix = (value: number): string => {
	switch (Math.trunc(value).toString().at(-1)) {
		case '1':
			return `${value}st`;
		case '2':
			return `${value}nd`;
		case '3':
			return `${value}rd`;
		default:
			return `${value}th`;
	}
};

export const toPrecise = (value: number, precision: number) =>
	parseFloat(value.toFixed(precision));
