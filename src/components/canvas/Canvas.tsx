import { useState } from 'react';

import {
	Table,
	Flex,
	Avatar,
	Box,
	VisuallyHidden,
	Heading,
	Card,
	Button,
} from '@radix-ui/themes';

import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';

import {
	useBounds,
	useBreakpointTable,
	useStyles,
	useStylesLength,
	addStyle,
	decrementBound,
	incrementBound,
	createDefaultTextStyle,
	suffix,
	type Style,
	type Bounds,
	type Values,
} from '@/project';

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

	return (
		<Box width={'500px'} height={'100%'}>
			<Card>
				<Heading as="h2" mb={'4'}>
					Add Another Text Style
				</Heading>
				<StyleEdit
					value={value}
					onChange={(newValue) => setValue(newValue)}
				/>
				<Flex>
					<Button onClick={onClickAdd}>Add Style</Button>
				</Flex>
			</Card>
		</Box>
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

	const deleteAction = isTopRow
		? {
				content: `Delete the ${suffix(bounds.max)} row`,
				onClick: () => decrementBound(id, 'max'),
			}
		: isBottomRow
			? {
					content: `Delete the ${suffix(bounds.min)} row`,
					onClick: () => incrementBound(id, 'min'),
				}
			: null;

	return (
		<Table.Row>
			<Table.RowHeaderCell>
				<Flex direction={'column'} gap={'2'}>
					<Avatar size={'3'} fallback={bounds.max - index} />

					{canDelete && deleteAction && (
						<DescriptiveIconButton
							content={deleteAction.content}
							color="red"
							size="3"
							onClick={deleteAction.onClick}
						>
							<MinusIcon />
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

			{index === 0 ? (
				<Table.Cell rowSpan={length}>
					<Add />
				</Table.Cell>
			) : null}
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
		<Table.Root style={{ overflowX: 'visible' }}>
			<Table.Header>
				<Table.Row>
					<Table.ColumnHeaderCell width={'40px'}>
						<Flex
							direction="column"
							align="center"
							justify="center"
							height="100%"
						>
							<DescriptiveIconButton
								content={`Add a ${suffix(bounds.max + 1)} row`}
								size={'3'}
								onClick={() => {
									incrementBound(id, 'max');
								}}
							>
								<PlusIcon />
							</DescriptiveIconButton>
						</Flex>
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
				<Table.Row>
					<Table.Cell colSpan={stylesLength + 2}>
						<DescriptiveIconButton
							content={`Add a ${suffix(bounds.min - 1)} row`}
							size={'3'}
							onClick={() => {
								decrementBound(id, 'min');
							}}
						>
							<PlusIcon />
						</DescriptiveIconButton>
					</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table.Root>
	);
};

export default Canvas;
