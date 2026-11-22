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

	it('places and unplaces per breakpoint', () => {
		const repository = new TagsRepository();
		const h1 = repository.create('h1', 'root')!;

		repository.place(h1.id, 'root', { laneId: 'a', step: 6 });
		repository.place(h1.id, 'desktop', { laneId: 'b', step: 8 });
		repository.unplace(h1.id, 'root');

		expect(repository.get(h1.id)?.placements).toStrictEqual({
			desktop: { laneId: 'b', step: 8 }
		});
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
