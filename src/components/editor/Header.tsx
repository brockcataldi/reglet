import {
	Box,
	Flex,
	Text,
	Heading,
	VisuallyHidden,
	Button,
	Badge,
	TabNav,
} from '@radix-ui/themes';

import { Link } from 'react-router';

import { useBreakpointWidths, useProjectType } from '@/project/hooks';

import { widthToIcon } from '$/helpers';

type HeaderProps = {
	id: string;
};

const Header = ({ id }: HeaderProps) => {
	const widths = useBreakpointWidths();
	const type = useProjectType();

	return (
		<Box width={'100%'} p={'2'}>
			<Flex align="center" justify={'between'}>
				<VisuallyHidden>
					<Heading as="h1">Reglet editor</Heading>
				</VisuallyHidden>
				<Flex align={'center'} justify={'start'} gap={'2'}>
					<Badge size={'3'}>{type}</Badge>
					<TabNav.Root>
						{widths.map((width) => (
							<TabNav.Link
								asChild
								active={id === width.id}
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
				</Flex>
				<Flex gap={'3'}>
					<Button>Preview</Button>
					<Button>Export</Button>
				</Flex>
			</Flex>
		</Box>
	);
};

export default Header;
