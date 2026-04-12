import { Select, TextField, Button, Flex } from '@radix-ui/themes';
import { useState, type ChangeEvent } from 'react';

import { RATIOS } from '@/project/constants';

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
			<Flex direction={'row'} gap="1">
				<TextField.Root
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
				></TextField.Root>
				<Button
					onClick={() => {
						setIsManual(false);
						onChange(1.2);
					}}
				>
					Back to Presets
				</Button>
			</Flex>
		);
	}

	return (
		<Select.Root
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
			<Select.Trigger id={id} />
			<Select.Content>
				<Select.Item value={'custom'}>Custom</Select.Item>
				<Select.Separator />
				{RATIOS.map(([ratioValue, ratioLabel]) => (
					<Select.Item
						value={ratioValue.toString()}
						key={`ratio-${ratioValue}`}
					>
						{ratioValue} - {ratioLabel}
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	);
};

export default RatioField;
