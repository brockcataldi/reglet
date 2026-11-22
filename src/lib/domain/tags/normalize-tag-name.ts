import { TAG_SEPARATOR } from './parse-tag-query';

/** Tag names compare trimmed and case-insensitively. */
export const normalizeTagName = (name: string) =>
	name.trim().toLowerCase();

export const isTagNameTaken = (
	tags: { id: string; name: string }[],
	name: string,
	exceptId?: string
) => {
	const normalized = normalizeTagName(name);

	return tags.some(
		(tag) =>
			tag.id !== exceptId && normalizeTagName(tag.name) === normalized
	);
};

/** Why a name can't be used for a tag, or undefined when it can. */
export const tagNameError = (
	tags: { id: string; name: string }[],
	name: string,
	exceptId?: string
): string | undefined => {
	const trimmed = name.trim();

	if (trimmed === '') {
		return 'Tags need a name.';
	}

	if (trimmed.includes(TAG_SEPARATOR)) {
		return `Tag names can't contain "${TAG_SEPARATOR}".`;
	}

	if (isTagNameTaken(tags, trimmed, exceptId)) {
		return `Another tag is already called "${trimmed}".`;
	}

	return undefined;
};
