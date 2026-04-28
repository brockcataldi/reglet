import { Flex, Text, Button, Select } from '@radix-ui/themes';

import { Link } from 'react-router';

import { widthToIcon } from '@/components/helpers';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';

import DescriptiveIconButton from '../ui/DescriptiveIconButton';
import { useProjectType } from '@/project/hooks';
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
	// const fluidError = type === 'fluid' && breakpoints.length > 2;
	// missing root error
	// const traditionalError = type === 'traditional' && !breakpoints.some((w) => w.width === 0);

	return (
		<header className="fixed top-0 left-0 z-10 w-full bg-neutral-50 p-2 shadow-md">
			<Flex align="center" justify="between">
				<h1 className="sr-only">Reglet editor</h1>

				<Flex>
					<Select.Root
						value={type}
						onValueChange={(value: ProjectType) =>
							updateProjectType(value)
						}
					>
						<Select.Trigger />
						<Select.Content>
							<Select.Item value="traditional">
								Traditional
							</Select.Item>
							<Select.Item value="fluid">Fluid</Select.Item>
						</Select.Content>
					</Select.Root>

					<ul className="flex flex-row items-center justify-start">
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
		</header>
	);
};

export default Header;
