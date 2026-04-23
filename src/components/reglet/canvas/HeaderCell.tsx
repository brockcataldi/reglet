import { Flex, Card, Text, Button } from '@radix-ui/themes';
import { TrashIcon } from '@radix-ui/react-icons';

import { type Style } from '@/project/types';

import { removeStyle } from '@/project/actions';

import StyleEdit from './StyleEdit';

type HeaderCellProps = {
	style: Style;
	length: number;
};

const HeaderCell = ({ style, length }: HeaderCellProps) => {
	const onClickDelete = () => {
		removeStyle(style.id);
	};

	return (
		<th className="canvas__header-cell">
			<Card>
				<Flex direction="row" justify="between" align="center">
					<Flex direction="column" gap="2">
						<Flex direction="row" gap="6" width="100%">
							<Flex direction="column" align="start">
								<Text size="2" weight="regular">
									Font Family
								</Text>
								<Text>{style.fontFamily}</Text>
							</Flex>
							<Flex direction="column" align="start">
								<Text size="2" weight="regular">
									Font Style
								</Text>
								<Text>{style.fontStyle}</Text>
							</Flex>
							<Flex direction="column" align="start">
								<Text size="2" weight="regular">
									Font Weight
								</Text>
								<Text>{style.fontWeight}</Text>
							</Flex>
						</Flex>
					</Flex>

					<Flex direction="row" justify="end" align="center" gap="2">
						<StyleEdit style={style} />
						{length > 1 ? (
							<Button color="red" onClick={onClickDelete}>
								<TrashIcon />
								Delete
							</Button>
						) : null}
					</Flex>
				</Flex>
			</Card>
		</th>
	);
};

export default HeaderCell;
