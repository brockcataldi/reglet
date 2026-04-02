import type { ChangeEvent } from 'react';

import { Flex, Text, TextField } from '@radix-ui/themes';

import { updateOverride, useOverride } from '../project/slices/overrides';

import { useSettingsUnit } from '../project/slices/settings';

type BreakpointCellEditProps = {
	id: string;
	rowIndex: number;
	columnIndex: number;
};

const BreakpointCellEdit = ({
	id,
	rowIndex,
	columnIndex,
}: BreakpointCellEditProps) => {
	const unit = useSettingsUnit();
	const override = useOverride(id, rowIndex, columnIndex);

	if (!override) {
		return;
	}

	const onChangeFontSize = (event: ChangeEvent<HTMLInputElement>) => {
		updateOverride(id, rowIndex, columnIndex, {
			fontSize: parseFloat(event.target.value),
		});
	};

	const onChangeLineHeight = (event: ChangeEvent<HTMLInputElement>) => {
		updateOverride(id, rowIndex, columnIndex, {
			lineHeight: parseFloat(event.target.value),
		});
	};

	return (
		<Flex direction={'row'} gap="3" width={'100%'}>
			<Flex direction={'column'} gap="1" align="start">
				<Text
					as="label"
					htmlFor={`${rowIndex}:${columnIndex}-font-size`}
				>
					Font Size
				</Text>
				<Flex direction={'row'} gap="1" align="center">
					<TextField.Root
						value={override.fontSize}
						id={`${rowIndex}:${columnIndex}-font-size`}
						type="number"
						min={1}
						step={unit === 'px' ? 0.05 : 0.005}
						onChange={onChangeFontSize}
					/>
					<Text>{unit}</Text>
				</Flex>
			</Flex>
			<Flex direction={'column'} gap="1" align="start">
				<Text
					as="label"
					htmlFor={`${rowIndex}:${columnIndex}-line-height`}
				>
					Line Height:
				</Text>
				<TextField.Root
					value={override.lineHeight}
					id={`${rowIndex}:${columnIndex}-line-height`}
					type="number"
					min={1}
					step={0.005}
					onChange={onChangeLineHeight}
				/>
			</Flex>
		</Flex>
	);
};

export default BreakpointCellEdit;
