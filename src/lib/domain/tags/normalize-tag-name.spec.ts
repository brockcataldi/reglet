import { describe, it, expect } from 'vitest';
import { isTagNameTaken, tagNameError } from './normalize-tag-name';

const tags = [
	{ id: 'a', name: 'h1' },
	{ id: 'b', name: 'Body' }
];

describe('isTagNameTaken', () => {
	it('compares trimmed and case-insensitively', () => {
		expect(isTagNameTaken(tags, ' BODY ')).toBe(true);
		expect(isTagNameTaken(tags, 'h2')).toBe(false);
	});

	it('ignores the tag being renamed', () => {
		expect(isTagNameTaken(tags, 'H1', 'a')).toBe(false);
	});
});

describe('tagNameError', () => {
	it('accepts a free name', () => {
		expect(tagNameError(tags, 'h2')).toBeUndefined();
	});

	it('explains why a name is refused', () => {
		expect(tagNameError(tags, '  ')).toBe('Tags need a name.');
		expect(tagNameError(tags, 'tablet/h1')).toBe(
			'Tag names can\'t contain "/".'
		);
		expect(tagNameError(tags, ' body')).toBe(
			'Another tag is already called "body".'
		);
	});
});
