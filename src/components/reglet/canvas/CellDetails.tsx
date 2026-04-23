import { Button, Flex, Text } from '@radix-ui/themes';

import { LinkBreak1Icon } from '@radix-ui/react-icons';

import { type Values } from '@/project/types';
import { useSettingsUnit } from '@/project/hooks';
import { enableOverride } from '@/project/actions';

type CellDetailsProps = {
	values: Values;
	id: string;
	rowIndex: number;
	columnIndex: number;
};

const CellDetails = ({
	values,
	id,
	rowIndex,
	columnIndex,
}: CellDetailsProps) => {
	const unit = useSettingsUnit();

	const onClickUnlink = () => {
		enableOverride(id, rowIndex, columnIndex);
	};

	return (
		<Flex direction="row" width="100%" align="end" justify="between">
			<Flex
				direction="row"
				width="100%"
				align="end"
				justify="start"
				gap="6"
			>
				<Flex direction="column" align="start">
					<Text size="2" as="p">
						Font Size
					</Text>
					<Text as="p" weight="bold">
						{values.fontSize} {unit}
					</Text>
				</Flex>
				<Flex direction="column" align="start">
					<Text size="2" as="p">
						Line Height
					</Text>
					<Text as="p" weight="bold">
						{values.lineHeight}
					</Text>
				</Flex>
			</Flex>

			<Button onClick={onClickUnlink}>
				<LinkBreak1Icon /> Unlink
			</Button>
		</Flex>
	);
};

export default CellDetails;
