import { Table, IconButton, Flex, Card, Text, Box } from '@radix-ui/themes';
import { Pencil1Icon } from '@radix-ui/react-icons';

import type { TextStyle } from '../project/types';

type BreakpointHeaderCellProps = {
	textStyle: TextStyle;
};

const BreakpointHeaderCell = ({ textStyle }: BreakpointHeaderCellProps) => {
	return (
		<Table.ColumnHeaderCell>
			<Box width={'500px'}>
				<Card>
					<Flex
						direction={'row'}
						justify={'between'}
						align={'center'}
					>
						<Flex direction={'column'} gap={'2'}>
							<Flex direction={'row'} gap="6" width={'100%'}>
								<Flex direction={'column'} align="start">
									<Text size={'2'} weight={'regular'}>
										Font Family
									</Text>
									<Text>{textStyle.fontFamily}</Text>
								</Flex>
								<Flex direction={'column'} align="start">
									<Text size={'2'} weight={'regular'}>
										Font Style
									</Text>
									<Text>{textStyle.fontStyle}</Text>
								</Flex>
								<Flex direction={'column'} align="start">
									<Text size={'2'} weight={'regular'}>
										Line Height
									</Text>
									<Text>{textStyle.fontWeight}</Text>
								</Flex>
							</Flex>
						</Flex>
						<IconButton>
							<Pencil1Icon />
						</IconButton>
					</Flex>
				</Card>
			</Box>
		</Table.ColumnHeaderCell>
	);
};

export default BreakpointHeaderCell;
