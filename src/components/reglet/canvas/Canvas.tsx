import {
	useBounds,
	useBreakpointTable,
	useStyles,
	useStylesLength,
} from '@/project/hooks';

import HeaderCell from './HeaderCell';
import Row from './Row';
import StyleAdd from './StyleAdd';

type CanvasProps = {
	id: string;
};

const Canvas = ({ id }: CanvasProps) => {
	const styles = useStyles();
	const stylesLength = useStylesLength();
	const values = useBreakpointTable(id);
	const bounds = useBounds(id);

	const length = values.length;

	if (!values.length) {
		return;
	}

	if (!bounds) {
		return;
	}

	return (
		<table className="w-full table-fixed border-collapse">
			<colgroup>
				<col className="w-12" />
				<col className="w-150" />
			</colgroup>
			<thead>
				<tr>
					<th className="w-12">
						<span className="sr-only">Row Actions</span>
						<StyleAdd />
					</th>
					{styles.map((style, index) => (
						<HeaderCell
							key={`${id}-text-style-${index}`}
							style={style}
							length={stylesLength}
						/>
					))}
				</tr>
			</thead>
			<tbody>
				{values.map((row, index) => (
					<Row
						key={`${id}-row-${index}`}
						id={id}
						row={row}
						bounds={bounds}
						length={length}
						index={index}
					/>
				))}
			</tbody>
		</table>
	);
};

export default Canvas;
