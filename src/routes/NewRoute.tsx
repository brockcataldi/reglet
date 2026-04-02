import { useState } from 'react';
import { useNavigate } from 'react-router';

import {
	Button,
	Callout,
	Code,
	Container,
	Flex,
	Heading,
	RadioCards,
	Section,
	Separator,
	Strong,
	Text,
} from '@radix-ui/themes';

import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

import type { ProjectType, Unit } from '../project/types';
import { setNewProject } from '../project/slices/project';

const NewRoute = () => {
	const navigate = useNavigate();

	const [unit, setUnit] = useState<Unit>('rem');
	const [type, setType] = useState<ProjectType>('traditional');

	const onChangeUnit = (newUnit: Unit) => {
		setUnit(newUnit);
	};

	const onChangeType = (newType: ProjectType) => {
		setType(newType);
	};

	const onClickNewProject = () => {
		setNewProject(unit, type);
		navigate('/breakpoint');
	};

	return (
		<Container maxWidth={'600px'}>
			<Section size={'1'}>
				<Heading size={'9'} as="h1" mb={'2'}>
					New Project
				</Heading>
				<Text>Don't worry all of these settings can be changed.</Text>
			</Section>
			<Separator orientation={'horizontal'} size={'4'} />
			<Section size={'1'}>
				<Heading size={'7'} as="h2" mb={'2'}>
					Select a Unit Type
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
								Print-oriented points; mainly for print styles,
								not typical screen UI type.
							</Text>
						</Flex>
					</RadioCards.Item>
				</RadioCards.Root>
			</Section>
			<Section size={'1'}>
				<Heading size={'7'} as="h2" mb={'2'}>
					Select a Type of Project
				</Heading>
				<RadioCards.Root
					value={type}
					onValueChange={onChangeType}
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
							<Text weight={'bold'} size={'4'}>
								Traditional
							</Text>
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
							<Text weight={'bold'} size={'4'}>
								Fluid
							</Text>
							<Text size={'1'}>
								Type scales smoothly between sizes based on the
								viewport or container.
							</Text>
						</Flex>
					</RadioCards.Item>
				</RadioCards.Root>
			</Section>
			<Section size={'1'}>
				{!localStorage.getItem('project') ? null : (
					<Callout.Root color={'red'} mb={'2'}>
						<Callout.Icon>
							<ExclamationTriangleIcon />
						</Callout.Icon>
						<Callout.Text>
							It seems you've already create a project,{' '}
							<Strong>
								creating a new project will overwrite that
								project.
							</Strong>
						</Callout.Text>
					</Callout.Root>
				)}
				<Button onClick={onClickNewProject}>Start Project</Button>
			</Section>

			<pre>{JSON.stringify({ unit, type }, null, 4)}</pre>
		</Container>
	);
};

export default NewRoute;
