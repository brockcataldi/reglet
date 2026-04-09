import { Flex, Card, Text, Box } from '@radix-ui/themes';

import type { Style } from '../../project/types';
import StyleEdit from './StyleEdit';

type HeaderCellProps = {
	style: Style;
};

const HeaderCell = ({ style }: HeaderCellProps) => {
	return (
		<Box>
			<Card>
				<Flex direction={'row'} justify={'between'} align={'center'}>
					<Flex direction={'column'} gap={'2'}>
						<Flex direction={'row'} gap="6" width={'100%'}>
							<Flex direction={'column'} align="start">
								<Text size={'2'} weight={'regular'}>
									Font Family
								</Text>
								<Text>{style.fontFamily}</Text>
							</Flex>
							<Flex direction={'column'} align="start">
								<Text size={'2'} weight={'regular'}>
									Font Style
								</Text>
								<Text>{style.fontStyle}</Text>
							</Flex>
							<Flex direction={'column'} align="start">
								<Text size={'2'} weight={'regular'}>
									Line Height
								</Text>
								<Text>{style.fontWeight}</Text>
							</Flex>
						</Flex>
					</Flex>

					<StyleEdit style={style} />
				</Flex>
			</Card>
		</Box>
	);
};

export default HeaderCell;
