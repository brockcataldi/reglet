import { Flex, Avatar, ChevronDownIcon } from '@radix-ui/themes';
import { ChevronUpIcon } from '@radix-ui/react-icons';

import { type Bounds, type Values } from '@/project/types';
import { decrementBound, incrementBound } from '@/project/actions';
import { suffix } from '@/project/helpers';

import DescriptiveIconButton from '@/components/ui/DescriptiveIconButton';

import Cell from './Cell';

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
		<tr className="canvas__row">
			<th className="canvas__cell canvas__cell--actions">
				<Flex direction="column" gap="2">
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

					<Avatar size="3" fallback={bounds.max - index} />

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
			</th>
			{row.map((cell, columnIndex) => (
				<Cell
					key={`${id}-cell-${index}-${columnIndex}`}
					values={cell}
					id={id}
					rowIndex={bounds.max - index}
					columnIndex={columnIndex}
				/>
			))}
		</tr>
	);
};

export default Row;
