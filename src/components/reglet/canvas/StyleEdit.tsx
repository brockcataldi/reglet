import { useState } from "react";
import { Dialog } from "radix-ui";

import { PencilIcon } from "@heroicons/react/24/outline";

import { type Style } from "@/project/types";
import { updateStyle } from "@/project/actions";
import { Button } from "@/components/ui/Buttons";

import StyleEditor from "./StyleEditor";

type StyleEditProps = {
	style: Style;
};

const StyleEdit = ({ style }: StyleEditProps) => {
	const [value, setValue] = useState<Style>(style);

	return (
		<h1>Hello World!</h1>
		// <Dialog.Root>
		// 	<Dialog.Trigger>
		// 		<Button>
		// 			<PencilIcon />
		// 			Edit
		// 		</Button>
		// 	</Dialog.Trigger>
		// 	<Dialog.Content>
		// 		<Dialog.Title>Style Settings</Dialog.Title>
		// 		<Dialog.Description>
		// 			Modify the appearance of the Text Style.
		// 		</Dialog.Description>

		// 		<StyleEditor
		// 			value={value}
		// 			onChange={(newValue) => setValue(newValue)}
		// 		/>

		// 		<div className="flex flex-row gap-4">
		// 			<Dialog.Close>
		// 				<Button
		// 					onClick={() => {
		// 						updateStyle(style.id, value);
		// 					}}
		// 				>
		// 					Save
		// 				</Button>
		// 			</Dialog.Close>
		// 			<Dialog.Close>
		// 				<Button
		// 					onClick={() => {
		// 						setValue(style);
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

export default StyleEdit;
