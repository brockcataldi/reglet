import type { Breakpoint, ProjectType } from '@/project/types';
import { Box, DataList, Heading, Text, TextField } from '@radix-ui/themes';
import type { ChangeEvent } from 'react';

type SizesProps = {
	type: ProjectType;
	breakpoints: Breakpoint[];
	onChange: (updatedBreakpoints: Breakpoint[]) => void;
};
const Sizes = ({ type, breakpoints, onChange }: SizesProps) => {
	const update = (id: string, width: number) => {
		onChange(
			breakpoints.map((breakpoint) =>
				id === breakpoint.id
					? {
							...breakpoint,
							width,
						}
					: breakpoint
			)
		);
	};

	return (
		<Box>
			<Heading as="h2" mb="2">
				Edit Breakpoint Sizes
			</Heading>
			<Box p="3">
				<DataList.Root>
					{breakpoints.map((breakpoint, index) => (
						<DataList.Item key={breakpoint.id}>
							<DataList.Label>
								<Text as="label" htmlFor={breakpoint.id}>
									{type === 'fluid'
										? index === 0
											? 'Minimum'
											: 'Maximum'
										: 'Breakpoint Size'}
								</Text>
							</DataList.Label>
							<DataList.Value>
								<TextField.Root
									id={breakpoint.id}
									type="number"
									step={1}
									value={breakpoint.width}
									onChange={(
										event: ChangeEvent<HTMLInputElement>
									) => {
										update(
											breakpoint.id,
											parseInt(event.target.value)
										);
									}}
								/>
							</DataList.Value>
						</DataList.Item>
					))}
				</DataList.Root>
			</Box>
		</Box>
	);
};

export default Sizes;
