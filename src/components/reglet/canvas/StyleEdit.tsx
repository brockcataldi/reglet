import { useState } from "react";
import { Pencil } from "lucide-react";

import { type Style } from "@/project/types";
import { updateStyle } from "@/project/actions";
import { Button, IconButton } from "@/components/ui/Buttons";

import StyleEditor from "./StyleEditor";
import {
	DialogRoot,
	DialogTrigger,
	DialogContent,
	DialogClose,
} from "@/components/ui/Dialog";
import { Tooltip } from "@/components/ui/Tooltip";

type StyleEditProps = {
	style: Style;
};

const StyleEdit = ({ style }: StyleEditProps) => {
	const [value, setValue] = useState<Style>(style);

	return (
		<DialogRoot>
			<Tooltip content="Edit Text Style" side="bottom">
				<DialogTrigger asChild>
					<IconButton
						content="Edit Text Style"
						className="rounded-r-none"
					>
						<Pencil />
					</IconButton>
				</DialogTrigger>
			</Tooltip>
			<DialogContent
				title="Style Settings"
				description="Modify the appearance of the Text Style."
			>
				<StyleEditor
					value={value}
					onChange={(newValue) => setValue(newValue)}
				/>
				<div className="flex flex-row gap-4">
					<DialogClose>
						<Button
							onClick={() => {
								updateStyle(style.id, value);
							}}
						>
							Save
						</Button>
					</DialogClose>
					<DialogClose>
						<Button
							onClick={() => {
								setValue(style);
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

export default StyleEdit;
