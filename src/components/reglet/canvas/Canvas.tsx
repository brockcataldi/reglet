import { VisuallyHidden } from '@radix-ui/themes';

import {
	useBounds,
	useBreakpointTable,
	useStyles,
	useStylesLength,
} from '@/project/hooks';

import HeaderCell from './HeaderCell';
import Row from './Row';
import StyleAdd from './StyleAdd';

import './canvas.css';

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
		<table className="canvas">
			<thead className="canvas__header">
				<tr className="canvas__header-row">
					<th className="canvas__header-cell canvas__header-cell--actions">
						<VisuallyHidden>Row Actions</VisuallyHidden>
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
			<tbody className="canvas__body">
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
