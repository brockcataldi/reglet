import type { Tag } from '#lib/types.js';

import {
	toTagRules,
	toShorthand,
	type Block,
	type Declarations,
	type ExportContext,
	type TagRules
} from './rules';

export type ExportFormat =
	'classes' | 'properties' | 'scss' | 'tailwind' | 'json';

export const FORMATS: {
	value: ExportFormat;
	name: string;
	description: string;
	extension: string;
	mime: string;
}[] = [
	{
		value: 'classes',
		name: 'Classes',
		description:
			'A CSS class per tag, such as .h1, ready to use in markup.',
		extension: 'css',
		mime: 'text/css'
	},
	{
		value: 'properties',
		name: 'Custom properties',
		description:
			'CSS variables on :root, such as --h1-font-size, for your own rules.',
		extension: 'css',
		mime: 'text/css'
	},
	{
		value: 'scss',
		name: 'Sass mixins',
		description:
			'A mixin per tag, such as @include h1, media queries inside.',
		extension: 'scss',
		mime: 'text/x-scss'
	},
	{
		value: 'tailwind',
		name: 'Tailwind',
		description:
			'A Tailwind CSS v4 utility per tag, such as class="h1", for your main stylesheet.',
		extension: 'css',
		mime: 'text/css'
	},
	{
		value: 'json',
		name: 'JSON',
		description:
			'Each tag’s values per min width, for build tools and other code.',
		extension: 'json',
		mime: 'application/json'
	}
];

const indent = (text: string, depth: number) =>
	text
		.split('\n')
		.map((line) => (line ? '\t'.repeat(depth) + line : line))
		.join('\n');

const lines = (declarations: Declarations, name = (p: string) => p) =>
	Object.entries(declarations).map(
		([property, value]) => `${name(property)}: ${value};`
	);

const rule = (selector: string, body: string[]) =>
	`${selector} {\n${indent(body.join('\n'), 1)}\n}`;

const media = (width: number, body: string) =>
	`@media (min-width: ${width}px) {\n${indent(body, 1)}\n}`;

const widthsOf = (rules: TagRules[]) =>
	[...new Set(rules.flatMap((r) => r.blocks.map((b) => b.minWidth)))].sort(
		(a, b) => (a ?? -1) - (b ?? -1)
	);

const blocksAt = (rules: TagRules[], width: number | null) =>
	rules.flatMap((r) =>
		r.blocks
			.filter((block) => block.minWidth === width)
			.map((block) => ({ name: r.name, block }))
	);

// a rule per tag at each width, gathered under one media query per width
const byWidth = (
	rules: TagRules[],
	write: (entries: { name: string; block: Block }[]) => string[]
) =>
	widthsOf(rules).map((width) => {
		const body = write(blocksAt(rules, width)).join('\n\n');
		return width === null ? body : media(width, body);
	});

// a tag's own rules, with its media queries nested inside it
const nested = (r: TagRules) =>
	r.blocks.flatMap((block) =>
		block.minWidth === null
			? lines(block.declarations)
			: ['', media(block.minWidth, lines(block.declarations).join('\n'))]
	);

const camel = (property: string) =>
	property.replace(/-([a-z])/g, (_, letter: string) =>
		letter.toUpperCase()
	);

const toJson = (rules: TagRules[], context: ExportContext) =>
	`${JSON.stringify(
		{
			stylesheets: context.stylesheets,
			tags: Object.fromEntries(
				rules.map((r) => [
					r.tag.name,
					r.blocks.map((block) => ({
						minWidth: block.minWidth ?? 0,
						...Object.fromEntries(
							Object.entries(block.declarations).map(([p, v]) => [
								camel(p),
								v
							])
						)
					}))
				])
			)
		},
		null,
		'\t'
	)}\n`;

const sectionsFor = (rules: TagRules[], format: ExportFormat) => {
	switch (format) {
		case 'properties':
			return byWidth(rules, (entries) => [
				rule(
					':root',
					entries.flatMap(({ name, block }) =>
						lines(block.declarations, (p) => `--${name}-${p}`)
					)
				)
			]);
		case 'scss':
			return rules.map((r) => rule(`@mixin ${r.name}`, nested(r)));
		case 'tailwind':
			return rules.map((r) => rule(`@utility ${r.name}`, nested(r)));
		default:
			return byWidth(rules, (entries) =>
				entries.map(({ name, block }) =>
					rule(`.${name}`, lines(block.declarations))
				)
			);
	}
};

/** The project's tags written out in an export format. */
export const toExport = (
	tags: Tag[],
	context: ExportContext,
	format: ExportFormat
) => {
	const rules = toTagRules(tags, context)
		.filter((r) => r.blocks.length)
		.map((r) =>
			context.shorthand && format !== 'json' ? toShorthand(r) : r
		);

	if (format === 'json') {
		return toJson(rules, context);
	}

	const imports = context.stylesheets
		.map((url) => `@import url("${url}");`)
		.join('\n');
	const text = [imports, ...sectionsFor(rules, format)]
		.filter(Boolean)
		.join('\n\n');

	return text ? `${text}\n` : '';
};
