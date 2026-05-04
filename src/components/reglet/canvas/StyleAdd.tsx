import { useState } from "react";

import { PlusIcon } from "@heroicons/react/24/outline";

import { type Style } from "@/project/types";
import { addStyle } from "@/project/actions";
import { createDefaultTextStyle } from "@/project/creators";
import { Button, DescriptiveIconButton } from "@/components/ui/Buttons";
import StyleEdit from "./StyleEditor";
import {
	DialogRoot,
	DialogTrigger,
	DialogContent,
	DialogClose,
} from "@/components/ui/Dialog";

const StyleAdd = () => {
	const [value, setValue] = useState<Style>(createDefaultTextStyle());

	return (
		<DialogRoot>
			<DialogTrigger>
				<DescriptiveIconButton content="Add Text Style" side="bottom">
					<PlusIcon />
				</DescriptiveIconButton>
			</DialogTrigger>
			<DialogContent
				title="New Text Style"
				description="Add a new Text Style"
			>
				<StyleEdit
					value={value}
					onChange={(newValue) => setValue(newValue)}
				/>
				<div className="flex flex-row gap-4">
					<DialogClose>
						<Button
							onClick={() => {
								addStyle(value);
								setValue(createDefaultTextStyle());
							}}
						>
							Add
						</Button>
					</DialogClose>
					<DialogClose>
						<Button
							onClick={() => {
								setValue(createDefaultTextStyle());
							}}
						>
							Cancel
						</Button>
					</DialogClose>
				</div>
			</DialogContent>
		</DialogRoot>
	);
};

export default StyleAdd;
