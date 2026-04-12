import { useState } from 'react';

import {
	Table,
	Flex,
	Avatar,
	VisuallyHidden,
	Button,
	ChevronDownIcon,
	Dialog,
} from '@radix-ui/themes';

import { ChevronUpIcon, PlusIcon } from '@radix-ui/react-icons';

import { type Style, type Bounds, type Values } from '@/project/types';

import {
	useBounds,
	useBreakpointTable,
	useStyles,
	useStylesLength,
} from '@/project/hooks';

import { addStyle, decrementBound, incrementBound } from '@/project/actions';

import { createDefaultTextStyle } from '@/project/creators';

import { suffix } from '@/project/helpers';

import DescriptiveIconButton from '$/ui/DescriptiveIconButton';

import Cell from './Cell';
import HeaderCell from './HeaderCell';
import StyleEdit from './StyleEdit';

const Add = () => {
	const [value, setValue] = useState<Style>(createDefaultTextStyle());

	const onClickAdd = () => {
		addStyle(value);
		setValue(createDefaultTextStyle());
	};

	const onClickCancel = () => {
		setValue(createDefaultTextStyle());
	};

	return (
		<Dialog.Root>
			<Dialog.Trigger>
				<DescriptiveIconButton content="Add Text Style" size={'3'}>
					<PlusIcon />
				</DescriptiveIconButton>
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Title>Add Text Style</Dialog.Title>

				<StyleEdit
					value={value}
					onChange={(newValue) => setValue(newValue)}
				/>

				<Flex
					direction={'row'}
					gap={'2'}
					align={'center'}
					justify={'end'}
					mt={'4'}
				>
					<Dialog.Close>
						<Button onClick={onClickAdd}>Add</Button>
					</Dialog.Close>
					<Dialog.Close>
						<Button
							variant="soft"
							color="gray"
							onClick={onClickCancel}
						>
							Cancel
						</Button>
					</Dialog.Close>
				</Flex>
			</Dialog.Content>
		</Dialog.Root>
	);
};

type RowProps = {
	row: Values[];
	length: number;
	bounds: Bounds;
	id: string;
	index: number;
};

const Row = ({ id, bounds, index, row, length }: RowProps) => {
	const rowNumber = bounds.max - index;
	const isTopRow = index === 0;
	const isBottomRow = index === length - 1;
	const canDelete = rowNumber !== 0;

	return (
		<Table.Row>
			<Table.RowHeaderCell>
				<Flex direction={'column'} gap={'2'}>
					{isTopRow && (
						<DescriptiveIconButton
							content={`Add a ${suffix(bounds.max + 1)} row`}
							size="3"
							onClick={() => incrementBound(id, 'max')}
						>
							<ChevronUpIcon />
						</DescriptiveIconButton>
					)}

					{canDelete && isBottomRow && (
						<DescriptiveIconButton
							content={`Delete the ${suffix(bounds.min)} row`}
							color="red"
							size="3"
							onClick={() => incrementBound(id, 'min')}
						>
							<ChevronUpIcon />
						</DescriptiveIconButton>
					)}

					<Avatar size={'3'} fallback={bounds.max - index} />

					{isBottomRow && (
						<DescriptiveIconButton
							content={`Add a ${suffix(bounds.min - 1)} row`}
							size="3"
							onClick={() => decrementBound(id, 'min')}
						>
							<ChevronDownIcon />
						</DescriptiveIconButton>
					)}

					{canDelete && isTopRow && (
						<DescriptiveIconButton
							content={`Delete the ${suffix(bounds.max)} row`}
							color="red"
							size="3"
							onClick={() => decrementBound(id, 'max')}
						>
							<ChevronDownIcon />
						</DescriptiveIconButton>
					)}
				</Flex>
			</Table.RowHeaderCell>
			{row.map((cell, columnIndex) => {
				return (
					<Table.Cell key={`${id}-cell-${index}-${columnIndex}`}>
						<Cell
							values={cell}
							id={id}
							rowIndex={bounds.max - index}
							columnIndex={columnIndex}
						/>
					</Table.Cell>
				);
			})}
		</Table.Row>
	);
};

type CanvasProps = {
	id: string;
};

const Canvas = ({ id }: CanvasProps) => {
	const styles = useStyles();
	const stylesLength = useStylesLength();
	const values = useBreakpointTable(id);
	const bounds = useBounds(id);

	const length = values.length;

	if (!values.length) {
		return;
	}

	if (!bounds) {
		return;
	}

	return (
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.ColumnHeaderCell width={'40px'}>
						<VisuallyHidden>Row Actions</VisuallyHidden>

						<Add />
					</Table.ColumnHeaderCell>
					{styles.map((style, index) => (
						<Table.ColumnHeaderCell
							width={'500px'}
							key={`${id}-text-style-${index}`}
						>
							<HeaderCell style={style} length={stylesLength} />
						</Table.ColumnHeaderCell>
					))}
					<Table.ColumnHeaderCell width={'500px'}>
						<VisuallyHidden>
							Add another text style column
						</VisuallyHidden>
					</Table.ColumnHeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{values.map((row, index) => (
					<Row
						key={`${id}-row-${index}`}
						id={id}
						row={row}
						bounds={bounds}
						length={length}
						index={index}
					/>
				))}
			</Table.Body>
		</Table.Root>
	);
};

export default Canvas;
