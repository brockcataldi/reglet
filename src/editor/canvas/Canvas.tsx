import type { CSSProperties } from "react";

import {
	useBounds,
	useBreakpointTable,
	useStyles,
	useStylesLength,
} from "@/store/hooks";

import HeaderCell from "./HeaderCell";
import Row from "./Row";
import StyleAdd from "./StyleAdd";
import Cell from "./Cell";

type CanvasProps = {
	id: string;
};

const Canvas = ({ id }: CanvasProps) => {
	const styles = useStyles();
	const width = useStylesLength();
	const values = useBreakpointTable(id);
	const bounds = useBounds(id);
	const height = values.length;

	if (!values.length) {
		return;
	}

	if (!bounds) {
		return;
	}

	return (
		<main
			className="ml-64 grid w-full grid-cols-(--canvas-grid) gap-x-6 gap-y-8 p-4"
			style={
				{
					"--canvas-grid": `calc(var(--spacing) * 10) repeat(${width}, calc(var(--spacing) * 150))`,
					"--canvas-col-span": 1 + width,
				} as CSSProperties
			}
		>
			<header className="col-span-(--canvas-col-span) grid grid-cols-subgrid">
				<div>
					<span className="sr-only">Row Actions</span>
					<StyleAdd />
				</div>
				{styles.map((style, index) => (
					<HeaderCell
						key={`${id}-text-style-${index}`}
						style={style}
						length={width}
					/>
				))}
			</header>

			{values.map((row, rowIndex) => (
				<Row
					key={`${id}-row-${rowIndex}`}
					id={id}
					bounds={bounds}
					height={height}
					index={rowIndex}
				>
					{row.map((cell, columnIndex) => (
						<Cell
							key={`${id}-cell-${rowIndex}-${columnIndex}`}
							values={cell}
							id={id}
							rowIndex={bounds.max - rowIndex}
							columnIndex={columnIndex}
						/>
					))}
				</Row>
			))}
		</main>
	);
};

export default Canvas;
