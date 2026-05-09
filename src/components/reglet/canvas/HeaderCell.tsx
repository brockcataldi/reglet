import { Trash } from "lucide-react";

import { type Style } from "@/project/types";
import { removeStyle } from "@/project/actions";

import { Stat } from "@/components/ui/Stat";
import { IconButton } from "@/components/ui/Buttons";
import { Tooltip } from "@/components/ui/Tooltip";

import StyleEdit from "./StyleEdit";

type HeaderCellProps = {
	style: Style;
	length: number;
};

const HeaderCell = ({ style, length }: HeaderCellProps) => {
	const onClickDelete = () => {
		removeStyle(style.id);
	};

	return (
		<div className="flex w-full flex-row items-start justify-between gap-2 rounded-md border border-neutral-300 bg-neutral-50 p-2">
			<div>
				<h2 className="text-2xl font-bold mb-2">{style.fontFamily}</h2>
				<div className="grid w-full grid-cols-3 gap-2">
					<Stat label="Font Style" value={style.fontStyle} />
					<Stat label="Font Weight" value={style.fontWeight} />
				</div>
			</div>


			<div className="flex flex-row items-center justify-end">
				<StyleEdit style={style} />

				{length > 1 ? (
					<Tooltip content="Delete Text Style" side="bottom">
						<IconButton
							variant="destructive"
							className="rounded-l-none"
							content="Delete Text Style"
							onClick={onClickDelete}
						>
							<Trash />
						</IconButton>
					</Tooltip>
				) : null}
			</div>
		</div>
	);
};

export default HeaderCell;
