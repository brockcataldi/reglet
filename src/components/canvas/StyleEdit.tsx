import { useState, type ChangeEvent } from 'react';
import {
	Flex,
	Text,
	Dialog,
	Button,
	TextField,
	Box,
	DataList,
	Separator,
	SegmentedControl,
	Card,
} from '@radix-ui/themes';

import { Pencil1Icon } from '@radix-ui/react-icons';

import type { Style } from '../../project/types';

import { updateStyle } from '../../project/slices/styles';

import FamilyField from '../ui/FamilyField';

type StyleEditProps = {
	style: Style;
};

const StyleEdit = ({ style }: StyleEditProps) => {
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

	const onClickSave = () => {
		updateStyle(style.id, preview);
	};

	const onClickCancel = () => {
		setPreview(style);
	};

	return (
		<Dialog.Root>
			<Dialog.Trigger>
				<Button>
					<Pencil1Icon />
					Edit
				</Button>
			</Dialog.Trigger>
			<Dialog.Content maxWidth="600px">
				<Dialog.Title size={'7'}>Text Settings</Dialog.Title>
				<Dialog.Description>
					Customize the text appearance for this column.
				</Dialog.Description>

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
										display === 'heading'
											? 'nowrap'
											: 'wrap',
									overflow: 'hidden',
								}}
							>
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Ullam provident eaque quas
								tempore. Nostrum cupiditate expedita velit,
								obcaecati delectus qui unde, fugit nemo laborum
								debitis saepe, quas quis quo suscipit.
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
							<Text
								as="label"
								htmlFor={`${style.id}-font-family`}
							>
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
						<DataList.Label minWidth="88px">
							Font Style
						</DataList.Label>
						<DataList.Value>
							<TextField.Root
								type="text"
								value={preview.fontStyle}
								onChange={onChangeFontStyle}
							/>
						</DataList.Value>
					</DataList.Item>
					<DataList.Item>
						<DataList.Label minWidth="88px">
							Font Weight
						</DataList.Label>
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

				<Flex gap="3" mt="4" justify="end">
					<Dialog.Close>
						<Button
							variant="soft"
							color="gray"
							onClick={onClickCancel}
						>
							Cancel
						</Button>
					</Dialog.Close>
					<Dialog.Close>
						<Button onClick={onClickSave}>Save</Button>
					</Dialog.Close>
				</Flex>
			</Dialog.Content>
		</Dialog.Root>
	);
};

export default StyleEdit;
