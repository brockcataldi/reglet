import { describe, it, expect } from 'vitest';
import { fitTypeSetting } from './fit-type-setting';
import type { TypeSetting } from '#lib/types.js';
import type { AvailableFamily } from './types';

const setting = (overrides: Partial<TypeSetting> = {}): TypeSetting => ({
	family: 'Test',
	weight: '400',
	style: 'normal',
	...overrides
});

const family = (
	overrides: Partial<AvailableFamily> = {}
): AvailableFamily => ({
	family: 'Test',
	weights: [{ min: 400, max: 400 }],
	styles: ['normal'],
	axes: {},
	...overrides
});

describe('fit-type-setting', () => {
	it('leaves the setting alone for unknown families', () => {
		const original = setting({ weight: '123', style: 'oblique' });
		expect(fitTypeSetting(original, undefined)).toBe(original);
	});

	it('keeps an available discrete weight', () => {
		expect(
			fitTypeSetting(
				setting({ weight: '700' }),
				family({
					weights: [
						{ min: 400, max: 400 },
						{ min: 700, max: 700 }
					]
				})
			).weight
		).toBe('700');
	});

	it('snaps to the nearest discrete weight', () => {
		expect(
			fitTypeSetting(
				setting({ weight: '650' }),
				family({
					weights: [
						{ min: 400, max: 400 },
						{ min: 700, max: 700 }
					]
				})
			).weight
		).toBe('700');
	});

	it('breaks ties toward the heavier weight', () => {
		expect(
			fitTypeSetting(
				setting({ weight: '500' }),
				family({
					weights: [
						{ min: 400, max: 400 },
						{ min: 600, max: 600 }
					]
				})
			).weight
		).toBe('600');
	});

	it('keeps a weight inside a variable range', () => {
		expect(
			fitTypeSetting(
				setting({ weight: '550' }),
				family({ weights: [{ min: 100, max: 900 }] })
			).weight
		).toBe('550');
	});

	it('clamps a weight outside a variable range', () => {
		expect(
			fitTypeSetting(
				setting({ weight: 950 }),
				family({ weights: [{ min: 100, max: 900 }] })
			).weight
		).toBe('900');
	});

	it('treats an unparseable weight as 400', () => {
		expect(
			fitTypeSetting(
				setting({ weight: 'bold' }),
				family({
					weights: [
						{ min: 300, max: 300 },
						{ min: 700, max: 700 }
					]
				})
			).weight
		).toBe('300');
	});

	it('leaves the weight alone when the family lists none', () => {
		expect(
			fitTypeSetting(setting({ weight: '123' }), family({ weights: [] }))
				.weight
		).toBe('123');
	});

	it('keeps an available style', () => {
		expect(
			fitTypeSetting(
				setting({ style: 'italic' }),
				family({ styles: ['normal', 'italic'] })
			).style
		).toBe('italic');
	});

	it('falls back to normal for an unavailable style', () => {
		expect(
			fitTypeSetting(setting({ style: 'oblique' }), family()).style
		).toBe('normal');
	});

	it('falls back to the first style when normal is unavailable', () => {
		expect(
			fitTypeSetting(setting(), family({ styles: ['italic'] })).style
		).toBe('italic');
	});

	it('drops axes the family lacks and clamps the rest', () => {
		expect(
			fitTypeSetting(
				setting({ variationSettings: { opsz: 120, GRAD: 0, wdth: 90 } }),
				family({
					axes: { opsz: { min: 6, max: 96 }, wdth: { min: 75, max: 100 } }
				})
			).variationSettings
		).toStrictEqual({ opsz: 96, wdth: 90 });
	});
});
