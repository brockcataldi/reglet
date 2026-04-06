import { Button, Flex, Text } from '@radix-ui/themes';

import type { Cell } from '../project/types';

import { useSettingsUnit } from '../project/slices/settings';
import { LinkBreak1Icon } from '@radix-ui/react-icons';
import { enableOverride } from '../project/slices/overrides';

type BreakpointCellDetailsProps = {
	cell: Cell;
	id: number;
	rowIndex: number;
	columnIndex: number;
};

const BreakpointCellDetails = ({
	cell,
	id,
	rowIndex,
	columnIndex,
}: BreakpointCellDetailsProps) => {
	const unit = useSettingsUnit();

	const onClickUnlink = () => {
		enableOverride(id, rowIndex, columnIndex);
	};

	return (
		<Flex
			direction={'row'}
			width={'100%'}
			align={'end'}
			justify={'between'}
		>
			<Flex
				direction={'row'}
				width={'100%'}
				align={'end'}
				justify={'start'}
				gap={'6'}
			>
				<Flex direction={'column'} align="start">
					<Text size={'2'} as="p">
						Font Size
					</Text>
					<Text as="p" weight={'bold'}>
						{cell.fontSize} {unit}
					</Text>
				</Flex>
				<Flex direction={'column'} align="start">
					<Text size={'2'} as="p">
						Line Height
					</Text>
					<Text as="p" weight={'bold'}>
						{cell.lineHeight}
					</Text>
				</Flex>
			</Flex>

			<Button onClick={onClickUnlink}>
				<LinkBreak1Icon /> Unlink
			</Button>
		</Flex>
	);
};

export default BreakpointCellDetails;
