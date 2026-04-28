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

	return (
		<aside className="fixed top-10 z-5 h-[calc(100dvh-40px)] w-64 bg-neutral-100 shadow-md">
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
								onChange={(newBase: number) => {
									updateBreakpoint(id, {
										base: newBase,
									});
								}}
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
								onChange={(newRatio: number) => {
									updateBreakpoint(id, {
										ratio: newRatio,
									});
								}}
							/>
						</Flex>
					) : null}
				</Flex>
			</Box>
		</aside>
	);
};

export default Aside;
