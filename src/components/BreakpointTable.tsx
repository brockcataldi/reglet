import {
	decrementBound,
	incrementBound,
	useBreakpointBounds,
	useBreakpointTable,
	useBreakpointTextStyles,
} from '../hooks/useProjectStore';

import { Table, IconButton, Flex, Avatar, Tooltip } from '@radix-ui/themes';
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';

import BreakpointCell from './BreakpointCell';
import { suffix } from '../functions';

type BreakpointTableProps = {
	id: string;
};

const BreakpointTable = ({ id }: BreakpointTableProps) => {
	const cells = useBreakpointTable(id);
	const textStyles = useBreakpointTextStyles(id);
	const bounds = useBreakpointBounds(id);

	if (!cells.length) {
		return;
	}

	if (!textStyles) {
		return;
	}

	if (!bounds) {
		return;
	}

	return (
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.ColumnHeaderCell>
						<Tooltip
							content={`Add a ${suffix(bounds.max + 1)} row`}
						>
							<IconButton
								size={'3'}
								onClick={() => {
									console.log('clicked');
									incrementBound(id, 'max');
								}}
							>
								<PlusIcon />
							</IconButton>
						</Tooltip>
					</Table.ColumnHeaderCell>
					{textStyles.map((textStyle, textStyleIndex) => {
						return (
							<Table.ColumnHeaderCell
								key={`${id}-text-style-${textStyleIndex}`}
							>
								{textStyle.fontFamily}
							</Table.ColumnHeaderCell>
						);
					})}
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{cells.map((row, rowIndex) => {
					return (
						<Table.Row key={`${id}-row-${rowIndex}`}>
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
											onClick={() => {
												decrementBound(id, 'max');
											}}
										>
											<MinusIcon />
										</IconButton>
									) : null}

									{rowIndex === cells.length - 1 &&
									bounds.max - rowIndex !== 0 ? (
										<IconButton
											size={'3'}
											color={'red'}
											onClick={() => {
												incrementBound(id, 'min');
											}}
										>
											<MinusIcon />
										</IconButton>
									) : null}
								</Flex>
							</Table.RowHeaderCell>
							{row.map((cell, columnIndex) => {
								return (
									<Table.Cell
										key={`${id}-cell-${rowIndex}-${columnIndex}`}
									>
										<BreakpointCell
											cell={cell}
											id={id}
											rowIndex={bounds.max - rowIndex}
											columnIndex={columnIndex}
										/>
									</Table.Cell>
								);
							})}
						</Table.Row>
					);
				})}
				<Table.Row>
					<Table.ColumnHeaderCell colSpan={textStyles.length + 1}>
						<Tooltip
							content={`Add a ${suffix(bounds.min - 1)} row`}
						>
							<IconButton
								size={'3'}
								onClick={() => {
									decrementBound(id, 'min');
								}}
							>
								<PlusIcon />
							</IconButton>
						</Tooltip>
					</Table.ColumnHeaderCell>
				</Table.Row>
			</Table.Body>
		</Table.Root>
	);
};

export default BreakpointTable;
