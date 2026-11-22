import { describe, it, expect } from 'vitest';
import { BREAKPOINT_DEFAULTS } from '#lib/constants.js';
import { validateBreakpoints, validateTagNames } from './validate-draft';

describe('validateBreakpoints', () => {
	it('accepts every default', () => {
		for (const [type, breakpoints] of Object.entries(
			BREAKPOINT_DEFAULTS
		)) {
			expect(
				validateBreakpoints(
					type as keyof typeof BREAKPOINT_DEFAULTS,
					breakpoints
				)
			).toStrictEqual([]);
		}
	});

	it('requires a root', () => {
		expect(validateBreakpoints('standard', [])).toHaveLength(1);
	});

	it('requires the root to start at 0 outside fluid projects', () => {
		expect(
			validateBreakpoints('standard', [{ name: 'Root', width: 10 }])
		).toContain('The root breakpoint must start at 0px.');
	});

	it('requires exactly two fluid breakpoints', () => {
		expect(
			validateBreakpoints('fluid', [{ name: 'Min', width: 320 }])
		).toContain('Fluid projects need exactly a min and a max breakpoint.');
	});

	it('requires increasing widths', () => {
		expect(
			validateBreakpoints('standard', [
				{ name: 'Root', width: 0 },
				{ name: 'Desktop', width: 1200 },
				{ name: 'Tablet', width: 768 }
			])
		).toContain('Each breakpoint must be wider than the one before it.');
	});

	it('requires unique, non-empty names', () => {
		const errors = validateBreakpoints('standard', [
			{ name: 'Root', width: 0 },
			{ name: 'root ', width: 768 },
			{ name: ' ', width: 1200 }
		]);

		expect(errors).toContain('Breakpoint names must be unique.');
		expect(errors).toContain('Every breakpoint needs a name.');
	});
});

describe('validateTagNames', () => {
	it('accepts an empty list', () => {
		expect(validateTagNames([])).toStrictEqual([]);
	});

	it('rejects duplicates case-insensitively', () => {
		expect(
			validateTagNames([{ name: 'H1' }, { name: ' h1' }])
		).toStrictEqual(['Tag names must be unique.']);
	});

	it('rejects blank names', () => {
		expect(validateTagNames([{ name: '' }, { name: 'h1' }])).toStrictEqual(
			['Every tag needs a name.']
		);
	});
});
