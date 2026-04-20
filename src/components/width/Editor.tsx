import { useState } from 'react';
import { Link } from 'react-router';
import { Box, Button, Flex, Heading, RadioCards, Text } from '@radix-ui/themes';

import { getBreakpoints, getProjectType } from '@/project/selectors';
import type { ProjectType, Breakpoint } from '@/project/types';
import { updateBreakpoints } from '@/project/actions';

import Sizes from './Sizes';

const Editor = () => {
	const currentType = getProjectType();
	const currentBreakpoints = getBreakpoints();

	const [type, setType] = useState(currentType);
	const [breakpoints, setBreakpoints] = useState(currentBreakpoints);

	const onChangeType = (newType: ProjectType) => {
		setType(newType);
	};

	const onChangeBreakpoints = (updatedBreakpoints: Breakpoint[]) => {
		setBreakpoints(updatedBreakpoints);
	};

	const onClickSave = () => {
		updateBreakpoints(breakpoints);
	};

	return (
		<Box>
			<Heading as="h2" mb="2">
				Project Type
			</Heading>
			<RadioCards.Root
				value={type}
				onValueChange={onChangeType}
				columns={{ initial: 'traditional', sm: '2' }}
				mb="4"
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
							Type sizes change at specific screen widths using
							set breakpoints.
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

			{currentType === type ? (
				<Sizes
					type={type}
					breakpoints={breakpoints}
					onChange={onChangeBreakpoints}
				/>
			) : type === 'fluid' ? (
				'convert to fluid'
			) : (
				'convert to traditional'
			)}

			<Flex
				direction="row"
				align="center"
				justify="start"
				gap="2"
				mt="2"
			>
				<Button asChild>
					<Link to="/breakpoint/" onClick={onClickSave}>
						Save
					</Link>
				</Button>
				<Button asChild>
					<Link to="/breakpoint/">Cancel</Link>
				</Button>
			</Flex>
		</Box>
	);
};
export default Editor;
