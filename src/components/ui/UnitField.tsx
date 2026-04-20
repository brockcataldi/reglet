import type { ChangeEvent } from 'react';

import { Flex, Text, TextField } from '@radix-ui/themes';

import { useSettingsUnit } from '@/project/hooks';

type UnitFieldProps = {
	id: string;
	value: number;
	onChange: (newValue: number) => void;
};

const UnitField = ({ id, value, onChange }: UnitFieldProps) => {
	const unit = useSettingsUnit();

	const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
		onChange(parseFloat(event.target.value));
	};

	return (
		<Flex direction="row" gap="1" align="center">
			<TextField.Root
				value={value}
				id={id}
				type="number"
				min={1}
				step={unit === 'rem' ? 0.005 : 0.05}
				onChange={onChangeValue}
			/>
			<Text>{unit}</Text>
		</Flex>
	);
};
export default UnitField;
