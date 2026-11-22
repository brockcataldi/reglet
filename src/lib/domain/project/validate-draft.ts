import type { Breakpoint, ProjectType } from '#lib/types.js';
import { normalizeTagName } from '#lib/domain/tags/normalize-tag-name.js';

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

export const validateTagNames = (tags: { name: string }[]): string[] => {
	const errors: string[] = [];
	const names = tags.map((tag) => normalizeTagName(tag.name));

	if (names.some((name) => name === '')) {
		errors.push('Every tag needs a name.');
	}

	const named = names.filter((name) => name !== '');
	if (new Set(named).size !== named.length) {
		errors.push('Tag names must be unique.');
	}

	return errors;
};
