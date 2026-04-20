import {
	Box,
	Flex,
	Text,
	Heading,
	VisuallyHidden,
	Button,
	TabNav,
} from '@radix-ui/themes';

import { Link } from 'react-router';

import { getBreakpointWidths } from '@/project/selectors';

import { widthToIcon } from '@/components/helpers';

type HeaderProps = {
	id: string;
};

const Header = ({ id }: HeaderProps) => {
	const breakpoints = getBreakpointWidths();

	return (
		<Box width="100%" p="2">
			<Flex align="center" justify="between">
				<VisuallyHidden>
					<Heading as="h1">Reglet editor</Heading>
				</VisuallyHidden>
				<TabNav.Root>
					{breakpoints.map((width) => (
						<TabNav.Link
							asChild
							active={id === width.id}
							key={`link-to-${width.id}`}
						>
							<Link to={`/breakpoint/${width.id}`}>
								<Flex
									align="center"
									justify="center"
									gap="2"
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
					<TabNav.Link asChild>
						<Link to="/breakpoints">Edit</Link>
					</TabNav.Link>
				</TabNav.Root>
				<Flex gap="3">
					<Button>Preview</Button>
					<Button>Export</Button>
				</Flex>
			</Flex>
		</Box>
	);
};

export default Header;
