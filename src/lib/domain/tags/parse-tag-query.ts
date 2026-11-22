import type { Breakpoint } from '#lib/types.js';

export type TagQuery = {
	// undefined when the prefix doesn't name a breakpoint
	breakpoint: Breakpoint | undefined;
	name: string;
};

export const TAG_SEPARATOR = '/';

/** How a placement reads in the grid, ex. "tablet/h1". */
export const formatTagLabel = (breakpointName: string, tagName: string) =>
	`${breakpointName.toLowerCase()}${TAG_SEPARATOR}${tagName}`;

/**
 * The breakpoint a typed prefix names: an exact name, or the only name that
 * starts with it, so "tab" finds Tablet. Case-insensitive.
 */
export const findBreakpoint = (
	prefix: string,
	breakpoints: Breakpoint[]
): Breakpoint | undefined => {
	const normalized = prefix.trim().toLowerCase();

	if (normalized === '') {
		return undefined;
	}

	const exact = breakpoints.find(
		(bp) => bp.name.toLowerCase() === normalized
	);

	if (exact) {
		return exact;
	}

	const starts = breakpoints.filter((bp) =>
		bp.name.toLowerCase().startsWith(normalized)
	);

	return starts.length === 1 ? starts[0] : undefined;
};

/**
 * Whether a breakpoint/tag pair matches what's typed: "h1" anywhere in either
 * name, or "tab/h" as a breakpoint prefix and part of the tag name.
 */
export const matchesTagQuery = (
	query: string,
	breakpointName: string,
	tagName: string
) => {
	const normalized = query.trim().toLowerCase();
	const separator = normalized.indexOf(TAG_SEPARATOR);

	if (separator === -1) {
		return formatTagLabel(breakpointName, tagName)
			.toLowerCase()
			.includes(normalized);
	}

	const prefix = normalized.slice(0, separator).trim();
	const name = normalized.slice(separator + 1).trim();

	return (
		breakpointName.toLowerCase().startsWith(prefix) &&
		tagName.toLowerCase().includes(name)
	);
};

/**
 * Reads "tablet/h1" (or "tab/h1") as the h1 tag at the Tablet breakpoint.
 * A bare "h1" means the root.
 */
export const parseTagQuery = (
	query: string,
	breakpoints: Breakpoint[]
): TagQuery => {
	const separator = query.indexOf(TAG_SEPARATOR);

	if (separator === -1) {
		return { breakpoint: breakpoints[0], name: query.trim() };
	}

	return {
		breakpoint: findBreakpoint(query.slice(0, separator), breakpoints),
		name: query.slice(separator + 1).trim()
	};
};
