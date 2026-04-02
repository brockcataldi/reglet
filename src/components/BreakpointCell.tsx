import { Box, Button, Card, Flex, Separator } from '@radix-ui/themes';
import { Link1Icon, LinkBreak1Icon } from '@radix-ui/react-icons';

import type { Cell } from '../project/types';

import {
	disableOverride,
	enableOverride,
	useOverride,
} from '../project/slices/overrides';

import { useSettingsUnit } from '../project/slices/settings';
import BreakpointCellEdit from './BreakpointCellEdit';
import BreakpointCellDetails from './BreakpointCellDetails';

type BreakpointCellProps = {
	cell: Cell;
	id: string;
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

	const onClickUnlink = () => {
		enableOverride(id, rowIndex, columnIndex);
	};

	const onClickLink = () => {
		disableOverride(id, rowIndex, columnIndex);
	};

	return (
		<Box width={'500px'}>
			<Card>
				<Flex gap={'2'} align={'start'} direction={'column'}>
					<Flex
						width={'100%'}
						direction={'row'}
						align={'center'}
						justify={'between'}
					>
						<span></span>
						{/* <Badge size={'2'}>Demo</Badge> */}

						{override === undefined ? (
							<Button onClick={onClickUnlink}>
								<LinkBreak1Icon /> Unlink
							</Button>
						) : (
							<Button onClick={onClickLink}>
								<Link1Icon /> Link
							</Button>
						)}
					</Flex>

					<Separator size={'4'} orientation={'horizontal'} />

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
						<BreakpointCellDetails cell={cell} />
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
