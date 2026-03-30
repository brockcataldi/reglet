import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import {
	Container,
	Heading,
	Callout,
	Strong,
	Link,
	Flex,
	Box,
	Text,
	RadioCards,
	Code,
} from '@radix-ui/themes';

const IndexRoute = () => {
	return (
		<Container>
			<Flex align={'center'} justify={'center'}>
				<Box maxWidth={'600px'}>
					<Flex direction={'column'} gap={'3'}>
						<Flex direction={'column'} gap={'1'}>
							<Heading as="h1" size={'9'}>
								Reglet
							</Heading>
							<Text size={'5'}>Reg&middot;let</Text>
							<ol style={{ margin: '0' }}>
								<li>
									<Text>
										a flat narrow architectural molding
									</Text>
								</li>
								<li>
									<Text>
										a strip of wood used like a lead between
										lines of type
									</Text>
								</li>
								<li>
									<Text>
										<Strong>
											a tool to design type &amp; spacing
											systems
										</Strong>
									</Text>
								</li>
							</ol>
						</Flex>

						<Heading as="h2" size={'7'}>
							Project Settings
						</Heading>
						<Heading as="h3">Unit</Heading>
						<RadioCards.Root
							defaultValue="1"
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
									<Text>
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
									<Text>
										Fixed pixel units; best when you need
										exact, device-independent sizing.
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
									<Text>
										Print-oriented points; mainly for print
										styles, not typical screen UI type.
									</Text>
								</Flex>
							</RadioCards.Item>
						</RadioCards.Root>

						<Heading as="h3">Type</Heading>
						<RadioCards.Root
							defaultValue="1"
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
									<Text>
										Type sizes change at specific screen
										widths using set breakpoints.
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
									<Text>
										Type scales smoothly between sizes based
										on the viewport or container.
									</Text>
								</Flex>
							</RadioCards.Item>
						</RadioCards.Root>

						<Callout.Root color="red" role="alert">
							<Callout.Icon>
								<ExclamationTriangleIcon />
							</Callout.Icon>
							<Callout.Text>
								You already have a working project, this will{' '}
								<Strong>reset</Strong> that.{' '}
								<Link href="#">Go back to editing.</Link>
							</Callout.Text>
						</Callout.Root>
					</Flex>
				</Box>
			</Flex>
			{/* <Link to={'/traditional'}>New Project</Link> */}
		</Container>
	);
};

export default IndexRoute;
