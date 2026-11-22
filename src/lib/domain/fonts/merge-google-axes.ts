import type { AvailableFamily, AxisRange, RawGoogleFont } from './types';

// axes that @font-face already describes (font-style / font-weight / font-stretch)
const DESCRIBED_AXES = new Set(['ital', 'wght', 'wdth']);

const parseAxisValue = (raw: string): AxisRange | null => {
	const values = raw.split('..').map(Number);

	if (
		values.length > 2 ||
		values.some((value) => !Number.isFinite(value))
	) {
		return null;
	}

	return { min: Math.min(...values), max: Math.max(...values) };
};

/**
 * Google Fonts doesn't declare custom axes (ex. opsz, GRAD) in its
 * @font-face rules, but the stylesheet URL does. This fills them in.
 */
export const mergeGoogleAxes = (
	families: AvailableFamily[],
	googleFonts: RawGoogleFont[]
): AvailableFamily[] => {
	const axesByFamily = new Map<string, Record<string, AxisRange>>();

	for (const font of googleFonts) {
		const key = font.family.toLowerCase();
		const axes = axesByFamily.get(key) ?? {};

		for (const face of font.faces) {
			for (const [tag, raw] of Object.entries(face)) {
				if (DESCRIBED_AXES.has(tag)) {
					continue;
				}

				const range = parseAxisValue(raw);

				if (!range) {
					continue;
				}

				axes[tag] = axes[tag]
					? {
							min: Math.min(axes[tag].min, range.min),
							max: Math.max(axes[tag].max, range.max)
						}
					: range;
			}
		}

		axesByFamily.set(key, axes);
	}

	return families.map((family) => {
		const googleAxes = axesByFamily.get(family.family.toLowerCase());

		if (!googleAxes || Object.keys(googleAxes).length === 0) {
			return family;
		}

		return { ...family, axes: { ...googleAxes, ...family.axes } };
	});
};
