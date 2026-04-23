import {
	Box,
	Flex,
	Text,
	Heading,
	VisuallyHidden,
	Button,
	Select,
} from '@radix-ui/themes';

import { Link } from 'react-router';

import { widthToIcon } from '@/components/helpers';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';

import DescriptiveIconButton from '../ui/DescriptiveIconButton';
import { useBreakpointWidths, useProjectType } from '@/project/hooks';
import type { ProjectType } from '@/project/types';
import { updateProjectType } from '@/project/actions';
import { getBreakpointWidths } from '@/project/selectors';

type HeaderProps = {
	id: string;
};

const Header = ({ id }: HeaderProps) => {
	const type = useProjectType();
	const breakpoints = getBreakpointWidths();

	// too many breakpoints error
	const fluidError = type === 'fluid' && breakpoints.length > 2;	
	// missing root error
	const traditionalError = type === 'traditional' && !breakpoints.some((w) => w.width === 0);

	return (
		<Box width="100%" p="2">
			<Flex align="center" justify="between">
				<VisuallyHidden>
					<Heading as="h1">Reglet editor</Heading>
				</VisuallyHidden>

				<Flex>
					<Select.Root value={type} onValueChange={(value: ProjectType) => updateProjectType(value)}>
						<Select.Trigger />
						<Select.Content>
							<Select.Item value='traditional'>
								Traditional
							</Select.Item>
							<Select.Item value='fluid'>
								Fluid
							</Select.Item>
						</Select.Content>
					</Select.Root>

					<ul className="editor__header-nav">
						{breakpoints.map((width) => (
							<li
								key={width.id}
								className="editor__header-nav-item"
							>
								{width.id === id ? (
									<>
										<Button
											disabled
											style={{
												borderTopRightRadius: '0',
												borderBottomRightRadius: '0',
											}}
										>
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
										</Button>
										<DescriptiveIconButton
											content={`Edit the ${width.width}px size`}
											radius="none"
										>
											<Pencil1Icon />
										</DescriptiveIconButton>
										<DescriptiveIconButton
											color="red"
											style={{
												borderTopLeftRadius: '0',
												borderBottomLeftRadius: '0',
											}}
											content={`Delete the ${width.width}px size`}
										>
											<TrashIcon />
										</DescriptiveIconButton>
									</>
								) : (
									<>
										<Button asChild>
											<Link
												to={`/breakpoint/${width.id}`}
											>
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
										</Button>
									</>
								)}
							</li>
						))}
					</ul>
				</Flex>
				<Flex gap="3">
					<Button>Preview</Button>
					<Button>Export</Button>
				</Flex>
			</Flex>
		</Box>
	);
};

export default Header;
