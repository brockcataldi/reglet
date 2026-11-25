import { describe, it, expect } from 'vitest';
import type { Tag } from '#lib/types.js';
import { guessRoles } from './guess-roles';

const tags = (names: string[]): Tag[] =>
	names.map((name) => ({
		id: name,
		name,
		startsAt: 'root',
		placements: {}
	}));

describe('guessRoles', () => {
	it('matches common tag names', () => {
		const html = tags(['h1', 'h2', 'h3', 'lead', 'body', 'small']);

		expect(guessRoles(html, () => 0)).toStrictEqual({
			headline: 'h1',
			deck: 'lead',
			subhead: 'h2',
			// no h4, so the fourth tag
			title: 'lead',
			body: 'body',
			quote: 'h3',
			caption: 'small',
			label: 'small'
		});
	});

	it('ignores case', () => {
		expect(guessRoles(tags(['H1']), () => 0).headline).toBe('H1');
	});

	it('falls back to size when no name matches', () => {
		const sizes: Record<string, number> = { big: 3, mid: 2, tiny: 1 };
		const roles = guessRoles(
			tags(['mid', 'tiny', 'big']),
			(tag) => sizes[tag.name]
		);

		expect(roles.headline).toBe('big');
		expect(roles.body).toBe('mid');
		expect(roles.caption).toBe('tiny');
	});

	it('leaves every role empty without tags', () => {
		expect(Object.values(guessRoles([], () => 0))).toStrictEqual(
			Array(8).fill(undefined)
		);
	});
});
