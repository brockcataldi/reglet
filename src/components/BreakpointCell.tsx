import { Box, Card, Flex, Separator } from '@radix-ui/themes';

import type { Cell } from '../project/types';

import { useOverride } from '../project/slices/overrides';

import { useSettingsUnit } from '../project/slices/settings';
import BreakpointCellEdit from './BreakpointCellEdit';
import BreakpointCellDetails from './BreakpointCellDetails';

type BreakpointCellProps = {
	cell: Cell;
	id: number;
	rowIndex: number;
	columnIndex: number;
};

const BreakpointCell = ({
	cell,
	id,
	rowIndex,
	columnIndex,
}: BreakpointCellProps) => {
	const unit = useSettingsUnit();
	const override = useOverride(id, rowIndex, columnIndex);

	return (
		<Box width={'500px'}>
			<Card>
				<Flex gap={'2'} align={'start'} direction={'column'}>
					<p
						style={{
							fontFamily: cell.fontFamily,
							fontStyle: cell.fontStyle,
							fontWeight: cell.fontWeight,
							fontSize: `${cell.fontSize}${unit}`,
							lineHeight: cell.lineHeight,
							margin: '0',
							whiteSpace: 'nowrap',
							width: '100%',
							overflow: 'hidden',
						}}
					>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
					</p>

					<Separator size={'4'} orientation={'horizontal'} />

					{override === undefined ? (
						<BreakpointCellDetails
							cell={cell}
							id={id}
							rowIndex={rowIndex}
							columnIndex={columnIndex}
						/>
					) : (
						<BreakpointCellEdit
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

export default BreakpointCell;
