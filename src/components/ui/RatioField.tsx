import { Text, Select, TextField, Button, Flex } from '@radix-ui/themes';
import { useState, type ChangeEvent } from 'react';

const RATIOS: [number, string][] = [
	[1.067, 'Minor Second'],
	[1.125, 'Major Second'],
	[1.2, 'Minor Third'],
	[1.25, 'Major Third'],
	[1.333, 'Perfect Fourth'],
	[1.414, 'Augmented Fourth (Tritone)'],
	[1.5, 'Perfect Fifth'],
	[1.618, 'Golden Ratio'],
	[1.667, 'Minor Sixth'],
	[1.778, 'Major Sixth'],
	[1.875, 'Minor Seventh'],
	[2, 'Octave'],
];

type RatioFieldProps = {
	id: string;
	label: string;
	value: number;
	onChange: (newValue: number) => void;
};

const RatioField = ({ id, label, value, onChange }: RatioFieldProps) => {
	const [isManual, setIsManual] = useState(false);

	const matchedRatio = RATIOS.find(
		([ratio]) => Math.abs(ratio - value) < 1e-6
	);

	const showCustomInput = isManual || !matchedRatio;
	const selectValue =
		matchedRatio && !isManual ? matchedRatio[0].toString() : 'custom';

	return (
		<Flex direction={'column'} gapY={'1'}>
			<Text size={'2'} as={'label'} htmlFor={id}>
				{label}
			</Text>

			{showCustomInput ? (
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
			) : (
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
			)}
		</Flex>
	);
};

export default RatioField;
