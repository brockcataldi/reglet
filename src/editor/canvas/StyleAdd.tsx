import { useState } from "react";

import { Plus } from "lucide-react";

import { type Style } from "@/store/types";
import { addStyle } from "@/store/actions";
import { createDefaultTextStyle } from "@/store/creators";
import { Button, IconButton } from "@/ui/Buttons";

import StyleEdit from "./StyleEditor";
import {
	DialogRoot,
	DialogTrigger,
	DialogContent,
	DialogClose,
} from "@/ui/Dialog";

import { Tooltip } from "@/ui/Tooltip";

const StyleAdd = () => {
	const [value, setValue] = useState<Style>(createDefaultTextStyle());

	return (
		<DialogRoot>
			<Tooltip content="New Style" side="bottom">
				<DialogTrigger asChild>
					<IconButton content="New Style">
						<Plus />
					</IconButton>
				</DialogTrigger>
			</Tooltip>
			<DialogContent title="New Style" description="Add a new Text Style">
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
