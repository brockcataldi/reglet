import { describe, it, expect } from 'vitest';
import { fitTypeSetting } from './fit-type-setting';
import type { TypeSetting } from '#lib/types.js';
import type { AvailableFamily, AxisRange } from './types';

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
	styles: ['normal'],
	weights: { normal: [{ min: 400, max: 400 }] },
	axes: {},
	...overrides
});

// a family with a single (normal) style in the given weights
const normalOnly = (...weights: AxisRange[]) =>
	family({ weights: { normal: weights } });

const discrete = (value: number): AxisRange => ({
	min: value,
	max: value
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
				normalOnly(discrete(400), discrete(700))
			).weight
		).toBe('700');
	});

	it('snaps to the nearest discrete weight', () => {
		expect(
			fitTypeSetting(
				setting({ weight: '650' }),
				normalOnly(discrete(400), discrete(700))
			).weight
		).toBe('700');
	});

	it('breaks ties toward the heavier weight', () => {
		expect(
			fitTypeSetting(
				setting({ weight: '500' }),
				normalOnly(discrete(400), discrete(600))
			).weight
		).toBe('600');
	});

	it('keeps a weight inside a variable range', () => {
		expect(
			fitTypeSetting(
				setting({ weight: '550' }),
				normalOnly({ min: 100, max: 900 })
			).weight
		).toBe('550');
	});

	it('clamps a weight outside a variable range', () => {
		expect(
			fitTypeSetting(
				setting({ weight: 950 }),
				normalOnly({ min: 100, max: 900 })
			).weight
		).toBe('900');
	});

	it('treats an unparseable weight as 400', () => {
		expect(
			fitTypeSetting(
				setting({ weight: 'bold' }),
				normalOnly(discrete(300), discrete(700))
			).weight
		).toBe('300');
	});

	it('leaves the weight alone when the style lists no weights', () => {
		expect(
			fitTypeSetting(setting({ weight: '123' }), normalOnly()).weight
		).toBe('123');
	});

	it('keeps an available style', () => {
		expect(
			fitTypeSetting(
				setting({ style: 'italic' }),
				family({
					styles: ['normal', 'italic'],
					weights: { normal: [discrete(400)], italic: [discrete(400)] }
				})
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
			fitTypeSetting(
				setting(),
				family({
					styles: ['italic'],
					weights: { italic: [discrete(400)] }
				})
			).style
		).toBe('italic');
	});

	describe('weights that only exist in some styles', () => {
		// ex. mr-eaves-sans on Typekit: 400, 700 and 400 italic, no 700 italic
		const mrEaves = family({
			styles: ['normal', 'italic'],
			weights: {
				normal: [discrete(400), discrete(700)],
				italic: [discrete(400)]
			}
		});

		it('snaps the weight to what the chosen style comes in', () => {
			expect(
				fitTypeSetting(
					setting({ weight: '700', style: 'italic' }),
					mrEaves
				)
			).toMatchObject({ weight: '400', style: 'italic' });
		});

		it('keeps a weight the chosen style has', () => {
			expect(
				fitTypeSetting(
					setting({ weight: '700', style: 'normal' }),
					mrEaves
				)
			).toMatchObject({ weight: '700', style: 'normal' });
		});

		it('fits the weight to the fallback style', () => {
			expect(
				fitTypeSetting(
					setting({ weight: '700', style: 'oblique' }),
					family({
						styles: ['italic'],
						weights: { italic: [{ min: 300, max: 500 }] }
					})
				)
			).toMatchObject({ weight: '500', style: 'italic' });
		});
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
