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
