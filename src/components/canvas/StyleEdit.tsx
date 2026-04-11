import { useState, type ChangeEvent } from 'react';
import {
	Flex,
	Text,
	TextField,
	Box,
	DataList,
	Separator,
	SegmentedControl,
	Card,
	VisuallyHidden,
} from '@radix-ui/themes';

import { HeadingIcon, PilcrowIcon } from '@radix-ui/react-icons';

import type { Style } from '@/project';

import FamilyField from '$/ui/FamilyField';

type StyleEditProps = {
	value: Style;
	onChange: (value: Style) => void;
};

const StyleEdit = ({ value, onChange }: StyleEditProps) => {
	const [display, setDisplay] = useState<'heading' | 'paragraph'>('heading');

	const onChangeDisplay = (newDisplay: 'heading' | 'paragraph') => {
		setDisplay(newDisplay);
	};

	const onChangeFontFamily = (fontFamily: string) => {
		onChange({
			...value,
			fontFamily,
		});
	};

	const onChangeFontStyle = (event: ChangeEvent<HTMLInputElement>) => {
		onChange({
			...value,
			fontStyle: event.target.value,
		});
	};

	const onChangeFontWeight = (event: ChangeEvent<HTMLInputElement>) => {
		onChange({
			...value,
			fontWeight: event.target.value,
		});
	};

	return (
		<Box>
			<Card mt="4">
				<Flex
					gap={'4'}
					direction={'column'}
					align={'start'}
					justify={'start'}
				>
					<SegmentedControl.Root
						value={display}
						onValueChange={onChangeDisplay}
					>
						<SegmentedControl.Item value="heading">
							<Flex
								direction="column"
								align="center"
								justify="center"
							>
								<HeadingIcon />
							</Flex>
							<VisuallyHidden>Heading</VisuallyHidden>
						</SegmentedControl.Item>
						<SegmentedControl.Item value="paragraph">
							<Flex
								direction="column"
								align="center"
								justify="center"
							>
								<PilcrowIcon />
							</Flex>
							<VisuallyHidden>Paragraph</VisuallyHidden>
						</SegmentedControl.Item>
					</SegmentedControl.Root>
					<Box width={'100%'}>
						<p
							style={{
								width: '100%',
								fontFamily: value.fontFamily,
								fontStyle: value.fontStyle,
								fontWeight: value.fontWeight,
								fontSize:
									display === 'heading' ? '2rem' : '1rem',
								margin: '0',
								whiteSpace:
									display === 'heading' ? 'nowrap' : 'wrap',
								overflow: 'hidden',
								lineHeight: '1.5',
							}}
						>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Ullam provident eaque quas tempore. Nostrum
							cupiditate expedita velit, obcaecati delectus qui
							unde, fugit nemo laborum debitis saepe, quas quis
							quo suscipit.
						</p>
					</Box>
				</Flex>
			</Card>

			<Separator orientation={'horizontal'} size={'4'} my={'4'} />

			<DataList.Root>
				<DataList.Item align="center">
					<DataList.Label minWidth="88px">
						<Text as="label" htmlFor={`${value.id}-font-family`}>
							Font Family
						</Text>
					</DataList.Label>
					<DataList.Value>
						<FamilyField
							id={`${value.id}-font-family`}
							value={value.fontFamily}
							onChange={onChangeFontFamily}
						/>
					</DataList.Value>
				</DataList.Item>
				<DataList.Item>
					<DataList.Label minWidth="88px">
						<Text as="label" htmlFor={`${value.id}-font-style`}>
							Font Style
						</Text>
					</DataList.Label>
					<DataList.Value>
						<TextField.Root
							id={`${value.id}-font-style`}
							type="text"
							value={value.fontStyle}
							onChange={onChangeFontStyle}
						/>
					</DataList.Value>
				</DataList.Item>
				<DataList.Item>
					<DataList.Label minWidth="88px">
						<Text as="label" htmlFor={`${value.id}-font-weight`}>
							Font Weight
						</Text>
					</DataList.Label>
					<DataList.Value>
						<TextField.Root
							id={`${value.id}-font-weight`}
							type="text"
							value={value.fontWeight}
							onChange={onChangeFontWeight}
						/>
					</DataList.Value>
				</DataList.Item>
			</DataList.Root>
		</Box>
	);
};

export default StyleEdit;
