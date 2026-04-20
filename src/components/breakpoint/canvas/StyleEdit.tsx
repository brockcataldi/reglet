import { useState } from 'react';

import { Flex, Dialog, Button } from '@radix-ui/themes';
import { Pencil1Icon } from '@radix-ui/react-icons';

import { type Style } from '@/project/types';

import { updateStyle } from '@/project/actions';

import StyleEditor from './StyleEditor';

type StyleEditProps = {
	style: Style;
};

const StyleEdit = ({ style }: StyleEditProps) => {
	const [value, setValue] = useState<Style>(style);

	const onClickCancel = () => {
		setValue(style);
	};
	const onClickSave = () => {
		updateStyle(style.id, value);
	};

	return (
		<Dialog.Root>
			<Dialog.Trigger>
				<Button>
					<Pencil1Icon />
					Edit
				</Button>
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Title>Style Settings</Dialog.Title>
				<Dialog.Description>
					Modify the appearance of the Text Style.
				</Dialog.Description>

				<StyleEditor
					value={value}
					onChange={(newValue) => setValue(newValue)}
				/>

				<Flex
					direction="row"
					gap="2"
					align="center"
					justify="end"
				>
					<Dialog.Close>
						<Button onClick={onClickSave}>Save</Button>
					</Dialog.Close>
					<Dialog.Close>
						<Button
							variant="soft"
							color="gray"
							onClick={onClickCancel}
						>
							Cancel
						</Button>
					</Dialog.Close>
				</Flex>
			</Dialog.Content>
		</Dialog.Root>
	);
};

export default StyleEdit;
