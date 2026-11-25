import { toFontVariationSettings } from '#lib/domain/fonts/to-font-variation-settings.js';

import type { Setting } from './setting-at';

/** Inline styles for a setting, in the project's units. */
export const toSettingStyle = (
	setting: Setting | undefined,
	fontSizeUnit: string,
	letterSpacingUnit: string
) =>
	setting
		? [
				`font-family: ${setting.lane.family}`,
				`font-weight: ${setting.lane.weight}`,
				`font-style: ${setting.lane.style}`,
				`font-variation-settings: ${toFontVariationSettings(setting.lane.variationSettings) ?? 'normal'}`,
				`font-size: ${setting.fontSize}${fontSizeUnit}`,
				`line-height: ${setting.lineHeight}`,
				`letter-spacing: ${setting.letterSpacing}${letterSpacingUnit}`
			].join('; ')
		: '';
