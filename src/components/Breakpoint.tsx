import { useState } from 'react';
import { type ValueWithUnit } from '../types';

import {
    Avatar,
	Box,
	Button,
	Card,
	Container,
	Flex,
	Popover,
	Text,
} from '@radix-ui/themes';

import UnitField from './ui/UnitField';
import RatioField from './ui/RatioField';

import './Breakpoint.css';

type Step = {
	index: number;
	lineHeight?: number;
	fontSize?: ValueWithUnit;
	synced: boolean;
};

const scale = (
	step: number,
	base: ValueWithUnit,
	ratio: number
): ValueWithUnit => {
	return {
		value: base.value * Math.pow(ratio, step),
		unit: base.unit,
	};
};

const vwuToString = (value: ValueWithUnit) => `${value.value}${value.unit}`;

const Breakpoint = () => {
	const [base, setBase] = useState<ValueWithUnit>({ value: 16, unit: 'px' });
	const [ratio, setRatio] = useState<number>(1.2);
	const [steps, setSteps] = useState<Step[]>([
		{ index: -1, synced: true },
		{ index: 0, synced: true },
		{ index: 1, synced: true },
		{ index: 2, synced: true },
		{ index: 3, synced: true },
		{ index: 4, synced: true },
		{ index: 5, synced: true },
	]);

	return (
		<Container maxWidth={'660px'}>
			<header>
				<Box p="4">
					<Flex direction={'row'} gap={'2'}>
						<UnitField
							label={'Base Value'}
							value={base}
							onChange={setBase}
						/>

						<RatioField
							label={'Ratio'}
							value={ratio}
							onChange={setRatio}
						/>
					</Flex>
				</Box>
			</header>
			<Box p="4">
				<Button size={'2'}>+</Button>
				{steps
					.sort((a, b) => b.index - a.index)
					.map((step) => (
						<Popover.Root key={`item-${step.index}`}>
							<Popover.Trigger>
                                <button className={'breakpoint__item'}>
                                    <Flex gap={'3'} align={'center'} direction={'row'}>
                                        <Avatar fallback={step.index} />
                                        <p
                                            style={{
                                                fontSize: vwuToString(
                                                    step.fontSize ||
                                                        scale(
                                                            step.index,
                                                            base,
                                                            ratio
                                                        )
                                                ),
                                                lineHeight: step.lineHeight || 1,
                                                margin: '0 0 1rem 0',
                                                whiteSpace: 'nowrap',
                                                width: '100%',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            Lorem ipsum dolor sit amet consectetur
                                            adipisicing elit.
                                        </p>
                                    </Flex>
                                </button>
							</Popover.Trigger>
							<Popover.Content>Hello World!</Popover.Content>
						</Popover.Root>
					))}
				<Button>+</Button>
			</Box>
		</Container>
	);
};
export default Breakpoint;
