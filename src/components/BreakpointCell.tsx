import {
	Badge,
	Box,
	Button,
	Card,
	Flex,
	Text,
	TextField,
} from '@radix-ui/themes';
import { Link1Icon, LinkBreak1Icon } from '@radix-ui/react-icons';

import type { Cell } from '../types';
import { useOverride, useSettingsUnit } from '../hooks/useProjectStore';

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
						<Badge size={'2'}>Demo</Badge>

						{override === undefined ? (
							<Button>
								<LinkBreak1Icon /> Unlink
							</Button>
						) : (
							<Button>
								<Link1Icon /> Link
							</Button>
						)}
					</Flex>
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

					{override === undefined ? (
						<Flex direction={'row'} gap="2" width={'100%'}>
							<Text>
								Font Size: {cell.fontSize}
								{unit}
							</Text>
							<Text>Line Height: {cell.lineHeight}</Text>
						</Flex>
					) : (
						<Flex direction={'column'} gap="2" width={'100%'}>
							<Flex direction={'row'} gap="1" align="center">
								<Text
									as="label"
									htmlFor={`${rowIndex}:${columnIndex}-font-size`}
								>
									Font Size:
								</Text>
								<TextField.Root
									value={override.fontSize}
									id={`${rowIndex}:${columnIndex}-font-size`}
									type="number"
									min={1}
									step={unit === 'px' ? 0.05 : 0.005}
								/>
								<Text>{unit}</Text>
							</Flex>
							<Flex direction={'row'} gap="1" align="center">
								<Text
									as="label"
									htmlFor={`${rowIndex}:${columnIndex}-line-height`}
								>
									Line Height:
								</Text>
								<TextField.Root
									value={override.lineHeight}
									id={`${rowIndex}:${columnIndex}-line-height`}
									type="number"
									min={1}
									step={0.005}
								/>
							</Flex>
						</Flex>
					)}
				</Flex>
			</Card>
		</Box>
	);
};

export default BreakpointCell;
