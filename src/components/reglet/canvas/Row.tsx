import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

import { type Bounds, type Values } from "@/project/types";
import { decrementBound, incrementBound } from "@/project/actions";
import { suffix } from "@/project/helpers";

import { DescriptiveIconButton } from "@/components/ui/Buttons";

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
						<DescriptiveIconButton
							content={`Add a ${suffix(bounds.max + 1)} row`}
							onClick={() => incrementBound(id, "max")}
						>
							<ChevronUpIcon />
						</DescriptiveIconButton>
					)}

					{canDelete && isBottomRow && (
						<DescriptiveIconButton
							content={`Delete the ${suffix(bounds.min)} row`}
							color="red"
							onClick={() => incrementBound(id, "min")}
						>
							<ChevronUpIcon />
						</DescriptiveIconButton>
					)}

					<div className="grid h-10 w-10 place-items-center rounded-md bg-neutral-100 text-sm">
						<p>{bounds.max - index}</p>
					</div>

					{isBottomRow && (
						<DescriptiveIconButton
							content={`Add a ${suffix(bounds.min - 1)} row`}
							onClick={() => decrementBound(id, "min")}
						>
							<ChevronDownIcon />
						</DescriptiveIconButton>
					)}

					{canDelete && isTopRow && (
						<DescriptiveIconButton
							content={`Delete the ${suffix(bounds.max)} row`}
							onClick={() => decrementBound(id, "max")}
						>
							<ChevronDownIcon />
						</DescriptiveIconButton>
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
