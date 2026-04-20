import { Table, VisuallyHidden } from '@radix-ui/themes';

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
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.ColumnHeaderCell width="40px">
						<VisuallyHidden>Row Actions</VisuallyHidden>
						<StyleAdd />
					</Table.ColumnHeaderCell>
					{styles.map((style, index) => (
						<Table.ColumnHeaderCell
							width="500px"
							key={`${id}-text-style-${index}`}
						>
							<HeaderCell style={style} length={stylesLength} />
						</Table.ColumnHeaderCell>
					))}
					<Table.ColumnHeaderCell width="500px">
						<VisuallyHidden>
							Add another text style column
						</VisuallyHidden>
					</Table.ColumnHeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
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
			</Table.Body>
		</Table.Root>
	);
};

export default Canvas;
