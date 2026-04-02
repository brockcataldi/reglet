import { Box, Flex, SegmentedControl } from '@radix-ui/themes';
import BreakpointTable from './BreakpointTable';
import TraditionalBreakpointAside from './TraditionalBreakpointAside';
import ProjectSettings from './ProjectSettings';

type TraditionalBreakpointProps = {
	id: string;
};

const TraditionalBreakpoint = ({ id }: TraditionalBreakpointProps) => {
	return (
		<Box>
			<header className="editor__header">
				<Box width={'100%'} p={'2'}>
					<Flex align="center" justify={'between'}>
						<SegmentedControl.Root defaultValue="inbox">
							<SegmentedControl.Item value="inbox">
								Root
							</SegmentedControl.Item>
							<SegmentedControl.Item value="drafts">
								800
							</SegmentedControl.Item>
							<SegmentedControl.Item value="sent">
								1200
							</SegmentedControl.Item>
						</SegmentedControl.Root>
						<ProjectSettings />
					</Flex>
				</Box>
			</header>
			<aside className="editor__aside">
				<TraditionalBreakpointAside id={id} />
			</aside>
			<main className="editor__main">
				<Box p="2">
					<BreakpointTable id={id} />
				</Box>
			</main>
		</Box>
	);
};

export default TraditionalBreakpoint;
