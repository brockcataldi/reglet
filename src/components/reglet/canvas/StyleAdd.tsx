import { useState } from "react";

import { Dialog } from "radix-ui";

import { PlusIcon } from "@heroicons/react/24/outline";

import { type Style } from "@/project/types";
import { addStyle } from "@/project/actions";
import { createDefaultTextStyle } from "@/project/creators";

import { DescriptiveIconButton } from "@/components/ui/IconButtons";
import { Button } from "@/components/ui/Buttons";
import StyleEdit from "./StyleEditor";

const StyleAdd = () => {
	const [value, setValue] = useState<Style>(createDefaultTextStyle());

	return (
		<h1>Hello World</h1>
		// <Dialog.Root>
		// 	<Dialog.Trigger>
		// 		<DescriptiveIconButton content="Add Text Style">
		// 			<PlusIcon />
		// 		</DescriptiveIconButton>
		// 	</Dialog.Trigger>
		// 	<Dialog.Content>
		// 		<Dialog.Title>New Text Style</Dialog.Title>
		// 		<Dialog.Description>Add a new text style</Dialog.Description>

		// 		<StyleEdit
		// 			value={value}
		// 			onChange={(newValue) => setValue(newValue)}
		// 		/>
		// 		<div className="flex flex-row gap-4">
		// 			<Dialog.Close>
		// 				<Button
		// 					onClick={() => {
		// 						addStyle(value);
		// 						setValue(createDefaultTextStyle());
		// 					}}
		// 				>
		// 					Add
		// 				</Button>
		// 			</Dialog.Close>
		// 			<Dialog.Close>
		// 				<Button
		// 					onClick={() => {
		// 						setValue(createDefaultTextStyle());
		// 					}}
		// 				>
		// 					Cancel
		// 				</Button>
		// 			</Dialog.Close>
		// 		</div>
		// 	</Dialog.Content>
		// </Dialog.Root>
	);
};

export default StyleAdd;
