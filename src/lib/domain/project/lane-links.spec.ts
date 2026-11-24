import { describe, expect, it } from 'vitest';

import type { Lane } from '#lib/types.js';

import {
	matchedTargets,
	normalizeLinks,
	removeLane,
	toLaneGroups
} from './lane-links';

const lane = (id: string, patch: Partial<Lane> = {}): Lane => ({
	id,
	family: 'Inter',
	weight: 400,
	style: 'normal',
	overrides: {},
	baseSize: 1,
	ratio: 1.2,
	minStep: 0,
	maxStep: 5,
	...patch
});

const ids = (lanes: Lane[]) => lanes.map((entry) => entry.id);

describe('normalizeLinks', () => {
	it('moves linked lanes right after their source', () => {
		const lanes = [
			lane('a'),
			lane('b'),
			lane('a1', { linkedTo: 'a' }),
			lane('b1', { linkedTo: 'b' }),
			lane('a2', { linkedTo: 'a' })
		];

		expect(ids(normalizeLinks(lanes))).toStrictEqual([
			'a',
			'a1',
			'a2',
			'b',
			'b1'
		]);
	});

	it('drops links to missing, self and linked lanes', () => {
		const lanes = normalizeLinks([
			lane('a'),
			lane('a1', { linkedTo: 'a' }),
			lane('x', { linkedTo: 'gone' }),
			lane('y', { linkedTo: 'y' }),
			lane('z', { linkedTo: 'a1' })
		]);

		expect(ids(lanes)).toStrictEqual(['a', 'a1', 'x', 'y', 'z']);
		expect(lanes.map((entry) => entry.linkedTo)).toStrictEqual([
			undefined,
			'a',
			undefined,
			undefined,
			undefined
		]);
	});

	it('gives linked lanes their source font', () => {
		const [, linked] = normalizeLinks([
			lane('a', {
				family: 'Roboto',
				weight: 700,
				variationSettings: { wdth: 90 }
			}),
			lane('a1', { linkedTo: 'a', baseSize: 1.25 })
		]);

		expect(linked).toMatchObject({
			family: 'Roboto',
			weight: 700,
			variationSettings: { wdth: 90 },
			baseSize: 1.25
		});
	});

	it('moves an unlinked lane out after its old group', () => {
		const lanes = normalizeLinks([
			lane('a'),
			lane('a1'),
			lane('a2', { linkedTo: 'a' })
		]);

		expect(ids(lanes)).toStrictEqual(['a', 'a2', 'a1']);
	});
});

describe('removeLane', () => {
	it('promotes the first linked lane when a source goes', () => {
		const lanes = removeLane(
			[
				lane('a', { matchSteps: false }),
				lane('a1', { linkedTo: 'a' }),
				lane('a2', { linkedTo: 'a' }),
				lane('b')
			],
			'a'
		);

		expect(ids(lanes)).toStrictEqual(['a1', 'a2', 'b']);
		expect(lanes[0].linkedTo).toBeUndefined();
		expect(lanes[0].matchSteps).toBe(false);
		expect(lanes[1].linkedTo).toBe('a1');
	});

	it('removes a linked lane on its own', () => {
		const lanes = removeLane(
			[
				lane('a'),
				lane('a1', { linkedTo: 'a' }),
				lane('a2', { linkedTo: 'a' })
			],
			'a1'
		);

		expect(ids(lanes)).toStrictEqual(['a', 'a2']);
		expect(lanes[1].linkedTo).toBe('a');
	});
});

describe('toLaneGroups', () => {
	it('groups each source with its linked lanes', () => {
		const groups = toLaneGroups([
			lane('a'),
			lane('a1', { linkedTo: 'a' }),
			lane('b')
		]);

		expect(groups.map((group) => ids(group.members))).toStrictEqual([
			['a', 'a1'],
			['b']
		]);
	});
});

describe('matchedTargets', () => {
	it('pairs the nth linked lane with the nth breakpoint after the first', () => {
		const [group] = toLaneGroups([
			lane('a'),
			lane('a1', { linkedTo: 'a' }),
			lane('a2', { linkedTo: 'a' })
		]);

		expect(
			matchedTargets(group, ['root', 'tablet', 'desktop'])
		).toStrictEqual([
			{ laneId: 'a1', breakpointId: 'tablet' },
			{ laneId: 'a2', breakpointId: 'desktop' }
		]);
	});

	it('skips linked lanes past the last breakpoint', () => {
		const [group] = toLaneGroups([
			lane('a'),
			lane('a1', { linkedTo: 'a' }),
			lane('a2', { linkedTo: 'a' })
		]);

		expect(matchedTargets(group, ['min', 'max'])).toStrictEqual([
			{ laneId: 'a1', breakpointId: 'max' }
		]);
	});
});

describe('normalizeLinks ranges', () => {
	it('gives linked lanes their source step range', () => {
		const [, linked] = normalizeLinks([
			lane('a', { minStep: -2, maxStep: 8 }),
			lane('a1', { linkedTo: 'a' })
		]);

		expect(linked).toMatchObject({ minStep: -2, maxStep: 8 });
	});
});
