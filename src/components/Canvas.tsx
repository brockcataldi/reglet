import { Table, IconButton, Flex, Avatar, Tooltip } from '@radix-ui/themes';
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';

import {
	decrementBound,
	incrementBound,
	useBounds,
} from '../project/slices/bounds';
import { useBreakpointTable } from '../project/slices/breakpoint';
import { useStylesLength } from '../project/slices/styles';
import { suffix } from '../project/helpers';

import CanvasCell from './CanvasCell';
import CanvasHeader from './CanvasHeader';

type CanvasProps = {
	id: string;
};

const Canvas = ({ id }: CanvasProps) => {
	const cells = useBreakpointTable(id);
	const stylesLength = useStylesLength();
	const bounds = useBounds(id);

	if (!cells.length) {
		return;
	}

	if (!bounds) {
		return;
	}

	return (
		<Table.Root>
			<CanvasHeader id={id} />
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
										<CanvasCell
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
					<Table.ColumnHeaderCell colSpan={stylesLength + 1}>
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

export default Canvas;
