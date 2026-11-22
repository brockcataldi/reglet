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
});
