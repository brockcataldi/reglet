import { Box, Flex } from '@radix-ui/themes';
import BreakpointTable from './BreakpointTable';
import TraditionalBreakpointAside from './TraditionalBreakpointAside';

type TraditionalBreakpointProps = {
	id: string;
};

const TraditionalBreakpoint = ({ id }: TraditionalBreakpointProps) => {
	return (
		<Flex width={'100%'}>
			<TraditionalBreakpointAside id={id} />

			<Box>
				<BreakpointTable id={id} />
			</Box>
		</Flex>
	);
};

export default TraditionalBreakpoint;
