import { useState, type ChangeEvent } from 'react';

import { RATIOS } from '@/project/constants';
import { TextBox } from './TextBox';
import { Button } from './Buttons';
import { Select } from './Select';
import { Select as SelectPrimitive } from 'radix-ui';

type RatioFieldProps = {
	id: string;
	value: number;
	onChange: (newValue: number) => void;
};

const RatioField = ({ id, value, onChange }: RatioFieldProps) => {
	const [isManual, setIsManual] = useState(false);

	const matchedRatio = RATIOS.find(
		([ratio]) => Math.abs(ratio - value) < 1e-6
	);

	const showCustomInput = isManual || !matchedRatio;
	const selectValue =
		matchedRatio && !isManual ? matchedRatio[0].toString() : 'custom';

	if (showCustomInput) {
		return (
			<div className="flex flex-row gap-2">
				<TextBox
					id={id}
					type="number"
					min={1}
					step={0.01}
					value={value}
					onChange={(event: ChangeEvent<HTMLInputElement>) => {
						const val = parseFloat(event.target.value);
						if (!isNaN(val)) {
							onChange(val);
						}
					}}
				></TextBox>
				<Button
					onClick={() => {
						setIsManual(false);
						onChange(1.2);
					}}
				>
					Back to Presets
				</Button>
			</div>
		);
	}

	return (
		<Select
			value={selectValue}
			onValueChange={(newValue) => {
				if (newValue === 'custom') {
					setIsManual(true);
				} else {
					setIsManual(false);
					onChange(parseFloat(newValue));
				}
			}}
		>
			<SelectPrimitive.Item value="custom">Custom</SelectPrimitive.Item>
			<SelectPrimitive.Separator />
			{RATIOS.map(([ratioValue, ratioLabel]) => (
				<SelectPrimitive.Item
					value={ratioValue.toString()}
					key={`ratio-${ratioValue}`}
				>
					{ratioValue} - {ratioLabel}
				</SelectPrimitive.Item>
			))}
		</Select>
	);
};

export default RatioField;
