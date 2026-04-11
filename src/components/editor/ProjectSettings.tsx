import {
	Flex,
	Heading,
	RadioCards,
	Text,
	Code,
	Dialog,
	Button,
} from '@radix-ui/themes';

import {
	setSettingsUnit,
	useSettingsUnit,
	useProjectType,
	type Unit,
} from '@/project';

const ProjectSettings = () => {
	const unit = useSettingsUnit();
	const type = useProjectType();

	const onChangeUnit = (value: Unit) => {
		setSettingsUnit(value);
	};

	return (
		<Dialog.Root>
			<Dialog.Trigger>
				<Button>Project Settings</Button>
			</Dialog.Trigger>

			<Dialog.Content maxWidth="600px">
				<Dialog.Title size={'7'}>Project Settings</Dialog.Title>
				<Dialog.Description>
					REWORK THIS I DON'T THINK IT NEEDS TO BE HERE
				</Dialog.Description>

				<Flex direction={'column'} gap={'2'}>
					<Heading as="h2" size={'4'}>
						Unit
					</Heading>
					<RadioCards.Root
						value={unit}
						onValueChange={onChangeUnit}
						columns={{ initial: 'rem', sm: '3' }}
					>
						<RadioCards.Item value="rem">
							<Flex
								direction="column"
								width="100%"
								gap={'1'}
								align={'start'}
								justify={'start'}
							>
								<Text size={'4'}>
									<Code>rem</Code>
								</Text>
								<Text size={'1'}>
									Relative to the root font size; best for
									scalable, accessible type.
								</Text>
							</Flex>
						</RadioCards.Item>
						<RadioCards.Item value="px">
							<Flex
								direction="column"
								width="100%"
								gap={'1'}
								align={'start'}
								justify={'start'}
							>
								<Text size={'4'}>
									<Code>px</Code>
								</Text>
								<Text size={'1'}>
									Fixed pixel units; best when you need exact,
									device-independent sizing.
								</Text>
							</Flex>
						</RadioCards.Item>
						<RadioCards.Item value="pt">
							<Flex
								direction="column"
								width="100%"
								gap={'1'}
								align={'start'}
								justify={'start'}
							>
								<Text size={'4'}>
									<Code>pt</Code>
								</Text>
								<Text size={'1'}>
									Print-oriented points; mainly for print
									styles, not typical screen UI type.
								</Text>
							</Flex>
						</RadioCards.Item>
					</RadioCards.Root>

					<Heading as="h3" size={'4'}>
						Type
					</Heading>
					<RadioCards.Root
						value={type}
						columns={{ initial: 'traditional', sm: '2' }}
					>
						<RadioCards.Item value="traditional">
							<Flex
								direction="column"
								width="100%"
								gap={'1'}
								align={'start'}
								justify={'start'}
							>
								<Text weight={'bold'}>Traditional</Text>
								<Text size={'1'}>
									Type sizes change at specific screen widths
									using set breakpoints.
								</Text>
							</Flex>
						</RadioCards.Item>
						<RadioCards.Item value="fluid">
							<Flex
								direction="column"
								width="100%"
								gap={'1'}
								align={'start'}
								justify={'start'}
							>
								<Text weight={'bold'}>Fluid</Text>
								<Text size={'1'}>
									Type scales smoothly between sizes based on
									the viewport or container.
								</Text>
							</Flex>
						</RadioCards.Item>
					</RadioCards.Root>
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
	);
};

export default ProjectSettings;
