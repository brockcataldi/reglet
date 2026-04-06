import {
	Table,
	IconButton,
	Flex,
	Card,
	Text,
	Box,
	Dialog,
	Button,
} from '@radix-ui/themes';
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

						<Dialog.Root>
							<Dialog.Trigger>
								<IconButton>
									<Pencil1Icon />
								</IconButton>
							</Dialog.Trigger>
							<Dialog.Content maxWidth="600px">
								<Dialog.Title size={'7'}>
									Edit Type Style
								</Dialog.Title>
								<p>
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit.
								</p>

								<Flex>
									<Flex>
										<Text></Text>
									</Flex>
								</Flex>

								<Flex gap="3" mt="4" justify="end">
									<Dialog.Close>
										<Button variant="soft" color="gray">
											Cancel
										</Button>
									</Dialog.Close>
									<Dialog.Close>
										<Button>Save</Button>
									</Dialog.Close>
								</Flex>
							</Dialog.Content>
						</Dialog.Root>
					</Flex>
				</Card>
			</Box>
		</Table.ColumnHeaderCell>
	);
};

export default BreakpointHeaderCell;
