import { beforeEach, describe, expect, it } from 'vitest';

import project from './project.svelte';

// a standard project (root, tablet, desktop) with one lane and an h1 tag
const setup = () => {
	project.draft.type = 'standard';
	project.create();
	project.tags.reset();

	const [root, tablet, desktop] = project.breakpointOrder;
	const source = project.lanes.lanes[0].id;
	const tag = project.tags.create('h1', root)!;

	return { root, tablet, desktop, source, tag: tag.id };
};

const placements = (tagId: string) =>
	$state.snapshot(project.tags.get(tagId)!.placements);

describe('linked lanes', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it('matches tags onto a new linked lane without moving placed ones', () => {
		const { root, tablet, desktop, source, tag } = setup();
		project.assignTag(tag, root, { laneId: source, step: 5 });
		project.assignTag(tag, desktop, { laneId: source, step: 6 });

		const linked = project.linkLane(source)!;

		expect(placements(tag)).toStrictEqual({
			[root]: { laneId: source, step: 5 },
			[tablet]: { laneId: linked.id, step: 5 },
			[desktop]: { laneId: source, step: 6 }
		});
	});

	it('moves and removes matched placements with the source', () => {
		const { root, tablet, source, tag } = setup();
		const linked = project.linkLane(source)!;

		project.assignTag(tag, root, { laneId: source, step: 4 });
		expect(placements(tag)[tablet]).toStrictEqual({
			laneId: linked.id,
			step: 4
		});

		project.assignTag(tag, root, { laneId: source, step: 3 });
		expect(placements(tag)[tablet]).toStrictEqual({
			laneId: linked.id,
			step: 3
		});

		project.unassignTag(tag, root);
		expect(placements(tag)).toStrictEqual({});
	});

	it('keeps a matched placement that was moved by hand', () => {
		const { root, tablet, source, tag } = setup();
		const linked = project.linkLane(source)!;

		project.assignTag(tag, root, { laneId: source, step: 4 });
		project.assignTag(tag, tablet, { laneId: linked.id, step: 2 });
		project.unassignTag(tag, root);

		expect(placements(tag)).toStrictEqual({
			[tablet]: { laneId: linked.id, step: 2 }
		});
	});

	it('leaves the linked lanes alone with matching steps off', () => {
		const { root, source, tag } = setup();
		project.linkLane(source);
		project.setMatchSteps(source, false);

		project.assignTag(tag, root, { laneId: source, step: 4 });

		expect(Object.keys(placements(tag))).toStrictEqual([root]);
	});

	it('links no more lanes than there are breakpoints', () => {
		const { source } = setup();

		expect(project.linkLane(source)).toBeDefined();
		expect(project.linkLane(source)).toBeDefined();
		expect(project.canLink(source)).toBe(false);
		expect(project.linkLane(source)).toBeUndefined();
	});

	it('steps every lane in a group together', () => {
		const { source } = setup();
		const linked = project.linkLane(source)!;
		const before = project.lanes.get(source)!.maxStep;

		project.stepLane(linked.id, 'maxStep', 'increment');

		expect(project.lanes.get(source)!.maxStep).toBe(before + 1);
		expect(project.lanes.get(linked.id)!.maxStep).toBe(before + 1);
	});

	it('names linked lanes after their source', () => {
		const { source } = setup();
		const linked = project.linkLane(source)!;

		expect(project.lanes.name(linked.id)).toBe('Lane 1b');
	});
});

describe('fallbacks', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it('guesses until one is picked, and forgets picks on a new project', () => {
		setup();
		expect(project.fallbackFor('Fira Code')).toBe('monospace');

		project.setFallback(' Fira Code ', '');
		expect(project.fallbackFor('Fira Code')).toBe('');

		project.create();
		expect(project.fallbackFor('Fira Code')).toBe('monospace');
	});
});

describe('changing units', () => {
	beforeEach(() => {
		localStorage.clear();
		project.draft.reset();
		project.create();
	});

	it('starts a px project with a 16px base', () => {
		project.draft.fontSizeUnit = 'px';
		project.create();

		expect(project.fontSizeUnit).toBe('px');
		expect(project.lanes.lanes[0].baseSize).toBe(16);
	});

	it('converts base sizes and custom font sizes', () => {
		const lane = project.lanes.lanes[0];
		project.lanes.update(lane.id, {
			baseSize: 1,
			overrides: { 2: { fontSize: 1.5 } }
		});

		project.changeFontSizeUnit('px', true);

		expect(project.fontSizeUnit).toBe('px');
		expect(project.lanes.lanes[0].baseSize).toBe(16);
		expect(project.lanes.lanes[0].overrides[2].fontSize).toBe(24);
	});

	it('keeps the numbers when asked to', () => {
		project.changeFontSizeUnit('px', false);

		expect(project.fontSizeUnit).toBe('px');
		expect(project.lanes.lanes[0].baseSize).toBe(1);
	});

	it('converts letter spacing at each specimen font size', () => {
		const lane = project.lanes.lanes[0];
		project.lanes.update(lane.id, {
			baseSize: 2,
			ratio: 1,
			overrides: { 0: { letterSpacing: 0.05 } }
		});
		project.changeLetterSpacingUnit('em', false);

		// 0.05em at 2rem (32px)
		project.changeLetterSpacingUnit('px', true);
		expect(project.lanes.lanes[0].overrides[0].letterSpacing).toBe(1.6);

		project.changeLetterSpacingUnit('ch', true);
		expect(project.letterSpacingUnit).toBe('ch');
		expect(project.lanes.lanes[0].overrides[0].letterSpacing).toBe(1.6);
	});
});
