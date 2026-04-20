import { Box, Flex, Text } from '@radix-ui/themes';

import { useBreakpointBase, useBreakpointRatio } from '@/project/hooks';

import { updateBreakpoint } from '@/project/actions';

import RatioField from '@/components/ui/RatioField';
import UnitField from '@/components/ui/UnitField';

type AsideProps = {
	id: string;
};

const Aside = ({ id }: AsideProps) => {
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
		<Box height="100%">
			<Flex p="4" direction="column" gapY="2">
				{base !== undefined ? (
					<Flex direction="column">
						<Text as="label" htmlFor={`${id}-base`} size="2">
							Base Font Size
						</Text>
						<UnitField
							id={`${id}-base`}
							value={base}
							onChange={onChangeBase}
						/>
					</Flex>
				) : null}

				{ratio !== undefined ? (
					<Flex direction="column">
						<Text as="label" htmlFor={`${id}-ratio`} size="2">
							Ratio
						</Text>
						<RatioField
							id={`${id}-ratio`}
							value={ratio}
							onChange={onChangeRatio}
						/>
					</Flex>
				) : null}
			</Flex>
		</Box>
	);
};

export default Aside;
