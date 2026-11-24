import { describe, it, expect } from 'vitest';
import { toStyleName } from './to-style-name';

describe('to-style-name', () => {
	it('names standard weights', () => {
		expect(toStyleName({ weight: 400, style: 'normal' })).toBe('Regular');
		expect(toStyleName({ weight: 700, style: 'normal' })).toBe('Bold');
		expect(toStyleName({ weight: 200, style: 'normal' })).toBe(
			'ExtraLight'
		);
	});

	it('reads numeric strings and CSS keywords', () => {
		expect(toStyleName({ weight: '300', style: 'normal' })).toBe('Light');
		expect(toStyleName({ weight: 'bold', style: 'normal' })).toBe('Bold');
		expect(toStyleName({ weight: 'normal', style: 'normal' })).toBe(
			'Regular'
		);
	});

	it('adds the slant after the weight', () => {
		expect(toStyleName({ weight: 700, style: 'italic' })).toBe(
			'Bold Italic'
		);
		expect(toStyleName({ weight: 300, style: 'oblique' })).toBe(
			'Light Oblique'
		);
	});

	it('drops Regular from a regular-weight slant', () => {
		expect(toStyleName({ weight: 400, style: 'italic' })).toBe('Italic');
	});

	it('keeps off-grid weights as numbers', () => {
		expect(toStyleName({ weight: 450, style: 'normal' })).toBe('450');
		expect(toStyleName({ weight: 450, style: 'italic' })).toBe(
			'450 Italic'
		);
	});
});
