import { useMemo, useState, type ChangeEvent } from 'react';
import { Box, Flex, Select, Text, TextField } from '@radix-ui/themes';

import {
	type Unit,
	type Bounds,
	type Cell,
	type Override,
	type TextStyle,
} from '../types';

import { scale, toPrecise } from '../functions';

import { useProject } from '../hooks/ProjectProvider';

import RatioField from './ui/RatioField';
import BreakpointVisualize from './BreakpointVisualize';

const Breakpoint = () => {
	const {
		project: { unit, precision },
		setUnit,
		setPrecision,
	} = useProject();

	// Breakpoint Settings
	const [base, setBase] = useState<number>(1);
	const [ratio, setRatio] = useState<number>(1.2);
	const [bounds, setBounds] = useState<Bounds>({ min: -1, max: 5 });
	const [textStyles, setTextStyles] = useState<TextStyle[]>([
		{
			fontFamily: 'Arial',
			fontWeight: '400',
			fontStyle: 'normal',
		},
	]);
	const [overrides, setOverrides] = useState<Record<string, Override>>({});

	const cells = useMemo(() => {
		const table: Cell[][] = [];

		for (let i = bounds.max; i >= bounds.min; i--) {
			const row: Cell[] = [];
			for (let j = 0; j < textStyles.length; j++) {
				const override = overrides[`${i}:${j}`];

				const cell = {
					...textStyles[j],
					fontSize:
						override?.fontSize ??
						toPrecise(scale(i, base, ratio), precision),
					lineHeight: override?.lineHeight ?? 1,
				};

				row.push(cell);
			}
			table.push(row);
		}
		return table;
	}, [base, ratio, precision, textStyles, overrides, bounds]);

	const onUnlink = (cell: Cell, rowIndex: number, columnIndex: number) => {
		const key = `${rowIndex}:${columnIndex}`;

		setOverrides((prev) => ({
			...prev,
			[key]: {
				lineHeight: cell.lineHeight,
				fontSize: cell.fontSize,
			},
		}));
	};

	const onLink = (rowIndex: number, columnIndex: number) => {
		const key = `${rowIndex}:${columnIndex}`;
		setOverrides(({ [key]: _, ...rest }) => rest);
	};

	const onOverrideChange = (
		update: Partial<Override>,
		rowIndex: number,
		columnIndex: number
	) => {
		const key = `${rowIndex}:${columnIndex}`;

		setOverrides((prev) => {
			if (!(key in prev)) {
				return prev;
			}

			return {
				...prev,
				[key]: {
					...prev[key],
					...update,
				},
			};
		});
	};

	const onBoundIncrement = (bound: keyof Bounds) => {
		setBounds((prevBounds) => {
			const newBound = prevBounds[bound] + 1;

			if (bound === 'min') {
				const prevMin = prevBounds.max;

				setOverrides((prevOverrides) => {
					const nextOverrides = { ...prevOverrides };

					Object.keys(prevOverrides).forEach((key) => {
						if (key.endsWith(`:${prevMin}`)) {
							delete nextOverrides[key];
						}
					});

					return nextOverrides;
				});

				return {
					...prevBounds,
					[bound]: Math.min(newBound, 0),
				};
			}

			return {
				...prevBounds,
				[bound]: newBound,
			};
		});
	};

	const onBoundDecrement = (bound: keyof Bounds) => {
		setBounds((prevBounds) => {
			const newBound = prevBounds[bound] - 1;

			if (bound === 'max') {
				const prevMax = prevBounds.max;

				setOverrides((prevOverrides) => {
					const nextOverrides = { ...prevOverrides };

					Object.keys(prevOverrides).forEach((key) => {
						if (key.startsWith(`${prevMax}:`)) {
							delete nextOverrides[key];
						}
					});

					return nextOverrides;
				});

				return {
					...prevBounds,
					[bound]: Math.max(newBound, 0),
				};
			}

			return {
				...prevBounds,
				[bound]: newBound,
			};
		});
	};

	return (
		<div>
			<aside>
				<Box maxWidth="200px">
					<Flex direction={'column'} gap={'2'}>
						<Text>Project Settings</Text>
						<Flex direction={'column'} gap={'1'}>
							<Text size={'2'}>Preferred Unit</Text>
							<Select.Root
								value={unit}
								onValueChange={(newUnit: Unit) => {
									const isCurrentPx = unit === 'px';
									const isNextPx = newUnit === 'px';

									if (isCurrentPx !== isNextPx) {
										setBase((currentBase) =>
											isNextPx
												? currentBase * 16
												: currentBase / 16
										);
									}

									setUnit(newUnit);
								}}
							>
								<Select.Trigger />
								<Select.Content>
									<Select.Item value={'rem'}>rem</Select.Item>
									<Select.Item value={'px'}>px</Select.Item>
									<Select.Item value={'em'}>em</Select.Item>
								</Select.Content>
							</Select.Root>
						</Flex>
						<Flex direction={'column'} gap={'1'}>
							<Text size={'2'} as="label" htmlFor="precision">
								Decimal Precision
							</Text>
							<TextField.Root
								id={'precision'}
								type={'number'}
								value={precision}
								min={1}
								step={1}
								onChange={(
									event: ChangeEvent<HTMLInputElement>
								) => {
									setPrecision(parseInt(event.target.value));
								}}
							/>
						</Flex>
						<Text>Breakpoint Settings</Text>
						<Flex direction={'column'} gap={'1'}>
							<Text size="2" as="label" htmlFor="base">
								Base Value
							</Text>
							<Flex direction={'row'} gap={'1'}>
								<TextField.Root
									id="base"
									type="number"
									value={base}
									min={1}
									step={unit === 'px' ? 0.05 : 0.005}
									onChange={(
										event: ChangeEvent<HTMLInputElement>
									) => {
										setBase(parseFloat(event.target.value));
									}}
								/>
								<Text>{unit}</Text>
							</Flex>
						</Flex>
						<RatioField
							id={'ratio'}
							label={'Ratio'}
							value={ratio}
							onChange={setRatio}
						/>
					</Flex>
				</Box>
			</aside>

			<main>
				<Box p="4">
					<BreakpointVisualize
						overrides={overrides}
						unit={unit}
						bounds={bounds}
						textStyles={textStyles}
						cells={cells}
						onBoundDecrement={onBoundDecrement}
						onBoundIncrement={onBoundIncrement}
						onLink={onLink}
						onUnlink={onUnlink}
						onOverrideChange={onOverrideChange}
					/>
				</Box>

				<pre>{JSON.stringify(overrides, null, 4)}</pre>
			</main>
		</div>
	);
};
export default Breakpoint;
