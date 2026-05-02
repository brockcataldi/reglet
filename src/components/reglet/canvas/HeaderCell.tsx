import { TrashIcon } from '@heroicons/react/24/outline';

import { type Style } from '@/project/types';

import { removeStyle } from '@/project/actions';

import StyleEdit from './StyleEdit';

import { Stat } from '@/components/ui/Stat';
import { Button } from '@/components/ui/Buttons';

type HeaderCellProps = {
	style: Style;
	length: number;
};

const HeaderCell = ({ style, length }: HeaderCellProps) => {
	const onClickDelete = () => {
		removeStyle(style.id);
	};

	return (
		<th className="w-150">
			<div className="flex w-150 flex-row items-start justify-between gap-2 p-2">
				<div className="flex flex-row items-start gap-2">
					<Stat label="Font Family" value={style.fontFamily} />
					<Stat label="Font Style" value={style.fontStyle} />
					<Stat label="Font Weight" value={style.fontWeight} />
				</div>
				<div className="flex flex-row items-center justify-end gap-3">
					<StyleEdit style={style} />
					{length > 1 ? (
						<Button variant={'error'} onClick={onClickDelete}>
							<TrashIcon />
							Delete
						</Button>
					) : null}
				</div>
			</div>
		</th>
	);
};

export default HeaderCell;
