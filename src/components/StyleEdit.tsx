import { useState, type ChangeEvent } from 'react';
import {
	IconButton,
	Flex,
	Text,
	Dialog,
	Button,
	TextField,
	Grid,
} from '@radix-ui/themes';

import { Pencil1Icon } from '@radix-ui/react-icons';
import type { Style } from '../project/types';
import { updateStyle } from '../project/slices/styles';

type StyleEditProps = {
	style: Style;
};

const StyleEdit = ({ style }: StyleEditProps) => {
	const [preview, setPreview] = useState<Style>(style);

	const onChangeFontFamily = (event: ChangeEvent<HTMLInputElement>) => {
		setPreview({
			...preview,
			fontFamily: event.target.value,
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
				<IconButton>
					<Pencil1Icon />
				</IconButton>
			</Dialog.Trigger>
			<Dialog.Content maxWidth="600px">
				<Dialog.Title size={'7'}>Edit Type Style</Dialog.Title>
				<p
					style={{
						fontFamily: preview.fontFamily,
						fontStyle: preview.fontStyle,
						fontWeight: preview.fontWeight,
					}}
				>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
				</p>

				<Grid columns={'2'} gap={'4'}>
					<Flex direction={'column'} gap={'1'}>
						<Text as="label" size={'2'}>
							Font Family
						</Text>
						<TextField.Root
							type="text"
							value={preview.fontFamily}
							onChange={onChangeFontFamily}
						/>
					</Flex>
					<Flex direction={'column'} gap={'1'}>
						<Text as="label" size={'2'}>
							Font Style
						</Text>
						<TextField.Root
							type="text"
							value={preview.fontStyle}
							onChange={onChangeFontStyle}
						/>
					</Flex>
					<Flex direction={'column'} gap={'1'}>
						<Text as="label" size={'2'}>
							Font Weight
						</Text>
						<TextField.Root
							type="text"
							value={preview.fontWeight}
							onChange={onChangeFontWeight}
						/>
					</Flex>
				</Grid>

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
