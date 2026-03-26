import { Avatar, Code, Flex, IconButton, Table } from '@radix-ui/themes';
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';

import {
	type Bounds,
	type Cell,
	type Override,
	type TextStyle,
	type Unit,
} from '../types';

import BreakpointVisualizeItem from './BreakpointVisalizeItem';

type BreakpointVisualizeProps = {
	unit: Unit;
	overrides: Record<string, Override>;
	bounds: Bounds;
	textStyles: TextStyle[];
	cells: Cell[][];
	onBoundIncrement: (bound: keyof Bounds) => void;
	onBoundDecrement: (bound: keyof Bounds) => void;
	onUnlink: (cell: Cell, rowIndex: number, columnIndex: number) => void;
	onLink: (rowIndex: number, columnIndex: number) => void;
	onOverrideChange: (
		update: Partial<Override>,
		rowIndex: number,
		columnIndex: number
	) => void;
};

const BreakpointVisualize = ({
	unit,
	bounds,
	textStyles,
	cells,
	overrides,
	onBoundIncrement,
	onBoundDecrement,
	onLink,
	onUnlink,
	onOverrideChange,
}: BreakpointVisualizeProps) => {
	return (
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.ColumnHeaderCell>
						<IconButton
							size={'3'}
							onClick={() => onBoundIncrement('max')}
						>
							<PlusIcon />
						</IconButton>
					</Table.ColumnHeaderCell>

					{textStyles.map((textStyle, index) => (
						<Table.ColumnHeaderCell key={`${index}-text-style`}>
							<Code>
								font-family: {textStyle.fontFamily}; font-style:{' '}
								{textStyle.fontWeight}; font-weight:{' '}
								{textStyle.fontStyle};
							</Code>
						</Table.ColumnHeaderCell>
					))}
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{cells.map((row, rowIndex) => (
					<Table.Row key={`breakpoint-item-${rowIndex}`}>
						<Table.RowHeaderCell>
							<Flex direction={'column'} gap={'2'}>
								<Avatar
									size={'3'}
									fallback={bounds.max - rowIndex}
								/>
								{rowIndex === 0 &&
								bounds.max - rowIndex !== 0 ? (
									<IconButton
										size={'3'}
										color={'red'}
										onClick={() => onBoundDecrement('max')}
									>
										<MinusIcon />
									</IconButton>
								) : null}

								{rowIndex === cells.length - 1 &&
								bounds.max - rowIndex !== 0 ? (
									<IconButton
										size={'3'}
										color={'red'}
										onClick={() => onBoundIncrement('min')}
									>
										<MinusIcon />
									</IconButton>
								) : null}
							</Flex>
						</Table.RowHeaderCell>
						{row.map((cell, columnIndex) => (
							<Table.Cell
								key={`${bounds.max - rowIndex}:${columnIndex}-cell`}
							>
								<BreakpointVisualizeItem
									override={
										overrides[
											`${bounds.max - rowIndex}:${columnIndex}`
										]
									}
									unit={unit}
									cell={cell}
									rowIndex={bounds.max - rowIndex}
									columnIndex={columnIndex}
									onOverrideChange={onOverrideChange}
									onLink={onLink}
									onUnlink={onUnlink}
								/>
							</Table.Cell>
						))}
					</Table.Row>
				))}
				<Table.Row>
					<Table.ColumnHeaderCell>
						<IconButton
							size={'3'}
							onClick={() => onBoundDecrement('min')}
						>
							<PlusIcon />
						</IconButton>
					</Table.ColumnHeaderCell>
				</Table.Row>
			</Table.Body>
		</Table.Root>
	);
};

export default BreakpointVisualize;
