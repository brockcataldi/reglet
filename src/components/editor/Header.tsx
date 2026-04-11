import {
	Box,
	Flex,
	TabNav,
	Text,
	Heading,
	VisuallyHidden,
	Button,
} from '@radix-ui/themes';

import { Link } from 'react-router';

import { useBreakpointWidths } from '@/project';

import { widthToIcon } from '$/helpers';

type HeaderProps = {
	id: string;
};

const Header = ({ id }: HeaderProps) => {
	const widths = useBreakpointWidths();

	return (
		<Box width={'100%'} p={'2'}>
			<Flex align="center" justify={'between'}>
				<VisuallyHidden>
					<Heading as="h1">Reglet editor</Heading>
				</VisuallyHidden>
				<TabNav.Root>
					{widths
						.sort((a, b) => a.width - b.width)
						.map((width) => (
							<TabNav.Link
								active={id === width.id}
								asChild
								key={`link-to-${width.id}`}
							>
								<Link to={`/breakpoint/${width.id}`}>
									<Flex
										align={'center'}
										justify={'center'}
										gap={'2'}
									>
										{widthToIcon(width.width)}
										<Text as="span">
											{width.width === 0
												? 'Root'
												: width.width}
										</Text>
									</Flex>
								</Link>
							</TabNav.Link>
						))}
				</TabNav.Root>

				<Flex gap={'3'}>
					<Button variant="soft" color="gray">
						Preview
					</Button>
					<Button variant="soft" color="gray">
						Export
					</Button>
				</Flex>
			</Flex>
		</Box>
	);
};

export default Header;
