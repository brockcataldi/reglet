import type { ChangeEvent } from 'react';
import { Box, Button, Card, Flex, Text, TextField } from '@radix-ui/themes';

import { Link1Icon, LinkBreak1Icon } from '@radix-ui/react-icons';

import { type Values } from '@/project/types';

import { useOverride, useSettingsUnit } from '@/project/hooks';

import {
	disableOverride,
	enableOverride,
	updateOverride,
} from '@/project/actions';

import UnitField from '$/ui/UnitField';
import Display from '$/ui/Display';

type EditProps = {
	id: string;
	rowIndex: number;
	columnIndex: number;
};

const Edit = ({ id, rowIndex, columnIndex }: EditProps) => {
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
				<Flex direction={'column'} align="start">
					<Text
						size={'2'}
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

				<Flex direction={'column'} align="start">
					<Text
						size={'2'}
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

type DetailsProps = {
	values: Values;
	id: string;
	rowIndex: number;
	columnIndex: number;
};

const Details = ({ values, id, rowIndex, columnIndex }: DetailsProps) => {
	const unit = useSettingsUnit();

	const onClickUnlink = () => {
		enableOverride(id, rowIndex, columnIndex);
	};

	return (
		<Flex
			direction={'row'}
			width={'100%'}
			align={'end'}
			justify={'between'}
		>
			<Flex
				direction={'row'}
				width={'100%'}
				align={'end'}
				justify={'start'}
				gap={'6'}
			>
				<Flex direction={'column'} align="start">
					<Text size={'2'} as="p">
						Font Size
					</Text>
					<Text as="p" weight={'bold'}>
						{values.fontSize} {unit}
					</Text>
				</Flex>
				<Flex direction={'column'} align="start">
					<Text size={'2'} as="p">
						Line Height
					</Text>
					<Text as="p" weight={'bold'}>
						{values.lineHeight}
					</Text>
				</Flex>
			</Flex>

			<Button onClick={onClickUnlink}>
				<LinkBreak1Icon /> Unlink
			</Button>
		</Flex>
	);
};

type CellProps = {
	values: Values;
	id: string;
	rowIndex: number;
	columnIndex: number;
};

const Cell = ({ values, id, rowIndex, columnIndex }: CellProps) => {
	const override = useOverride(id, rowIndex, columnIndex);

	return (
		<Box width={'500px'}>
			<Card>
				<Flex gap={'2'} align={'start'} direction={'column'}>
					<Display
						type="values"
						value={values}
						defaultType={
							values.lineHeight === 1.5 ? 'paragraph' : 'heading'
						}
					/>

					{override === undefined ? (
						<Details
							values={values}
							id={id}
							rowIndex={rowIndex}
							columnIndex={columnIndex}
						/>
					) : (
						<Edit
							id={id}
							rowIndex={rowIndex}
							columnIndex={columnIndex}
						/>
					)}
				</Flex>
			</Card>
		</Box>
	);
};

export default Cell;
