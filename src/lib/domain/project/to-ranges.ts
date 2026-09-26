type Range = {
	start: number;
	end: number;
	width: number;
	percent: string;
	id: string;
};

export const toRanges = (
	widths: {
		width: number;
		id: string;
	}[]
): [Range[], number] => {
	if (widths.length === 0) {
		return [[], 2000];
	}

	const end = widths.at(-1);

	if (end === undefined) {
		return [[], 2000];
	}

	const max = end.width >= 2000 ? end.width + 400 : 2000;
	let previous = widths[0];

	const ranges: Range[] = [];

	for (let i = 1; i < widths.length; i++) {
		const current = widths[i];

		const start = previous.width;
		const end = current.width - 1;
		const width = end - start;

		ranges.push({
			start,
			end,
			width,
			percent: `${(width / max) * 100}%`,
			id: previous.id
		});

		previous = current;
	}

	const start = previous.width;
	const width = max - start;

	ranges.push({
		start,
		end: max,
		width,
		percent: `${(width / max) * 100}%`,
		id: previous.id
	});

	return [ranges, max];
};
