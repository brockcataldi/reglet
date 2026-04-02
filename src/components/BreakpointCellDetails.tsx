import { Flex, Text } from '@radix-ui/themes';

import type { Cell } from '../project/types';

import { useSettingsUnit } from '../project/slices/settings';

type BreakpointCellDetailsProps = {
	cell: Cell;
};

const BreakpointCellDetails = ({ cell }: BreakpointCellDetailsProps) => {
	const unit = useSettingsUnit();

	return (
		<Flex direction={'row'} gap="6" width={'100%'}>
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
	);
};

export default BreakpointCellDetails;
