import { useState } from 'react';
import { Link } from 'react-router';

import {
	Button,
	Callout,
	Code,
	Flex,
	Heading,
	RadioCards,
	Section,
	Strong,
	Text,
} from '@radix-ui/themes';

import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

import type { ProjectType, Unit } from '@/project/types';
import { updateNewProject } from '@/project/actions';
import { RadioGroup } from 'radix-ui';

const NewRoute = () => {
	const [unit, setUnit] = useState<Unit>('rem');
	const [type, setType] = useState<ProjectType>('traditional');

	const onChangeUnit = (newUnit: Unit) => {
		setUnit(newUnit);
	};

	const onChangeType = (newType: ProjectType) => {
		setType(newType);
	};

	const onClickNewProject = () => {
		updateNewProject(unit, type);
	};

	return (
		<main className="mx-auto max-w-2xl">
			<header className="py-10">
				<h1 className="text-7xl font-bold">New Project</h1>
				<p>Don't worry all of these settings can be changed.</p>
			</header>

			<hr />

			<section className="pt-10 pb-5">
				<h2 className="text-4xl font-bold">Select a Unit Type</h2>
				<div>
					<RadioGroup.Root aria-label="Select a Unit Type">
						<div className='p-2 border border-neutral-300 rounded-xl'>
							<RadioGroup.Item value="rem" id="unit-rem" className='w-6.25 h-6.25 rounded-[100%] shadow-2xl border border-neutral-400'>
								<RadioGroup.Indicator className="after:bg-violet-11 relative flex h-full w-full items-center justify-center after:block after:h-2.75 after:w-2.75 after:rounded-full after:content-[''] after:bg-amber-950" />
							</RadioGroup.Item>
							<label className="Label" htmlFor="rem">
								<code className='block text-l font-mono'>rem</code>
								<span>Relative to the root font size; best for scalable, accessible type.</span>
							</label>
						</div>
					</RadioGroup.Root>
				</div>
			</section>

			<Section size="1">
				<Heading size="7" as="h2" mb="2">
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
							gap="1"
							align="start"
							justify="start"
						>
							<Text size="4">
								<Code>rem</Code>
							</Text>
							<Text size="1">
								Relative to the root font size; best for
								scalable, accessible type.
							</Text>
						</Flex>
					</RadioCards.Item>
					<RadioCards.Item value="px">
						<Flex
							direction="column"
							width="100%"
							gap="1"
							align="start"
							justify="start"
						>
							<Text size="4">
								<Code>px</Code>
							</Text>
							<Text size="1">
								Fixed pixel units; best when you need exact,
								device-independent sizing.
							</Text>
						</Flex>
					</RadioCards.Item>
					<RadioCards.Item value="pt">
						<Flex
							direction="column"
							width="100%"
							gap="1"
							align="start"
							justify="start"
						>
							<Text size="4">
								<Code>pt</Code>
							</Text>
							<Text size="1">
								Print-oriented points; mainly for print styles,
								not typical screen UI type.
							</Text>
						</Flex>
					</RadioCards.Item>
				</RadioCards.Root>
			</Section>

			<Section size="1">
				<Heading size="7" as="h2" mb="2">
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
							gap="1"
							align="start"
							justify="start"
						>
							<Text weight="bold" size="4">
								Traditional
							</Text>
							<Text size="1">
								Type sizes change at specific screen widths
								using set breakpoints.
							</Text>
						</Flex>
					</RadioCards.Item>
					<RadioCards.Item value="fluid">
						<Flex
							direction="column"
							width="100%"
							gap="1"
							align="start"
							justify="start"
						>
							<Text weight="bold" size="4">
								Fluid
							</Text>
							<Text size="1">
								Type scales smoothly between sizes based on the
								viewport or container.
							</Text>
						</Flex>
					</RadioCards.Item>
				</RadioCards.Root>
			</Section>
			<Section size="1">
				{!localStorage.getItem('project') ? null : (
					<Callout.Root color="red" mb="2">
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
				<Button asChild>
					<Link to="/breakpoint" onClick={onClickNewProject}>
						Start Project
					</Link>
				</Button>
			</Section>
		</main>
	);
};

export default NewRoute;
