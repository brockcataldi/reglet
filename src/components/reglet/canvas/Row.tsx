import { ChevronUp, ChevronDown } from "lucide-react";

import { type Bounds, type Values } from "@/project/types";
import { decrementBound, incrementBound } from "@/project/actions";
import { suffix } from "@/project/helpers";

import { IconButton } from "@/components/ui/Buttons";
import { Tooltip } from "@/components/ui/Tooltip";

import Cell from "./Cell";

type RowProps = {
	row: Values[];
	length: number;
	bounds: Bounds;
	id: string;
	index: number;
};

const Row = ({ id, bounds, index, row, length }: RowProps) => {
	const rowNumber = bounds.max - index;
	const isTopRow = index === 0;
	const isBottomRow = index === length - 1;
	const canDelete = rowNumber !== 0;

	return (
		<tr>
			<th className="w-12">
				<div className="flex flex-col gap-2">
					{isTopRow && (
						<Tooltip
							content={`Add a ${suffix(bounds.max + 1)} row`}
							onClick={() => incrementBound(id, "max")}
						>
							<IconButton
								content={`Add a ${suffix(bounds.max + 1)} row`}
							>
								<ChevronUp />
							</IconButton>
						</Tooltip>
					)}

					{canDelete && isBottomRow && (
						<Tooltip
							content={`Delete the ${suffix(bounds.min)} row`}
							onClick={() => incrementBound(id, "min")}
						>
							<IconButton
								content={`Delete the ${suffix(bounds.min)} row`}
							>
								<ChevronDown />
							</IconButton>
						</Tooltip>
					)}

					<div className="grid h-10 w-10 place-items-center rounded-md border border-neutral-300 bg-neutral-50 text-sm">
						<p>{bounds.max - index}</p>
					</div>

					{isBottomRow && (
						<Tooltip
							content={`Add a ${suffix(bounds.min - 1)} row`}
							onClick={() => decrementBound(id, "min")}
						>
							<IconButton
								content={`Add a ${suffix(bounds.min - 1)} row`}
							>
								<ChevronDown />
							</IconButton>
						</Tooltip>
					)}

					{canDelete && isTopRow && (
						<Tooltip
							content={`Delete the ${suffix(bounds.max)} row`}
							onClick={() => decrementBound(id, "max")}
						>
							<IconButton
								content={`Delete the ${suffix(bounds.max)} row`}
							>
								<ChevronDown />
							</IconButton>
						</Tooltip>
					)}
				</div>
			</th>
			{row.map((cell, columnIndex) => (
				<Cell
					key={`${id}-cell-${index}-${columnIndex}`}
					values={cell}
					id={id}
					rowIndex={bounds.max - index}
					columnIndex={columnIndex}
				/>
			))}
		</tr>
	);
};

export default Row;
