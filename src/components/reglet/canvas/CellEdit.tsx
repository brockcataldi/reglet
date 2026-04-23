import type { ChangeEvent } from 'react';
import { Flex, TextField, Text, Button } from '@radix-ui/themes';
import { Link1Icon } from '@radix-ui/react-icons';

import { disableOverride, updateOverride } from '@/project/actions';
import { useOverride } from '@/project/hooks';

import UnitField from '@/components/ui/UnitField';

type CellEditProps = {
	id: string;
	rowIndex: number;
	columnIndex: number;
};

const CellEdit = ({ id, rowIndex, columnIndex }: CellEditProps) => {
	const override = useOverride(id, rowIndex, columnIndex);

	if (!override) {
		return;
	}

	const onChangeFontSize = (newValue: number) => {
		updateOverride(id, rowIndex, columnIndex, {
			fontSize: newValue,
		});
	};

	const onChangeLineHeight = (event: ChangeEvent<HTMLInputElement>) => {
		updateOverride(id, rowIndex, columnIndex, {
			lineHeight: parseFloat(event.target.value),
		});
	};

	const onClickLink = () => {
		disableOverride(id, rowIndex, columnIndex);
	};

	return (
		<Flex
			direction="row"
			gap="3"
			width="100%"
			align="end"
			justify="between"
		>
			<Flex
				direction="row"
				gap="3"
				width="100%"
				align="end"
				justify="start"
			>
				<Flex direction="column" align="start">
					<Text
						size="2"
						as="label"
						htmlFor={`${rowIndex}:${columnIndex}-font-size`}
					>
						Font Size
					</Text>
					<UnitField
						id={`${rowIndex}:${columnIndex}-font-size`}
						value={override.fontSize}
						onChange={onChangeFontSize}
					/>
				</Flex>

				<Flex direction="column" align="start">
					<Text
						size="2"
						as="label"
						htmlFor={`${rowIndex}:${columnIndex}-line-height`}
					>
						Line Height
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

			<Button onClick={onClickLink}>
				<Link1Icon /> Link
			</Button>
		</Flex>
	);
};

export default CellEdit;
