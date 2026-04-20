import { useState } from 'react';

import { Flex, Button, Dialog } from '@radix-ui/themes';

import { PlusIcon } from '@radix-ui/react-icons';

import { type Style } from '@/project/types';

import { addStyle } from '@/project/actions';
import { createDefaultTextStyle } from '@/project/creators';

import DescriptiveIconButton from '@/components/ui/DescriptiveIconButton';

import StyleEdit from './StyleEditor';

const StyleAdd = () => {
	const [value, setValue] = useState<Style>(createDefaultTextStyle());

	const onClickAdd = () => {
		addStyle(value);
		setValue(createDefaultTextStyle());
	};

	const onClickCancel = () => {
		setValue(createDefaultTextStyle());
	};

	return (
		<Dialog.Root>
			<Dialog.Trigger>
				<DescriptiveIconButton content="Add Text Style" size="3">
					<PlusIcon />
				</DescriptiveIconButton>
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Title>New Text Style</Dialog.Title>
				<Dialog.Description>Add a new text style</Dialog.Description>

				<StyleEdit
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
						<Button onClick={onClickAdd}>Add</Button>
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

export default StyleAdd;
