import { Trash } from "lucide-react";

import { type Style } from "@/project/types";
import { removeStyle } from "@/project/actions";

import StyleEdit from "./StyleEdit";

import { Stat } from "@/components/ui/Stat";
import { IconButton } from "@/components/ui/Buttons";
import { Tooltip } from "@/components/ui/Tooltip";

type HeaderCellProps = {
	style: Style;
	length: number;
};

const HeaderCell = ({ style, length }: HeaderCellProps) => {
	const onClickDelete = () => {
		removeStyle(style.id);
	};

	return (
		<th className="w-150 p-2">
			<div className="flex w-146 flex-row items-start justify-between gap-2 rounded-md border border-neutral-300 bg-neutral-50 p-2">
				<div className="grid w-full grid-cols-5">
					<Stat label="Font Family" value={style.fontFamily} />
					<Stat label="Font Style" value={style.fontStyle} />
					<Stat label="Font Weight" value={style.fontWeight} />
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
		</th>
	);
};

export default HeaderCell;
