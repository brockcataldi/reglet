import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
	cn,
	createId,
	formatBreakpointLabel,
	formatMaybePlurals,
	isAbsoluteUrl,
	read,
	toOrdinal,
	write
} from './utilities';

describe('cn', () => {
	it('joins classes and lets later tailwind classes win', () => {
		expect(cn('p-2', undefined, 'p-4')).toBe('p-4');
	});
});

describe('createId', () => {
	it('returns unique ids', () => {
		expect(createId()).not.toBe(createId());
	});
});

describe('read and write', () => {
	beforeEach(() => localStorage.clear());

	it('round-trips JSON through localStorage', () => {
		write('k', { a: 1 });
		expect(read('k')).toEqual({ a: 1 });
	});

	it('returns undefined for a missing key', () => {
		expect(read('missing')).toBeUndefined();
	});

	it('returns undefined for corrupt JSON', () => {
		const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
		localStorage.setItem('bad', '{nope');
		expect(read('bad')).toBeUndefined();
		spy.mockRestore();
	});
});

describe('toOrdinal', () => {
	it('suffixes small numbers', () => {
		expect([1, 2, 3, 4].map(toOrdinal)).toEqual([
			'1st',
			'2nd',
			'3rd',
			'4th'
		]);
	});

	it('uses th for the teens', () => {
		expect([11, 12, 13].map(toOrdinal)).toEqual(['11th', '12th', '13th']);
	});

	it('follows the last digit past twenty', () => {
		expect([21, 22, 23, 101].map(toOrdinal)).toEqual([
			'21st',
			'22nd',
			'23rd',
			'101st'
		]);
	});

	it('rejects non-integers', () => {
		expect(() => toOrdinal(1.5)).toThrow();
	});
});

describe('formatMaybePlurals', () => {
	it('picks singular or plural', () => {
		expect(formatMaybePlurals(1, 'lane')).toBe('lane');
		expect(formatMaybePlurals(0, 'lane')).toBe('lanes');
		expect(formatMaybePlurals(2, 'axis', 'axes')).toBe('axes');
	});
});

describe('formatBreakpointLabel', () => {
	it('labels the zero breakpoint Root', () => {
		expect(formatBreakpointLabel(0)).toBe('Root');
		expect(formatBreakpointLabel(768)).toBe('768px');
		expect(formatBreakpointLabel(0, false)).toBe('0px');
	});
});

describe('isAbsoluteUrl', () => {
	it('accepts only http and https urls', () => {
		expect(isAbsoluteUrl('https://example.com')).toBe(true);
		expect(isAbsoluteUrl('http://example.com/a')).toBe(true);
		expect(isAbsoluteUrl('/relative')).toBe(false);
		expect(isAbsoluteUrl('ftp://example.com')).toBe(false);
		expect(isAbsoluteUrl('javascript:alert(1)')).toBe(false);
	});
});
