export const scale = (base: number, ratio: number, step: number) => {
	return base * Math.pow(ratio, step);
};
