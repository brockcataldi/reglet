import {
	Table,
	Flex,
	Avatar,
	Box,
	VisuallyHidden,
	Heading,
	Card,
} from '@radix-ui/themes';
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';

import type { Bounds, Values } from '../../project/types';

import {
	decrementBound,
	incrementBound,
	useBounds,
} from '../../project/slices/bounds';
import { useBreakpointTable } from '../../project/slices/breakpoint';
import { useStyles, useStylesLength } from '../../project/slices/styles';
import { suffix } from '../../project/helpers';

import DescriptiveIconButton from '../ui/DescriptiveIconButton';
import Cell from './Cell';
import HeaderCell from './HeaderCell';
import S from './S';

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
					<Box
						width={'500px'}
						height={'100%'}
						position={'sticky'}
						top={'58px'}
						left={'0px'}
					>
						<Card>
							<Heading as="h2" mb={'4'}>
								Add Another Text Style
							</Heading>
							<S
								style={{
									id: crypto.randomUUID(),
									fontFamily: 'Arial',
									fontStyle: 'normal',
									fontWeight: '400',
								}}
							/>
						</Card>
					</Box>
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
	const values = useBreakpointTable(id);
	const stylesLength = useStylesLength();
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
						<DescriptiveIconButton
							content={`Add a ${suffix(bounds.max + 1)} row`}
							size={'3'}
							onClick={() => {
								incrementBound(id, 'max');
							}}
						>
							<PlusIcon />
						</DescriptiveIconButton>
					</Table.ColumnHeaderCell>
					{styles.map((style, index) => (
						<Table.ColumnHeaderCell
							width={'500px'}
							key={`${id}-text-style-${index}`}
						>
							<HeaderCell style={style} />
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
