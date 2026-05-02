import { type Values } from '@/project/types';
import { useOverride } from '@/project/hooks';

import Display from '@/components/ui/Display';

import CellEdit from './CellEdit';
import CellDetails from './CellDetails';

type CellProps = {
	values: Values;
	id: string;
	rowIndex: number;
	columnIndex: number;
};

const Cell = ({ values, id, rowIndex, columnIndex }: CellProps) => {
	const override = useOverride(id, rowIndex, columnIndex);

	return (
		<td className="w-150">
			<div className="flex w-150 flex-col items-start justify-start gap-2 p-2">
				<Display
					type="values"
					value={values}
					defaultType={
						values.lineHeight === 1.5 ? 'paragraph' : 'heading'
					}
				/>

				{override === undefined ? (
					<CellDetails
						values={values}
						id={id}
						rowIndex={rowIndex}
						columnIndex={columnIndex}
					/>
				) : (
					<CellEdit
						id={id}
						rowIndex={rowIndex}
						columnIndex={columnIndex}
					/>
				)}
			</div>
		</td>
	);
};

export default Cell;
