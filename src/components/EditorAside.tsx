import { Box, Flex } from '@radix-ui/themes';

import {
	updateBreakpoint,
	useBreakpointBase,
	useBreakpointRatio,
} from '../project/slices/breakpoint';

import RatioField from './ui/RatioField';
import UnitField from './ui/UnitField';

type EditorAsideProps = {
	id: string;
};

const EditorAside = ({ id }: EditorAsideProps) => {
	const base = useBreakpointBase(id);
	const ratio = useBreakpointRatio(id);

	const onChangeBase = (newBase: number) => {
		updateBreakpoint(id, {
			base: newBase,
		});
	};

	const onChangeRatio = (newRatio: number) => {
		updateBreakpoint(id, {
			ratio: newRatio,
		});
	};

	return (
		<Box height={'100%'}>
			<Flex p={'4'} direction={'column'} gap={'10'}>
				{base !== undefined ? (
					<UnitField
						id={`${id}-base`}
						label="Base Value"
						value={base}
						onChange={onChangeBase}
					/>
				) : null}

				{ratio !== undefined ? (
					<RatioField
						id={`${id}-ratio`}
						label="Ratio"
						value={ratio}
						onChange={onChangeRatio}
					/>
				) : null}
			</Flex>
		</Box>
	);
};

export default EditorAside;
