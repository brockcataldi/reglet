import { Box } from '@radix-ui/themes';
import BreakpointTable from './BreakpointTable';

type TraditionalBreakpointProps = {
	id: string;
};

const TraditionalBreakpoint = ({ id }: TraditionalBreakpointProps) => {
	return (
		<Box width={'100%'}>
			<BreakpointTable id={id} />
		</Box>
	);
};

export default TraditionalBreakpoint;
