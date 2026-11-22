import { describe, it, expect } from 'vitest';
import { groupFontFaces } from './group-font-faces';
import type { FontFaceDescriptors } from './types';

const face = (
	family: string,
	overrides: Partial<FontFaceDescriptors> = {}
): FontFaceDescriptors => ({
	family,
	weight: 'normal',
	style: 'normal',
	stretch: 'normal',
	...overrides
});

describe('group-font-faces', () => {
	it('empty', () => {
		expect(groupFontFaces([])).toStrictEqual([]);
	});

	it('single face with keyword descriptors', () => {
		expect(groupFontFaces([face('Roboto')])).toStrictEqual([
			{
				family: 'Roboto',
				styles: ['normal'],
				weights: { normal: [{ min: 400, max: 400 }] },
				axes: {}
			}
		]);
	});

	it('maps the bold keyword to 700', () => {
		expect(
			groupFontFaces([face('Roboto', { weight: 'bold' })])[0].weights
				.normal
		).toStrictEqual([{ min: 700, max: 700 }]);
	});

	it('groups weights per style into one family, sorted', () => {
		expect(
			groupFontFaces([
				face('Roboto', { weight: '700', style: 'italic' }),
				face('Roboto', { weight: '400' }),
				face('Roboto', { weight: '700' }),
				face('Roboto', { weight: '400', style: 'italic' })
			])
		).toStrictEqual([
			{
				family: 'Roboto',
				styles: ['normal', 'italic'],
				weights: {
					normal: [
						{ min: 400, max: 400 },
						{ min: 700, max: 700 }
					],
					italic: [
						{ min: 400, max: 400 },
						{ min: 700, max: 700 }
					]
				},
				axes: {}
			}
		]);
	});

	it('keeps weights a style lacks out of that style', () => {
		// ex. mr-eaves-sans on Typekit: 400, 700 and 400 italic, no 700 italic
		expect(
			groupFontFaces([
				face('mr-eaves-sans', { weight: '400' }),
				face('mr-eaves-sans', { weight: '400', style: 'italic' }),
				face('mr-eaves-sans', { weight: '700' })
			])[0].weights
		).toStrictEqual({
			normal: [
				{ min: 400, max: 400 },
				{ min: 700, max: 700 }
			],
			italic: [{ min: 400, max: 400 }]
		});
	});

	it('keeps a style whose faces have no parseable weight', () => {
		expect(
			groupFontFaces([
				face('Roboto', { weight: '400' }),
				face('Roboto', { weight: 'auto', style: 'italic' })
			])[0]
		).toMatchObject({
			styles: ['normal', 'italic'],
			weights: { normal: [{ min: 400, max: 400 }], italic: [] }
		});
	});

	it('variable weight range', () => {
		expect(
			groupFontFaces([face('Inter', { weight: '100 900' })])[0].weights
				.normal
		).toStrictEqual([{ min: 100, max: 900 }]);
	});

	it('normalises reversed weight ranges', () => {
		expect(
			groupFontFaces([face('Inter', { weight: '900 100' })])[0].weights
				.normal
		).toStrictEqual([{ min: 100, max: 900 }]);
	});

	it('dedupes identical weight ranges across subsets', () => {
		// Google Fonts emits one @font-face per unicode-range subset
		expect(
			groupFontFaces([
				face('Inter', { weight: '100 900' }),
				face('Inter', { weight: '100 900' }),
				face('Inter', { weight: '100 900' })
			])[0].weights.normal
		).toStrictEqual([{ min: 100, max: 900 }]);
	});

	it('ignores unparseable weights', () => {
		expect(
			groupFontFaces([
				face('Roboto', { weight: 'auto' }),
				face('Roboto', { weight: 'bolder' }),
				face('Roboto', { weight: '100 400 900' }),
				face('Roboto', { weight: '' })
			])[0].weights.normal
		).toStrictEqual([]);
	});

	it('strips quotes from family names', () => {
		expect(
			groupFontFaces([face('"Bodoni Moda"'), face("'Open Sans'")]).map(
				({ family }) => family
			)
		).toStrictEqual(['Bodoni Moda', 'Open Sans']);
	});

	it('groups family names case-insensitively, keeping the first spelling', () => {
		expect(
			groupFontFaces([
				face('proxima-nova', { weight: '400' }),
				face('Proxima-Nova', { weight: '700' })
			])
		).toStrictEqual([
			{
				family: 'proxima-nova',
				styles: ['normal'],
				weights: {
					normal: [
						{ min: 400, max: 400 },
						{ min: 700, max: 700 }
					]
				},
				axes: {}
			}
		]);
	});

	it('keeps families in first-seen order', () => {
		expect(
			groupFontFaces([face('B'), face('A'), face('B')]).map(
				({ family }) => family
			)
		).toStrictEqual(['B', 'A']);
	});

	it('skips faces with an empty family', () => {
		expect(groupFontFaces([face(''), face('""')])).toStrictEqual([]);
	});

	it('reduces oblique angles to the oblique keyword', () => {
		expect(
			groupFontFaces([
				face('Recursive', { style: 'oblique 10deg' }),
				face('Recursive', { style: 'oblique -15deg 0deg' })
			])[0].styles
		).toStrictEqual(['oblique']);
	});

	it('orders styles normal, italic, oblique', () => {
		expect(
			groupFontFaces([
				face('A', { style: 'oblique' }),
				face('A', { style: 'italic' }),
				face('A', { style: 'normal' })
			])[0].styles
		).toStrictEqual(['normal', 'italic', 'oblique']);
	});

	it('variable stretch range becomes a wdth axis', () => {
		expect(
			groupFontFaces([face('Roboto Flex', { stretch: '25% 151%' })])[0]
				.axes
		).toStrictEqual({ wdth: { min: 25, max: 151 } });
	});

	it('unions discrete stretch keywords into a wdth axis', () => {
		expect(
			groupFontFaces([
				face('Univers', { stretch: 'condensed' }),
				face('Univers', { stretch: 'normal' }),
				face('Univers', { stretch: 'expanded' })
			])[0].axes
		).toStrictEqual({ wdth: { min: 75, max: 125 } });
	});

	it('omits wdth when every face is normal width', () => {
		expect(
			groupFontFaces([
				face('Roboto', { stretch: '100%' }),
				face('Roboto', { stretch: 'normal' })
			])[0].axes
		).toStrictEqual({});
	});

	it('reads descriptors from real FontFace objects', () => {
		const faces = [
			new FontFace('Bodoni Moda', 'url(x.woff2)', {
				weight: '400 900',
				style: 'italic',
				stretch: '75% 100%'
			}),
			new FontFace('Bodoni Moda', 'url(y.woff2)', { weight: 'bold' })
		];

		expect(groupFontFaces(faces)).toStrictEqual([
			{
				family: 'Bodoni Moda',
				styles: ['normal', 'italic'],
				weights: {
					normal: [{ min: 700, max: 700 }],
					italic: [{ min: 400, max: 900 }]
				},
				axes: { wdth: { min: 75, max: 100 } }
			}
		]);
	});
});
