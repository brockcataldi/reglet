import { Box, Card, Flex, Separator } from '@radix-ui/themes';

import type { Cell } from '../project/types';

import { useOverride } from '../project/slices/overrides';

import { useSettingsUnit } from '../project/slices/settings';
import CanvasCellEdit from './CanvasCellEdit';
import CanvasCellDetails from './CanvasCellDetails';

type CanvasCellProps = {
	cell: Cell;
	id: string;
	rowIndex: number;
	columnIndex: number;
};

const CanvasCell = ({ cell, id, rowIndex, columnIndex }: CanvasCellProps) => {
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
						<CanvasCellDetails
							cell={cell}
							id={id}
							rowIndex={rowIndex}
							columnIndex={columnIndex}
						/>
					) : (
						<CanvasCellEdit
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

export default CanvasCell;
