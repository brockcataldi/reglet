import { Box, Code, Container, Heading, Text } from '@radix-ui/themes';

import Editor from '@/components/width/Editor';

const BreakpointsRoute = () => {
	return (
		<Container maxWidth="600px">
			<Box py="6">
				<Heading size="9" as="h1" mb="2">
					Modify your breakpoints
				</Heading>
				<Text>
					All breakpoints are currently specified in <Code>px</Code>,
					for clarity. During export you can modify this.
				</Text>
			</Box>
			<Editor />
		</Container>
	);
};

export default BreakpointsRoute;
