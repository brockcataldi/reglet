import { describe, it, expect } from 'vitest';
import { toRanges } from './to-ranges';

describe('to-ranges', () => {
	it('basic range', () => {
		expect(
			toRanges([
				{
					width: 0,
					id: 'test-id-0'
				},
				{
					width: 100,
					id: 'test-id-1'
				},
				{
					width: 200,
					id: 'test-id-2'
				}
			])
		).toStrictEqual([
			{
				start: 0,
				end: 99,
				id: 'test-id-0',
				type: 'valid'
			},
			{
				start: 100,
				end: 199,
				id: 'test-id-1',
				type: 'valid'
			},
			{
				start: 200,
				end: 2000,
				id: 'test-id-2',
				type: 'valid'
			}
		]);
	});

	it('range with a gap', () => {
		expect(
			toRanges([
				{
					width: 0,
					id: 'test-id-0'
				},
				{
					width: 100,
					id: 'test-id-1'
				},
				{
					width: 200,
					id: 'test-id-2'
				}
			])
		).toStrictEqual([
			{
				start: 0,
				end: 99,
				id: 'test-id-0'
			},
			{
				start: 100,
				end: 199,
				id: 'test-id-1'
			},
			{
				start: 200,
				end: 2000,
				id: 'test-id-2'
			}
		]);
	});
});
