import type {
	Breakpoint,
	FontSizeUnit,
	LetterSpacingUnit,
	Tag
} from '#lib/types.js';

import { toFontVariationSettings } from '#lib/domain/fonts/to-font-variation-settings.js';
import { adjustNumberPrecision } from '#lib/domain/project/adjust-number-precision.js';
import {
	settingAt,
	type Setting,
	type SettingContext
} from '#lib/domain/preview/setting-at.js';

export type ExportContext = SettingContext & {
	fontSizeUnit: FontSizeUnit;
	letterSpacingUnit: LetterSpacingUnit;
	stylesheets: string[];
	// the generic family to fall back to; empty or missing adds none
	fallback?: (family: string) => string | undefined;
	// put before every tag name's identifier, such as `type-`
	prefix?: string;
	// write family, weight, style, size and line height as one `font`
	shorthand?: boolean;
};

export type Property =
	| 'font'
	| 'font-family'
	| 'font-weight'
	| 'font-style'
	| 'font-variation-settings'
	| 'font-size'
	| 'line-height'
	| 'letter-spacing';

export type Declarations = Partial<Record<Property, string>>;

/** A tag's declarations from `minWidth` up; null applies everywhere. */
export type Block = {
	minWidth: number | null;
	declarations: Declarations;
};

export type TagRules = { tag: Tag; name: string; blocks: Block[] };

// px in one of each unit; em is taken against a 16px root
const PX: Record<string, number> = { rem: 16, em: 16, px: 1, pt: 4 / 3 };

/** A tag name as a CSS identifier: anything else becomes a dash. */
export const toIdentifier = (name: string) =>
	name.trim().replace(/[^a-zA-Z0-9_-]+/g, '-') || 'tag';

const quoteFamily = (family: string) => {
	const text = family.trim();
	return /^[a-zA-Z-]+$/.test(text)
		? text
		: `"${text.replace(/"/g, '\\"')}"`;
};

const length = (value: number, unit: string) =>
	value === 0 ? '0' : `${value}${unit}`;

/**
 * A size that slides from `min` at `minWidth` to `max` at `maxWidth`, held
 * at either end. Returns the plain value when there's nothing to slide.
 */
export const toClamp = (
	min: number,
	max: number,
	unit: string,
	minWidth: number,
	maxWidth: number,
	precision: number
) => {
	const round = (n: number) => adjustNumberPrecision(n, precision);
	const px = PX[unit];

	if (min === max || maxWidth <= minWidth || px === undefined) {
		return length(round(min), unit);
	}

	const slope = (max * px - min * px) / (maxWidth - minWidth);
	const intercept = (min * px - slope * minWidth) / px;
	const [low, high] = min < max ? [min, max] : [max, min];
	const vw = `${round(slope * 100)}vw`;
	const preferred =
		round(intercept) === 0 ? vw : `${round(intercept)}${unit} + ${vw}`;

	return `clamp(${round(low)}${unit}, ${preferred}, ${round(high)}${unit})`;
};

const fontDeclarations = (
	setting: Setting,
	context: ExportContext
): Declarations => {
	const fallback = context.fallback?.(setting.lane.family.trim());
	const variation = toFontVariationSettings(
		setting.lane.variationSettings
	);

	return {
		'font-family': fallback
			? `${quoteFamily(setting.lane.family)}, ${fallback}`
			: quoteFamily(setting.lane.family),
		'font-weight': `${setting.lane.weight}`,
		'font-style': setting.lane.style,
		...(variation && { 'font-variation-settings': variation })
	};
};

const staticDeclarations = (
	setting: Setting,
	context: ExportContext
): Declarations => ({
	...fontDeclarations(setting, context),
	'font-size': length(setting.fontSize, context.fontSizeUnit),
	'line-height': `${setting.lineHeight}`,
	'letter-spacing': length(
		setting.letterSpacing,
		context.letterSpacingUnit
	)
});

// only the declarations that differ from what already applies
const changed = (from: Declarations, to: Declarations): Declarations =>
	Object.fromEntries(
		Object.entries(to).filter(
			([key, value]) => from[key as Property] !== value
		)
	);

const steppedRules = (tag: Tag, context: ExportContext): Block[] => {
	const breakpoints =
		context.type === 'static'
			? context.breakpoints.slice(0, 1)
			: context.breakpoints;
	const blocks: Block[] = [];
	let applied: Declarations = {};

	breakpoints.forEach((bp: Breakpoint, index) => {
		const setting = settingAt(tag, bp.width, context);

		if (!setting) {
			return;
		}

		const declarations = staticDeclarations(setting, context);
		const diff = changed(applied, declarations);

		if (Object.keys(diff).length > 0) {
			blocks.push({
				minWidth: index === 0 ? null : bp.width,
				declarations: diff
			});
		}

		applied = { ...applied, ...declarations };
	});

	return blocks;
};

const fluidRules = (tag: Tag, context: ExportContext): Block[] => {
	const [min, max] = context.breakpoints;
	const { fontSizeUnit, letterSpacingUnit, precision } = context;
	const low = settingAt(tag, min.width, context);
	const high = settingAt(tag, max.width, context);

	if (!low || !high) {
		return [];
	}

	const slide = (a: number, b: number, unit: string) =>
		toClamp(a, b, unit, min.width, max.width, precision);

	// unitless line heights can't slide, so a changing one becomes a length
	const lineHeight =
		low.lineHeight === high.lineHeight
			? `${low.lineHeight}`
			: slide(
					low.lineHeight * low.fontSize,
					high.lineHeight * high.fontSize,
					fontSizeUnit
				);

	const base: Declarations = {
		...fontDeclarations(low, context),
		'font-size': slide(low.fontSize, high.fontSize, fontSizeUnit),
		'line-height': lineHeight
	};
	const blocks: Block[] = [{ minWidth: null, declarations: base }];

	if (low.letterSpacing === high.letterSpacing) {
		base['letter-spacing'] = length(low.letterSpacing, letterSpacingUnit);
	} else if (letterSpacingUnit === 'em' && PX[fontSizeUnit]) {
		// em follows the sliding size, so slide the length it works out to
		base['letter-spacing'] = slide(
			low.letterSpacing * low.fontSize,
			high.letterSpacing * high.fontSize,
			fontSizeUnit
		);
	} else if (PX[letterSpacingUnit]) {
		base['letter-spacing'] = slide(
			low.letterSpacing,
			high.letterSpacing,
			letterSpacingUnit
		);
	} else {
		// ch and % can't go in a clamp() with vw, so they step at max
		base['letter-spacing'] = length(low.letterSpacing, letterSpacingUnit);
		blocks.push({
			minWidth: max.width,
			declarations: {
				'letter-spacing': length(high.letterSpacing, letterSpacingUnit)
			}
		});
	}

	return blocks;
};

/** Each tag's declarations per width, smallest first. */
export const toTagRules = (
	tags: Tag[],
	context: ExportContext
): TagRules[] =>
	tags.map((tag) => ({
		tag,
		name: toIdentifier(`${context.prefix ?? ''}${tag.name}`),
		blocks:
			context.type === 'fluid' && context.breakpoints.length === 2
				? fluidRules(tag, context)
				: steppedRules(tag, context)
	}));

// the longhands the `font` shorthand sets from a tag's values
const SHORTHAND: Property[] = [
	'font-style',
	'font-weight',
	'font-size',
	'line-height',
	'font-family'
];

const toFont = (all: Declarations) =>
	[
		all['font-style'] === 'normal' ? undefined : all['font-style'],
		all['font-weight'],
		`${all['font-size']}/${all['line-height']}`,
		all['font-family']
	]
		.filter(Boolean)
		.join(' ');

/**
 * Folds each block's font longhands into one `font`. The shorthand resets
 * every longhand it covers, and font-variation-settings, so a block that
 * changes any of them writes the whole font, then its variation settings.
 */
export const toShorthand = (rules: TagRules): TagRules => {
	let applied: Declarations = {};

	const blocks = rules.blocks.map((block) => {
		applied = { ...applied, ...block.declarations };

		if (!SHORTHAND.some((property) => property in block.declarations)) {
			return block;
		}

		const rest = Object.fromEntries(
			Object.entries(block.declarations).filter(
				([property]) =>
					!SHORTHAND.includes(property as Property) &&
					property !== 'font-variation-settings'
			)
		);
		const variation = applied['font-variation-settings'];

		return {
			...block,
			declarations: {
				font: toFont(applied),
				...(variation && { 'font-variation-settings': variation }),
				...rest
			}
		};
	});

	return { ...rules, blocks };
};
