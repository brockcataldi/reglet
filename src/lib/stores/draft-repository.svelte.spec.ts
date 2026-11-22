import { describe, it, expect, beforeEach } from 'vitest';
import DraftRepository from './draft-repository.svelte';

describe('draft-repository', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it('starts valid with the standard breakpoints and HTML tags', () => {
		const draft = new DraftRepository();

		expect(draft.type).toBe('standard');
		expect(draft.breakpoints.map((bp) => bp.name)).toStrictEqual([
			'Root',
			'Tablet',
			'Desktop'
		]);
		expect(draft.tags.map((tag) => tag.name)).toContain('h1');
		expect(draft.valid).toBe(true);
	});

	it('swaps breakpoints when the type changes', () => {
		const draft = new DraftRepository();

		draft.type = 'fluid';
		expect(draft.breakpoints.map((bp) => bp.width)).toStrictEqual([
			320, 1240
		]);

		draft.type = 'static';
		expect(draft.breakpoints.map((bp) => bp.name)).toStrictEqual(['Root']);
	});

	it('only lets standard projects add or remove breakpoints', () => {
		const draft = new DraftRepository();
		const [root, tablet] = draft.breakpoints;

		draft.addBreakpoint();
		expect(draft.breakpoints).toHaveLength(4);
		expect(draft.breakpoints[3].width).toBe(1456);

		draft.removeBreakpoint(root.id);
		draft.removeBreakpoint(tablet.id);
		expect(draft.breakpoints.map((bp) => bp.id)).not.toContain(tablet.id);
		expect(draft.breakpoints[0].id).toBe(root.id);

		draft.type = 'fluid';
		draft.addBreakpoint();
		draft.removeBreakpoint(draft.breakpoints[1].id);
		expect(draft.breakpoints).toHaveLength(2);
	});

	it('replaces the tags when the template changes', () => {
		const draft = new DraftRepository();

		draft.template = 'custom';
		expect(draft.tags).toStrictEqual([]);

		draft.template = 'material';
		expect(draft.tags).toHaveLength(15);
	});

	it('reports blank and duplicate tags', () => {
		const draft = new DraftRepository();
		draft.template = 'custom';

		draft.addTag();
		expect(draft.errors).toContain('Every tag needs a name.');

		draft.tags[0].name = 'h1';
		draft.addTag();
		draft.tags[1].name = 'H1';
		expect(draft.errors).toStrictEqual(['Tag names must be unique.']);
	});
});
