import { TextField, Select, Flex, Text } from '@radix-ui/themes';
import type { Unit, ValueWithUnit } from '../../types';
import type { ChangeEvent } from 'react';

type UnitFieldProps = {
	label: string;
	value: ValueWithUnit;
	onChange: (newValue: ValueWithUnit) => void;
};

const UnitField = ({ label, value, onChange }: UnitFieldProps) => {
	return (
		<Flex direction={'column'} gapY={'1'}>
			<Text>{label}</Text>
			<Flex direction={'row'} gapX={'1'}>
				<TextField.Root
					type="number"
					value={value.value}
					onChange={(event: ChangeEvent<HTMLInputElement>) => {
						const next = parseFloat(event.target.value);
						if (!Number.isNaN(next)) {
							onChange({
								...value,
								value: next,
							});
						}
					}}
				></TextField.Root>
				<Select.Root
					value={value.unit}
					onValueChange={(selected: string) => {
						onChange({ ...value, unit: selected as Unit });
					}}
				>
					<Select.Trigger />
					<Select.Content>
						<Select.Item value="px">px</Select.Item>
						<Select.Item value="rem">rem</Select.Item>
						<Select.Item value="em">em</Select.Item>
					</Select.Content>
				</Select.Root>
			</Flex>
		</Flex>
	);
};

export default UnitField;
