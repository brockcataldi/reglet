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
} from '@radix-ui/themes';

import type { Style } from '../../project/types';

import FamilyField from '../ui/FamilyField';

type SProps = {
	style: Style;
};

const S = ({ style }: SProps) => {
	const [preview, setPreview] = useState<Style>(style);
	const [display, setDisplay] = useState<'heading' | 'paragraph'>('heading');

	const onChangeDisplay = (newDisplay: 'heading' | 'paragraph') => {
		setDisplay(newDisplay);
	};

	const onChangeFontFamily = (fontFamily: string) => {
		setPreview({
			...preview,
			fontFamily,
		});
	};

	const onChangeFontStyle = (event: ChangeEvent<HTMLInputElement>) => {
		setPreview({
			...preview,
			fontStyle: event.target.value,
		});
	};

	const onChangeFontWeight = (event: ChangeEvent<HTMLInputElement>) => {
		setPreview({
			...preview,
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
					<Box width={'100%'}>
						<p
							style={{
								width: '100%',
								fontFamily: preview.fontFamily,
								fontStyle: preview.fontStyle,
								fontWeight: preview.fontWeight,
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
					<SegmentedControl.Root
						value={display}
						onValueChange={onChangeDisplay}
					>
						<SegmentedControl.Item value="heading">
							Heading
						</SegmentedControl.Item>
						<SegmentedControl.Item value="paragraph">
							Paragraph
						</SegmentedControl.Item>
					</SegmentedControl.Root>
				</Flex>
			</Card>

			<Separator orientation={'horizontal'} size={'4'} my={'4'} />

			<DataList.Root>
				<DataList.Item align="center">
					<DataList.Label minWidth="88px">
						<Text as="label" htmlFor={`${style.id}-font-family`}>
							Font Family
						</Text>
					</DataList.Label>
					<DataList.Value>
						<FamilyField
							id={`${style.id}-font-family`}
							value={preview.fontFamily}
							onChange={onChangeFontFamily}
						/>
					</DataList.Value>
				</DataList.Item>
				<DataList.Item>
					<DataList.Label minWidth="88px">Font Style</DataList.Label>
					<DataList.Value>
						<TextField.Root
							type="text"
							value={preview.fontStyle}
							onChange={onChangeFontStyle}
						/>
					</DataList.Value>
				</DataList.Item>
				<DataList.Item>
					<DataList.Label minWidth="88px">Font Weight</DataList.Label>
					<DataList.Value>
						{' '}
						<TextField.Root
							type="text"
							value={preview.fontWeight}
							onChange={onChangeFontWeight}
						/>
					</DataList.Value>
				</DataList.Item>
			</DataList.Root>
		</Box>
	);
};

export default S;
