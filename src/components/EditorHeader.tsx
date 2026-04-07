import { Box, Flex, TabNav, Button, Dialog } from '@radix-ui/themes';

import ProjectSettings from './ProjectSettings';
import { Link } from 'react-router';
import { useBreakpointWidths } from '../project/slices/breakpoint';

type EditorHeaderProps = {
	id: string;
};

const EditorHeader = ({ id }: EditorHeaderProps) => {
	const widths = useBreakpointWidths();

	return (
		<Box width={'100%'} p={'2'}>
			<Flex align="center" justify={'between'}>
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
									{width.width === 0 ? 'Root' : width.width}
								</Link>
							</TabNav.Link>
						))}

					<Dialog.Root>
						<Dialog.Trigger>
							<TabNav.Link>Edit</TabNav.Link>
						</Dialog.Trigger>
						<Dialog.Content>
							<Dialog.Close>
								<Button>Close</Button>
							</Dialog.Close>
						</Dialog.Content>
					</Dialog.Root>
				</TabNav.Root>
				<ProjectSettings />
			</Flex>
		</Box>
	);
};

export default EditorHeader;
