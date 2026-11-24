import { describe, it, expect, beforeEach } from 'vitest';
import LanesRepository from './lanes-repository.svelte';

describe('lanes-repository', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it('duplicate does not share nested objects with the original', () => {
		const repository = new LanesRepository();
		repository.lanes = [
			{
				...LanesRepository.defaultLane(),
				variationSettings: { wdth: 80 }
			}
		];

		const [original] = repository.lanes;
		repository.updateOverrideValue(original.id, '0', 'fontSize', 1);
		repository.duplicate(original.id);

		const copy = repository.lanes[1];
		repository.updateOverrideValue(copy.id, '0', 'fontSize', 2);
		repository.updateOverrideValue(copy.id, '1', 'lineHeight', 1.5);
		copy.variationSettings!.wdth = 100;

		expect(copy.id).not.toBe(original.id);
		expect(repository.lanes[0].overrides).toStrictEqual({
			'0': { fontSize: 1 }
		});
		expect(repository.lanes[0].variationSettings).toStrictEqual({
			wdth: 80
		});
	});

	it('carries font changes from a source to its linked lanes only', () => {
		const repository = new LanesRepository();
		repository.lanes = [LanesRepository.defaultLane()];

		const [source] = repository.lanes;
		const linked = repository.link(source.id)!;

		repository.update(source.id, { family: 'Inter', weight: 700 });
		repository.update(linked.id, { family: 'Roboto', baseSize: 1.25 });

		expect(repository.get(linked.id)).toMatchObject({
			family: 'Inter',
			weight: 700,
			baseSize: 1.25
		});
		expect(repository.get(source.id)?.baseSize).toBe(1);
	});

	it('moves an unlinked lane out after its group with its font', () => {
		const repository = new LanesRepository();
		repository.lanes = [LanesRepository.defaultLane()];

		const [source] = repository.lanes;
		const first = repository.link(source.id)!;
		const second = repository.link(source.id)!;

		repository.unlink(first.id);

		expect(repository.lanes.map((lane) => lane.id)).toStrictEqual([
			source.id,
			second.id,
			first.id
		]);
		expect(repository.number(first.id)).toBe('2');
		expect(repository.get(first.id)?.family).toBe(source.family);
	});
});
