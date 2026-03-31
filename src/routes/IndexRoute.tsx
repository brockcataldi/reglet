import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import {
	Container,
	Heading,
	Callout,
	Strong,
	Link,
	Flex,
	Box,
} from '@radix-ui/themes';
import ProjectSettings from '../components/ProjectSettings';

const IndexRoute = () => {
	return (
		<Container>
			<Flex align={'center'} justify={'center'}>
				<Box maxWidth={'600px'}>
					<Flex direction={'column'} gap={'3'}>
						<Heading as="h2" size={'7'}>
							Project Settings
						</Heading>

						<ProjectSettings />

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
		</Container>
	);
};

export default IndexRoute;
