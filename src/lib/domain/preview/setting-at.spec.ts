import { describe, it, expect } from 'vitest';
import type { Breakpoint, Lane, Tag } from '#lib/types.js';
import { settingAt, type SettingContext } from './setting-at';

const lane: Lane = {
	id: 'a',
	family: 'Roboto',
	weight: 400,
	style: 'normal',
	overrides: { 2: { lineHeight: 1.2 } },
	baseSize: 1,
	ratio: 2,
	minStep: 0,
	maxStep: 3
};

const standard: Breakpoint[] = [
	{ id: 'root', name: 'Root', width: 0 },
	{ id: 'tablet', name: 'Tablet', width: 768 },
	{ id: 'desktop', name: 'Desktop', width: 1200 }
];

const fluid: Breakpoint[] = [
	{ id: 'min', name: 'Min', width: 400 },
	{ id: 'max', name: 'Max', width: 1200 }
];

const context = (
	overrides: Partial<SettingContext> = {}
): SettingContext => ({
	type: 'standard',
	breakpoints: standard,
	lanes: (id) => (id === 'a' ? lane : undefined),
	precision: 3,
	...overrides
});

const tag = (placements: Tag['placements'], startsAt = 'root'): Tag => ({
	id: 't',
	name: 'h1',
	startsAt,
	placements
});

describe('settingAt', () => {
	it('uses the largest breakpoint at or below the width', () => {
		const h1 = tag({
			root: { laneId: 'a', step: 1 },
			tablet: { laneId: 'a', step: 2 }
		});

		expect(settingAt(h1, 767, context())?.fontSize).toBe(2);
		expect(settingAt(h1, 768, context())).toMatchObject({
			fontSize: 4,
			lineHeight: 1.2,
			fluid: false
		});
		// desktop inherits tablet
		expect(settingAt(h1, 1400, context())?.fontSize).toBe(4);
	});

	it('is undefined below where the tag starts', () => {
		const h1 = tag({ tablet: { laneId: 'a', step: 2 } }, 'tablet');

		expect(settingAt(h1, 375, context())).toBeUndefined();
	});

	it('only reads the root on static projects', () => {
		const h1 = tag({
			root: { laneId: 'a', step: 1 },
			desktop: { laneId: 'a', step: 3 }
		});

		expect(
			settingAt(h1, 1400, context({ type: 'static' }))?.fontSize
		).toBe(2);
	});

	it('slides fluid sizes between min and max, clamped at the ends', () => {
		const h1 = tag(
			{
				min: { laneId: 'a', step: 1 },
				max: { laneId: 'a', step: 2 }
			},
			'min'
		);
		const fluidContext = context({ type: 'fluid', breakpoints: fluid });

		expect(settingAt(h1, 0, fluidContext)?.fontSize).toBe(2);
		expect(settingAt(h1, 800, fluidContext)).toMatchObject({
			fontSize: 3,
			lineHeight: 1.1,
			fluid: true
		});
		expect(settingAt(h1, 2000, fluidContext)?.fontSize).toBe(4);
	});

	it('holds a fluid size steady when only min is placed', () => {
		const h1 = tag({ min: { laneId: 'a', step: 1 } }, 'min');

		expect(
			settingAt(h1, 800, context({ type: 'fluid', breakpoints: fluid }))
		).toMatchObject({ fontSize: 2, fluid: false });
	});
});
