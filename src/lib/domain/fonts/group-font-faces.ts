import type {
	AvailableFamily,
	AvailableFontStyle,
	AxisRange,
	FontFaceDescriptors
} from './types';

const STYLE_ORDER: AvailableFontStyle[] = ['normal', 'italic', 'oblique'];

const WEIGHT_KEYWORDS: Record<string, number> = {
	normal: 400,
	bold: 700
};

const STRETCH_KEYWORDS: Record<string, number> = {
	'ultra-condensed': 50,
	'extra-condensed': 62.5,
	condensed: 75,
	'semi-condensed': 87.5,
	normal: 100,
	'semi-expanded': 112.5,
	expanded: 125,
	'extra-expanded': 150,
	'ultra-expanded': 200
};

const parseFamily = (raw: string): string => {
	const family = raw.trim();
	const quoted = /^(['"])(.*)\1$/.exec(family);

	return quoted ? quoted[2] : family;
};

const toRange = (values: (number | null)[]): AxisRange | null => {
	if (values.length < 1 || values.length > 2 || values.includes(null)) {
		return null;
	}

	const numbers = values as number[];

	return { min: Math.min(...numbers), max: Math.max(...numbers) };
};

const parseWeight = (raw: string): AxisRange | null => {
	return toRange(
		raw
			.trim()
			.split(/\s+/)
			.map((token) => {
				if (token in WEIGHT_KEYWORDS) {
					return WEIGHT_KEYWORDS[token];
				}

				const value = Number(token);
				return token !== '' && Number.isFinite(value) ? value : null;
			})
	);
};

const parseStretch = (raw: string): AxisRange | null => {
	return toRange(
		raw
			.trim()
			.split(/\s+/)
			.map((token) => {
				if (token in STRETCH_KEYWORDS) {
					return STRETCH_KEYWORDS[token];
				}

				const match = /^(\d+(?:\.\d+)?)%$/.exec(token);
				return match ? Number(match[1]) : null;
			})
	);
};

const parseStyle = (raw: string): AvailableFontStyle => {
	const keyword = raw.trim().split(/\s+/)[0];

	return STYLE_ORDER.includes(keyword as AvailableFontStyle)
		? (keyword as AvailableFontStyle)
		: 'normal';
};

type FamilyAccumulator = {
	family: string;
	weights: Map<string, AxisRange>;
	styles: Set<AvailableFontStyle>;
	stretch: AxisRange | null;
};

/**
 * Groups individual @font-face descriptors (ex. from `document.fonts`)
 * into one entry per family, describing which weights, styles and
 * variation axes are available.
 */
export const groupFontFaces = (
	faces: Iterable<FontFaceDescriptors>
): AvailableFamily[] => {
	// font-family matching in CSS is case-insensitive
	const families = new Map<string, FamilyAccumulator>();

	for (const face of faces) {
		const family = parseFamily(face.family);

		if (family === '') {
			continue;
		}

		const key = family.toLowerCase();
		let accumulator = families.get(key);

		if (!accumulator) {
			accumulator = {
				family,
				weights: new Map(),
				styles: new Set(),
				stretch: null
			};
			families.set(key, accumulator);
		}

		const weight = parseWeight(face.weight);
		if (weight) {
			accumulator.weights.set(`${weight.min}-${weight.max}`, weight);
		}

		accumulator.styles.add(parseStyle(face.style));

		const stretch = parseStretch(face.stretch);
		if (stretch) {
			accumulator.stretch = accumulator.stretch
				? {
						min: Math.min(accumulator.stretch.min, stretch.min),
						max: Math.max(accumulator.stretch.max, stretch.max)
					}
				: stretch;
		}
	}

	return Array.from(families.values()).map((accumulator) => {
		const axes: Record<string, AxisRange> = {};
		const { stretch } = accumulator;

		if (stretch && (stretch.min !== 100 || stretch.max !== 100)) {
			axes.wdth = stretch;
		}

		return {
			family: accumulator.family,
			weights: Array.from(accumulator.weights.values()).sort(
				(a, b) => a.min - b.min || a.max - b.max
			),
			styles: STYLE_ORDER.filter((style) => accumulator.styles.has(style)),
			axes
		};
	});
};
