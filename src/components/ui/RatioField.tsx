import { Text, Select, TextField, Button, Flex } from '@radix-ui/themes';
import { useEffect, useState, type ChangeEvent } from 'react';

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
	label: string;
	value: number;
	onChange: (newValue: number) => void;
};

const RatioField = ({ label, value, onChange }: RatioFieldProps) => {
	const [internalValue, setInternalValue] = useState<string>(
		RATIOS.some(([ratio]) => Math.abs(ratio - value) < 1e-6)
			? value.toString()
			: 'custom'
	);

	useEffect(() => {
		const asString = value.toString();
		setInternalValue(
			RATIOS.some(([ratio]) => Math.abs(ratio - value) < 1e-6)
				? asString
				: 'custom'
		);
	}, [value]);

	return (
		<Flex direction={'column'} gapY={'1'}>
			<Text>{label}</Text>

			{internalValue === 'custom' ? (
				<Flex direction={'row'} gap="1">
					<TextField.Root
						type="number"
						min={1}
						step={0.01}
						value={value}
						onChange={(event: ChangeEvent<HTMLInputElement>) => {
							onChange(parseFloat(event.target.value));
						}}
					></TextField.Root>
					<Button
						onClick={() => {
							onChange(1.2);
							setInternalValue('1.2');
						}}
					>
						Reset Ratio
					</Button>
				</Flex>
			) : (
				<Select.Root
					value={internalValue}
					onValueChange={(newValue) => {
						if (newValue !== 'custom') {
							onChange(parseFloat(newValue));
						}
						setInternalValue(newValue);
					}}
				>
					<Select.Trigger />
					<Select.Content>
						<Select.Item value={'custom'}>Custom</Select.Item>
						{RATIOS.map(([ratioValue, ratioLabel]) => {
							return (
								<Select.Item
									value={ratioValue.toString()}
									key={`ratio-${ratioValue}`}
								>
									{ratioValue} - {ratioLabel}
								</Select.Item>
							);
						})}
					</Select.Content>
				</Select.Root>
			)}
		</Flex>
	);
};

export default RatioField;
