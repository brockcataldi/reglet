import { describe, it, expect, beforeEach } from 'vitest';
import BreakpointsRepository from './breakpoints-repository.svelte';

describe('breakpoints-repository', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	const seeded = () => {
		const repository = new BreakpointsRepository();
		repository.reset([
			{ id: 'desktop', name: 'Desktop', width: 1200 },
			{ id: 'root', name: 'Root', width: 0 }
		]);
		return repository;
	};

	it('keeps breakpoints sorted by width', () => {
		const repository = seeded();

		expect(repository.root?.id).toBe('root');

		repository.add({ name: 'Tablet', width: 768 });
		expect(repository.breakpoints.map((bp) => bp.name)).toStrictEqual([
			'Root',
			'Tablet',
			'Desktop'
		]);

		repository.update('desktop', { width: 500 });
		expect(repository.breakpoints.map((bp) => bp.name)).toStrictEqual([
			'Root',
			'Desktop',
			'Tablet'
		]);
	});

	it('previews a change without making it', () => {
		const repository = seeded();

		expect(
			repository.preview({ add: { name: 'Tablet', width: 768 } })
		).toHaveLength(3);
		expect(repository.preview({ remove: 'desktop' })).toStrictEqual([
			{ id: 'root', name: 'Root', width: 0 }
		]);
		expect(
			repository.preview({
				update: { id: 'root', patch: { width: 5 } }
			})[0].width
		).toBe(5);
		expect(repository.breakpoints).toHaveLength(2);
	});

	it('removes breakpoints', () => {
		const repository = seeded();

		repository.remove('desktop');
		expect(repository.breakpoints.map((bp) => bp.id)).toStrictEqual([
			'root'
		]);
	});
});
