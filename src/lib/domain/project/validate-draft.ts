import type { Breakpoint, ProjectType } from '#lib/types.js';
import { normalizeTagName } from '#lib/domain/tags/normalize-tag-name.js';
import { TAG_SEPARATOR } from '#lib/domain/tags/parse-tag-query.js';

export const validateBreakpoints = (
	type: ProjectType,
	breakpoints: Omit<Breakpoint, 'id'>[]
): string[] => {
	const errors: string[] = [];

	if (breakpoints.length === 0) {
		return ['A root breakpoint is required.'];
	}

	if (type === 'fluid' && breakpoints.length !== 2) {
		errors.push('Fluid projects need exactly a min and a max breakpoint.');
	}

	if (type === 'static' && breakpoints.length !== 1) {
		errors.push('Projects without breakpoints only have the root.');
	}

	if (type !== 'fluid' && breakpoints[0].width !== 0) {
		errors.push('The root breakpoint must start at 0px.');
	}

	if (breakpoints.some((bp) => bp.name.trim() === '')) {
		errors.push('Every breakpoint needs a name.');
	}

	const names = breakpoints.map((bp) => bp.name.trim().toLowerCase());
	if (new Set(names).size !== names.length) {
		errors.push('Breakpoint names must be unique.');
	}

	if (
		breakpoints.some((bp) => !Number.isFinite(bp.width) || bp.width < 0)
	) {
		errors.push('Breakpoint widths must be 0 or more.');
	}

	for (let i = 1; i < breakpoints.length; i++) {
		if (breakpoints[i].width <= breakpoints[i - 1].width) {
			errors.push('Each breakpoint must be wider than the one before it.');
			break;
		}
	}

	return errors;
};

/** The checks below report against a single breakpoint. */
export const BREAKPOINT_ROW_ERRORS = [
	'Every breakpoint needs a name.',
	'Breakpoint names must be unique.',
	'Breakpoint widths must be 0 or more.',
	'Each breakpoint must be wider than the one before it.'
];

export type BreakpointRowErrors = { name?: string; width?: string };

/**
 * The problems with each breakpoint's name and width, in list order, so they
 * can be shown on the field itself. Project-wide problems stay in
 * `validateBreakpoints`.
 */
export const validateBreakpointRows = (
	breakpoints: Omit<Breakpoint, 'id'>[]
): BreakpointRowErrors[] => {
	const names = breakpoints.map((bp) => bp.name.trim().toLowerCase());

	return breakpoints.map((bp, index) => {
		const errors: BreakpointRowErrors = {};
		const previous = breakpoints[index - 1];

		if (names[index] === '') {
			errors.name = 'Needs a name.';
		} else if (names.indexOf(names[index]) !== index) {
			errors.name = 'Another breakpoint already has this name.';
		}

		if (!Number.isFinite(bp.width) || bp.width < 0) {
			errors.width = 'Width must be 0 or more.';
		} else if (previous && bp.width <= previous.width) {
			errors.width = `Must be wider than ${previous.name.trim() || 'the one before'} (${previous.width}px).`;
		}

		return errors;
	});
};

export const validateTagNames = (tags: { name: string }[]): string[] => {
	const errors: string[] = [];
	const names = tags.map((tag) => normalizeTagName(tag.name));

	if (names.some((name) => name === '')) {
		errors.push('Every tag needs a name.');
	}

	if (names.some((name) => name.includes(TAG_SEPARATOR))) {
		errors.push(`Tag names can't contain "${TAG_SEPARATOR}".`);
	}

	const named = names.filter((name) => name !== '');
	if (new Set(named).size !== named.length) {
		errors.push('Tag names must be unique.');
	}

	return errors;
};
