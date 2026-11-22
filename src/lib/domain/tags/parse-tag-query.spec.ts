import { describe, it, expect } from 'vitest';
import type { Breakpoint } from '#lib/types.js';
import {
	findBreakpoint,
	formatTagLabel,
	matchesTagQuery,
	parseTagQuery
} from './parse-tag-query';

const breakpoints: Breakpoint[] = [
	{ id: 'root', name: 'Root', width: 0 },
	{ id: 'tablet', name: 'Tablet', width: 768 },
	{ id: 'desktop', name: 'Desktop', width: 1200 },
	{ id: 'desktop-xl', name: 'Desktop XL', width: 1600 }
];

describe('parseTagQuery', () => {
	it('reads a bare name as the root', () => {
		expect(parseTagQuery(' h1 ', breakpoints)).toStrictEqual({
			breakpoint: breakpoints[0],
			name: 'h1'
		});
	});

	it('reads a breakpoint prefix case-insensitively', () => {
		expect(parseTagQuery('TABLET / h1', breakpoints)).toStrictEqual({
			breakpoint: breakpoints[1],
			name: 'h1'
		});
	});

	it('accepts a short breakpoint prefix', () => {
		expect(parseTagQuery('tab/display', breakpoints).breakpoint).toBe(
			breakpoints[1]
		);
	});

	it('leaves the breakpoint undefined for an unknown prefix', () => {
		expect(parseTagQuery('phone/h1', breakpoints)).toStrictEqual({
			breakpoint: undefined,
			name: 'h1'
		});
	});
});

describe('formatTagLabel', () => {
	it('lowercases the breakpoint', () => {
		expect(formatTagLabel('Tablet', 'h1')).toBe('tablet/h1');
	});
});

describe('findBreakpoint', () => {
	it('prefers an exact name over a longer one sharing the prefix', () => {
		expect(findBreakpoint('desktop', breakpoints)).toBe(breakpoints[2]);
	});

	it('refuses an ambiguous prefix', () => {
		expect(findBreakpoint('desk', breakpoints)).toBeUndefined();
	});

	it('refuses an empty prefix', () => {
		expect(findBreakpoint(' ', breakpoints)).toBeUndefined();
	});
});

describe('matchesTagQuery', () => {
	it('matches either name without a slash', () => {
		expect(matchesTagQuery('h1', 'Tablet', 'h1')).toBe(true);
		expect(matchesTagQuery('tab', 'Tablet', 'h1')).toBe(true);
		expect(matchesTagQuery('h2', 'Tablet', 'h1')).toBe(false);
	});

	it('matches a breakpoint prefix and part of the tag name', () => {
		expect(matchesTagQuery('tab/h', 'Tablet', 'h1')).toBe(true);
		expect(matchesTagQuery('/h1', 'Tablet', 'h1')).toBe(true);
		expect(matchesTagQuery('tab/h', 'Root', 'h1')).toBe(false);
		expect(matchesTagQuery('let/h', 'Tablet', 'h1')).toBe(false);
	});
});
