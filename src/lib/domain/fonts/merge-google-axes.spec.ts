import { describe, it, expect } from 'vitest';
import { mergeGoogleAxes } from './merge-google-axes';
import type { AvailableFamily } from './types';

const family = (
	name: string,
	axes: AvailableFamily['axes'] = {}
): AvailableFamily => ({
	family: name,
	weights: [{ min: 400, max: 900 }],
	styles: ['normal'],
	axes
});

describe('merge-google-axes', () => {
	it('returns families untouched without google fonts', () => {
		const families = [family('Inter')];
		expect(mergeGoogleAxes(families, [])).toStrictEqual(families);
	});

	it('adds custom axes from the matching google font', () => {
		expect(
			mergeGoogleAxes(
				[family('Bodoni Moda')],
				[
					{
						family: 'Bodoni Moda',
						faces: [
							{ ital: '0', opsz: '6..96', wght: '400..900' },
							{ ital: '1', opsz: '6..96', wght: '400..900' }
						]
					}
				]
			)
		).toStrictEqual([
			family('Bodoni Moda', { opsz: { min: 6, max: 96 } })
		]);
	});

	it('skips ital, wght and wdth since @font-face describes them', () => {
		expect(
			mergeGoogleAxes(
				[family('Roboto Flex')],
				[
					{
						family: 'Roboto Flex',
						faces: [{ ital: '0..1', wdth: '25..151', wght: '100..1000' }]
					}
				]
			)
		).toStrictEqual([family('Roboto Flex')]);
	});

	it('keeps axes already derived from @font-face', () => {
		expect(
			mergeGoogleAxes(
				[family('Roboto Flex', { wdth: { min: 25, max: 151 } })],
				[{ family: 'Roboto Flex', faces: [{ GRAD: '-200..150' }] }]
			)
		).toStrictEqual([
			family('Roboto Flex', {
				GRAD: { min: -200, max: 150 },
				wdth: { min: 25, max: 151 }
			})
		]);
	});

	it('unions an axis across faces, including single values', () => {
		expect(
			mergeGoogleAxes(
				[family('Fraunces')],
				[
					{
						family: 'Fraunces',
						faces: [{ SOFT: '0' }, { SOFT: '50..100' }]
					}
				]
			)[0].axes
		).toStrictEqual({ SOFT: { min: 0, max: 100 } });
	});

	it('matches family names case-insensitively', () => {
		expect(
			mergeGoogleAxes(
				[family('bodoni moda')],
				[{ family: 'Bodoni Moda', faces: [{ opsz: '6..96' }] }]
			)[0].axes
		).toStrictEqual({ opsz: { min: 6, max: 96 } });
	});

	it('ignores unparseable axis values', () => {
		expect(
			mergeGoogleAxes(
				[family('Inter')],
				[
					{
						family: 'Inter',
						faces: [{ opsz: 'abc' }, { slnt: '1..2..3' }]
					}
				]
			)
		).toStrictEqual([family('Inter')]);
	});

	it('ignores google fonts that never loaded', () => {
		expect(
			mergeGoogleAxes(
				[family('Inter')],
				[{ family: 'Bodoni Moda', faces: [{ opsz: '6..96' }] }]
			)
		).toStrictEqual([family('Inter')]);
	});
});
