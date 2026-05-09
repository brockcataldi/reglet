import type { ReactNode } from "react";

import { ChevronUp, ChevronDown } from "lucide-react";

import { type Bounds } from "@/project/types";
import { decrementBound, incrementBound } from "@/project/actions";
import { suffix } from "@/project/helpers";

import { IconButton } from "@/components/ui/Buttons";
import { Tooltip } from "@/components/ui/Tooltip";

type RowProps = {
	height: number;
	bounds: Bounds;
	id: string;
	index: number;
	children: ReactNode;
};

const Row = ({ id, bounds, index, height, children }: RowProps) => {
	const rowNumber = bounds.max - index;
	const isTopRow = index === 0;
	const isBottomRow = index === height - 1;
	const canDelete = rowNumber !== 0;

	const actions = [
		{
			key: "increment-max",
			condition: isTopRow,
			content: `Add a ${suffix(bounds.max + 1)} row`,
			top: true,
			onClick: () => incrementBound(id, "max"),
		},
		{
			key: "increment-min",
			condition: canDelete && isBottomRow,
			content: `Delete the ${suffix(bounds.min)} row`,
			top: true,
			onClick: () => incrementBound(id, "min"),
		},
		{
			key: "decrement-min",
			condition: isBottomRow,
			content: `Add a ${suffix(bounds.min - 1)} row`,
			top: false,
			onClick: () => decrementBound(id, "min"),
		},
		{
			key: "decrement-max",
			condition: canDelete && isTopRow,
			content: `Delete the ${suffix(bounds.max)} row`,
			top: false,
			onClick: () => decrementBound(id, "max"),
		},
	];

	return (
		<div className="col-span-(--canvas-col-span) grid grid-cols-subgrid">
			<div className="flex flex-col gap-2">
				{actions.map((action) =>
					!action.condition || !action.top ? null : (
						<Tooltip content={action.content} key={action.key}>
							<IconButton
								onClick={action.onClick}
								content={action.content}
							>
								<ChevronUp />
							</IconButton>
						</Tooltip>
					)
				)}

				<div className="grid h-10 w-10 place-items-center rounded-md border border-neutral-300 bg-neutral-50 text-sm">
					<p>{bounds.max - index}</p>
				</div>

				{actions.map((action) =>
					!action.condition || action.top ? null : (
						<Tooltip content={action.content} key={action.key}>
							<IconButton
								onClick={action.onClick}
								content={action.content}
							>
								<ChevronDown />
							</IconButton>
						</Tooltip>
					)
				)}
			</div>

			{children}
		</div>
	);
};

export default Row;
