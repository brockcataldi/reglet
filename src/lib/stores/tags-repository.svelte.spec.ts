import { flushSync } from 'svelte';
import { describe, it, expect, beforeEach } from 'vitest';
import TagsRepository from './tags-repository.svelte';

describe('tags-repository', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it('creates tags with trimmed, unique names', () => {
		const repository = new TagsRepository();

		const h1 = repository.create(' h1 ', 'root');

		expect(h1?.name).toBe('h1');
		expect(h1?.startsAt).toBe('root');
		expect(repository.create('H1', 'root')).toBeUndefined();
		expect(repository.create('  ', 'root')).toBeUndefined();
		expect(repository.create('tablet/h2', 'root')).toBeUndefined();
		expect(repository.tags).toHaveLength(1);
	});

	it('refuses to rename onto another tag', () => {
		const repository = new TagsRepository();
		const h1 = repository.create('h1', 'root')!;
		repository.create('h2', 'root');

		expect(repository.rename(h1.id, 'H2')).toBe(false);
		expect(repository.rename(h1.id, 'H1')).toBe(true);
		expect(repository.get(h1.id)?.name).toBe('H1');
	});

	it('starts each tag at the lowest breakpoint it is placed on', () => {
		const repository = new TagsRepository();
		const order = ['root', 'tablet', 'desktop'];
		const h1 = repository.create('h1', 'root')!;

		repository.assign(h1.id, 'desktop', { laneId: 'a', step: 8 }, order);
		expect(repository.get(h1.id)?.startsAt).toBe('desktop');

		repository.assign(h1.id, 'tablet', { laneId: 'a', step: 7 }, order);
		expect(repository.get(h1.id)?.startsAt).toBe('tablet');

		repository.unassign(h1.id, 'tablet', order);
		expect(repository.get(h1.id)?.startsAt).toBe('desktop');

		repository.unassign(h1.id, 'desktop', order);
		expect(repository.get(h1.id)?.startsAt).toBe('root');
		expect(repository.get(h1.id)?.placements).toStrictEqual({});
	});

	it('replaces the placement at a breakpoint', () => {
		const repository = new TagsRepository();
		const order = ['root'];
		const h1 = repository.create('h1', 'root')!;

		repository.assign(h1.id, 'root', { laneId: 'a', step: 6 }, order);
		repository.assign(h1.id, 'root', { laneId: 'b', step: 5 }, order);

		expect(repository.get(h1.id)?.placements).toStrictEqual({
			root: { laneId: 'b', step: 5 }
		});
	});

	it('forgets placements on a deleted lane', () => {
		const repository = new TagsRepository();
		const order = ['root', 'desktop'];
		const h1 = repository.create('h1', 'root')!;

		repository.assign(h1.id, 'root', { laneId: 'a', step: 6 }, order);
		repository.assign(h1.id, 'desktop', { laneId: 'b', step: 8 }, order);
		repository.forgetLane('a', order);

		expect(repository.get(h1.id)?.placements).toStrictEqual({
			desktop: { laneId: 'b', step: 8 }
		});
		expect(repository.get(h1.id)?.startsAt).toBe('desktop');
	});

	it('drops placements on removed breakpoints when synced', () => {
		const repository = new TagsRepository();
		const h1 = repository.create('h1', 'root')!;
		const order = ['root', 'tablet', 'desktop'];

		repository.assign(h1.id, 'tablet', { laneId: 'a', step: 6 }, order);
		repository.assign(h1.id, 'desktop', { laneId: 'a', step: 8 }, order);
		repository.syncBreakpoints(['root', 'desktop']);

		expect(repository.get(h1.id)?.placements).toStrictEqual({
			desktop: { laneId: 'a', step: 8 }
		});
		expect(repository.get(h1.id)?.startsAt).toBe('desktop');
	});

	it('persists to local storage', () => {
		const repository = new TagsRepository();
		repository.create('h1', 'root');
		repository.delete(repository.create('h2', 'root')!.id);
		flushSync();

		expect(new TagsRepository().tags.map((tag) => tag.name)).toStrictEqual(
			['h1']
		);
	});
});
