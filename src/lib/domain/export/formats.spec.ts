import { describe, it, expect } from 'vitest';
import type { Breakpoint, Lane, Tag } from '#lib/types.js';
import type { ExportContext } from './rules';
import { toExport } from './formats';

const lane: Lane = {
	id: 'a',
	family: 'Playfair Display',
	weight: 700,
	style: 'normal',
	overrides: { 2: { lineHeight: 1.2 }, 3: { letterSpacing: -0.02 } },
	baseSize: 1,
	ratio: 2,
	minStep: 0,
	maxStep: 3
};

const standard: Breakpoint[] = [
	{ id: 'root', name: 'Root', width: 0 },
	{ id: 'tablet', name: 'Tablet', width: 768 }
];

const fluid: Breakpoint[] = [
	{ id: 'min', name: 'Min', width: 400 },
	{ id: 'max', name: 'Max', width: 1200 }
];

const context = (
	overrides: Partial<ExportContext> = {}
): ExportContext => ({
	type: 'standard',
	breakpoints: standard,
	lanes: (id) => (id === 'a' ? lane : undefined),
	precision: 3,
	fontSizeUnit: 'rem',
	letterSpacingUnit: 'em',
	stylesheets: [],
	...overrides
});

const tag = (
	name: string,
	placements: Tag['placements'],
	startsAt = 'root'
): Tag => ({ id: name, name, startsAt, placements });

describe('toExport', () => {
	it('writes classes with media queries for what changes', () => {
		const h1 = tag('h1', {
			root: { laneId: 'a', step: 1 },
			tablet: { laneId: 'a', step: 2 }
		});

		expect(toExport([h1], context(), 'classes')).toBe(
			[
				'.h1 {',
				'\tfont-family: "Playfair Display";',
				'\tfont-weight: 700;',
				'\tfont-style: normal;',
				'\tfont-size: 2rem;',
				'\tline-height: 1;',
				'\tletter-spacing: 0;',
				'}',
				'',
				'@media (min-width: 768px) {',
				'\t.h1 {',
				'\t\tfont-size: 4rem;',
				'\t\tline-height: 1.2;',
				'\t}',
				'}',
				''
			].join('\n')
		);
	});

	it('starts a tag at its own breakpoint', () => {
		const lead = tag(
			'lead',
			{ tablet: { laneId: 'a', step: 0 } },
			'tablet'
		);
		const css = toExport([lead], context(), 'classes');

		expect(css.startsWith('@media (min-width: 768px) {\n\t.lead {')).toBe(
			true
		);
	});

	it('adds the fallback after the family', () => {
		const h1 = tag('h1', { root: { laneId: 'a', step: 1 } });
		const css = toExport(
			[h1],
			context({
				fallback: (family) =>
					family === 'Playfair Display' ? 'serif' : ''
			}),
			'classes'
		);

		expect(css).toContain('font-family: "Playfair Display", serif;');
	});

	it('writes custom properties on :root', () => {
		const h1 = tag('h1', { root: { laneId: 'a', step: 1 } });

		expect(toExport([h1], context(), 'properties')).toContain(
			':root {\n\t--h1-font-family: "Playfair Display";'
		);
	});

	it('imports the font stylesheets first', () => {
		const css = toExport(
			[],
			context({ stylesheets: ['https://example.com/a.css'] }),
			'classes'
		);

		expect(css).toBe('@import url("https://example.com/a.css");\n');
	});

	it('only writes the root for static projects', () => {
		const h1 = tag('h1', {
			root: { laneId: 'a', step: 1 },
			tablet: { laneId: 'a', step: 2 }
		});

		expect(
			toExport([h1], context({ type: 'static' }), 'classes')
		).not.toContain('@media');
	});

	it('slides fluid sizes with clamp()', () => {
		const h1 = tag(
			'h1',
			{
				min: { laneId: 'a', step: 0 },
				max: { laneId: 'a', step: 1 }
			},
			'min'
		);
		const css = toExport(
			[h1],
			context({ type: 'fluid', breakpoints: fluid }),
			'classes'
		);

		expect(css).toContain('font-size: clamp(1rem, 0.5rem + 2vw, 2rem);');
		expect(css).toContain('line-height: 1;');
		expect(css).not.toContain('@media');
	});

	it('turns a changing fluid line height into a sliding length', () => {
		const h1 = tag(
			'h1',
			{
				min: { laneId: 'a', step: 1 },
				max: { laneId: 'a', step: 2 }
			},
			'min'
		);
		const css = toExport(
			[h1],
			context({ type: 'fluid', breakpoints: fluid }),
			'classes'
		);

		// 2rem at line height 1, then 4rem at 1.2
		expect(css).toContain(
			'line-height: clamp(2rem, 0.6rem + 5.6vw, 4.8rem);'
		);
	});

	it('steps fluid letter spacing it cannot slide', () => {
		const h1 = tag(
			'h1',
			{
				min: { laneId: 'a', step: 2 },
				max: { laneId: 'a', step: 3 }
			},
			'min'
		);
		const css = toExport(
			[h1],
			context({
				type: 'fluid',
				breakpoints: fluid,
				letterSpacingUnit: '%'
			}),
			'classes'
		);

		expect(css).toContain('letter-spacing: 0;');
		expect(css).toContain(
			'@media (min-width: 1200px) {\n\t.h1 {\n\t\tletter-spacing: -0.02%;'
		);
	});

	it('leaves out tags that are not placed', () => {
		expect(toExport([tag('h1', {})], context(), 'classes')).toBe('');
	});

	it('nests media queries in a Sass mixin per tag', () => {
		const h1 = tag('h1', {
			root: { laneId: 'a', step: 1 },
			tablet: { laneId: 'a', step: 2 }
		});

		expect(toExport([h1], context(), 'scss')).toBe(
			[
				'@mixin h1 {',
				'\tfont-family: "Playfair Display";',
				'\tfont-weight: 700;',
				'\tfont-style: normal;',
				'\tfont-size: 2rem;',
				'\tline-height: 1;',
				'\tletter-spacing: 0;',
				'',
				'\t@media (min-width: 768px) {',
				'\t\tfont-size: 4rem;',
				'\t\tline-height: 1.2;',
				'\t}',
				'}',
				''
			].join('\n')
		);
	});

	it('writes a Tailwind utility per tag', () => {
		const h1 = tag('h1', { root: { laneId: 'a', step: 1 } });

		expect(toExport([h1], context(), 'tailwind')).toContain(
			'@utility h1 {\n\tfont-family'
		);
	});

	it('writes JSON values per min width', () => {
		const h1 = tag('h1', {
			root: { laneId: 'a', step: 1 },
			tablet: { laneId: 'a', step: 2 }
		});
		const json = JSON.parse(
			toExport([h1], context({ prefix: 'type-' }), 'json')
		);

		expect(json.tags.h1).toStrictEqual([
			{
				minWidth: 0,
				fontFamily: '"Playfair Display"',
				fontWeight: '700',
				fontStyle: 'normal',
				fontSize: '2rem',
				lineHeight: '1',
				letterSpacing: '0'
			},
			{ minWidth: 768, fontSize: '4rem', lineHeight: '1.2' }
		]);
	});

	it('puts the prefix before every name', () => {
		const h1 = tag('h1', { root: { laneId: 'a', step: 1 } });
		const prefixed = context({ prefix: 'type-' });

		expect(toExport([h1], prefixed, 'classes')).toContain('.type-h1 {');
		expect(toExport([h1], prefixed, 'properties')).toContain(
			'--type-h1-font-size'
		);
		expect(toExport([h1], prefixed, 'scss')).toContain('@mixin type-h1 {');
	});

	it('folds the font longhands into the shorthand', () => {
		const h1 = tag('h1', {
			root: { laneId: 'a', step: 1 },
			tablet: { laneId: 'a', step: 2 }
		});

		expect(toExport([h1], context({ shorthand: true }), 'classes')).toBe(
			[
				'.h1 {',
				'\tfont: 700 2rem/1 "Playfair Display";',
				'\tletter-spacing: 0;',
				'}',
				'',
				'@media (min-width: 768px) {',
				'\t.h1 {',
				'\t\tfont: 700 4rem/1.2 "Playfair Display";',
				'\t}',
				'}',
				''
			].join('\n')
		);
	});

	it('writes the style and repeats variation settings the shorthand resets', () => {
		const italic: Lane = {
			...lane,
			id: 'i',
			style: 'italic',
			variationSettings: { opsz: 32 }
		};
		const h1 = tag('h1', {
			root: { laneId: 'i', step: 1 },
			tablet: { laneId: 'i', step: 2 }
		});
		const css = toExport(
			[h1],
			context({
				shorthand: true,
				lanes: (id) => (id === 'i' ? italic : undefined)
			}),
			'scss'
		);

		expect(css).toContain(
			'\tfont: italic 700 2rem/1 "Playfair Display";\n\tfont-variation-settings: "opsz" 32;'
		);
		expect(css).toContain(
			'\t\tfont: italic 700 4rem/1.2 "Playfair Display";\n\t\tfont-variation-settings: "opsz" 32;'
		);
	});

	it('keeps longhands in JSON', () => {
		const h1 = tag('h1', { root: { laneId: 'a', step: 1 } });
		const json = JSON.parse(
			toExport([h1], context({ shorthand: true }), 'json')
		);

		expect(json.tags.h1[0].fontSize).toBe('2rem');
		expect(json.tags.h1[0].font).toBeUndefined();
	});
});
