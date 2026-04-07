import type { ChangeEvent } from 'react';

import { Button, Flex, Text, TextField } from '@radix-ui/themes';
import { Link1Icon } from '@radix-ui/react-icons';

import {
	disableOverride,
	updateOverride,
	useOverride,
} from '../project/slices/overrides';

import UnitField from './ui/UnitField';

type CanvasCellEditProps = {
	id: string;
	rowIndex: number;
	columnIndex: number;
};

const CanvasCellEdit = ({ id, rowIndex, columnIndex }: CanvasCellEditProps) => {
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
			direction={'row'}
			gap="3"
			width={'100%'}
			align={'end'}
			justify={'between'}
		>
			<Flex
				direction={'row'}
				gap="3"
				width={'100%'}
				align={'end'}
				justify={'start'}
			>
				<UnitField
					id={`${rowIndex}:${columnIndex}-font-size`}
					label="Font Size"
					value={override.fontSize}
					onChange={onChangeFontSize}
				/>

				<Flex direction={'column'} align="start">
					<Text
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

export default CanvasCellEdit;
