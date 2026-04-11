import { useState } from 'react';

import { Flex, Card, Text, Dialog, Button } from '@radix-ui/themes';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';

import { removeStyle, updateStyle, type Style } from '@/project';

import StyleEdit from './StyleEdit';

type EditProps = {
	style: Style;
};

const Edit = ({ style }: EditProps) => {
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

				<StyleEdit
					value={value}
					onChange={(newValue) => setValue(newValue)}
				/>

				<Flex
					direction={'row'}
					gap={'2'}
					align={'center'}
					justify={'end'}
					mt={'4'}
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

type HeaderCellProps = {
	style: Style;
	length: number;
};

const HeaderCell = ({ style, length }: HeaderCellProps) => {
	const onClickDelete = () => {
		removeStyle(style.id);
	};

	return (
		<Card>
			<Flex direction={'row'} justify={'between'} align={'center'}>
				<Flex direction={'column'} gap={'2'}>
					<Flex direction={'row'} gap="6" width={'100%'}>
						<Flex direction={'column'} align="start">
							<Text size={'2'} weight={'regular'}>
								Font Family
							</Text>
							<Text>{style.fontFamily}</Text>
						</Flex>
						<Flex direction={'column'} align="start">
							<Text size={'2'} weight={'regular'}>
								Font Style
							</Text>
							<Text>{style.fontStyle}</Text>
						</Flex>
						<Flex direction={'column'} align="start">
							<Text size={'2'} weight={'regular'}>
								Font Weight
							</Text>
							<Text>{style.fontWeight}</Text>
						</Flex>
					</Flex>
				</Flex>

				<Flex direction="row" justify="end" align="center" gap="2">
					<Edit style={style} />
					{length > 1 ? (
						<Button color="red" onClick={onClickDelete}>
							<TrashIcon />
							Delete
						</Button>
					) : null}
				</Flex>
			</Flex>
		</Card>
	);
};

export default HeaderCell;
