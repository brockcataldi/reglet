import type { ChangeEvent } from 'react';
import {
	Box,
	Flex,
	Heading,
	ScrollArea,
	Text,
	TextField,
} from '@radix-ui/themes';

import {
	updateTraditionalBreakpoint,
	useBreakpointBase,
	useBreakpointRatio,
	useSettingsUnit,
} from '../hooks/useProjectStore';

import RatioField from './ui/RatioField';

type TraditionalBreakpointProps = {
	id: string;
};

const TraditionalBreakpointAside = ({ id }: TraditionalBreakpointProps) => {
	const unit = useSettingsUnit();
	const base = useBreakpointBase(id);
	const ratio = useBreakpointRatio(id);

	const onChangeBase = (event: ChangeEvent<HTMLInputElement>) => {
		updateTraditionalBreakpoint(id, {
			base: parseFloat(event.target.value),
		});
	};

	const onChangeRatio = (newRatio: number) => {
		updateTraditionalBreakpoint(id, {
			ratio: newRatio,
		});
	};

	return (
		<Box style={{ width: '250px', height: '100vh', background: 'red' }}>
			<ScrollArea asChild>
				<Box p={'3'}>
					<Heading>Breakpoint Settings</Heading>

					<Flex direction={'column'} gap={'1'}>
						<Text as="label" htmlFor={`${id}-base`} size={'2'}>
							Base Value
						</Text>
						<Flex direction={'row'} gap={'1'} align={'center'}>
							<TextField.Root
								type="number"
								id={`${id}-base`}
								min={0}
								step={unit === 'px' ? 1 : 0.05}
								value={base}
								onChange={onChangeBase}
							/>
							<Text>{unit}</Text>
						</Flex>
					</Flex>

					{ratio !== undefined ? (
						<RatioField
							id={`${id}-ratio`}
							label="Ratio"
							value={ratio}
							onChange={onChangeRatio}
						/>
					) : null}
				</Box>
			</ScrollArea>
		</Box>
	);
};

export default TraditionalBreakpointAside;
