import { describe, it, expect } from 'vitest';
import { createLaneValidator, type CreateLaneData } from './LaneCreator';

const data = (
	overrides: Partial<CreateLaneData> = {}
): CreateLaneData => ({
	family: 'Roboto',
	weight: '400',
	style: 'normal',
	...overrides
});

describe('createLaneValidator', () => {
	it('passes valid data and trims strings', () => {
		const [result, errors] = createLaneValidator(
			data({ family: '  Roboto  ' })
		);
		expect(result?.family).toBe('Roboto');
		expect(errors).toEqual({});
	});

	it('reports empty family and weight', () => {
		const [result, errors] = createLaneValidator(
			data({ family: ' ', weight: '' })
		);
		expect(result).toBeUndefined();
		expect(errors.family).toBe('Family cannot be empty');
		expect(errors.weight).toBe('Weight cannot be empty');
	});

	it('rejects an unknown style', () => {
		const [, errors] = createLaneValidator(
			data({ style: 'slanted' as CreateLaneData['style'] })
		);
		expect(errors.style).toBeDefined();
	});
});
