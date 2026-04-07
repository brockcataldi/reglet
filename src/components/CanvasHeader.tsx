import { Table, IconButton, Tooltip } from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';

import { incrementBound, useBounds } from '../project/slices/bounds';
import { useStyles } from '../project/slices/styles';
import { suffix } from '../project/helpers';

import CanvasHeaderCell from './CanvasHeaderCell';

type CanvasHeaderProps = {
	id: string;
};

const CanvasHeader = ({ id }: CanvasHeaderProps) => {
	const styles = useStyles();
	const bounds = useBounds(id);

	if (!bounds) {
		return;
	}

	return (
		<Table.Header>
			<Table.Row>
				<Table.ColumnHeaderCell>
					<Tooltip content={`Add a ${suffix(bounds.max + 1)} row`}>
						<IconButton
							size={'3'}
							onClick={() => {
								incrementBound(id, 'max');
							}}
						>
							<PlusIcon />
						</IconButton>
					</Tooltip>
				</Table.ColumnHeaderCell>
				{styles.map((style, index) => (
					<CanvasHeaderCell
						style={style}
						key={`${id}-text-style-${index}`}
					/>
				))}
			</Table.Row>
		</Table.Header>
	);
};

export default CanvasHeader;
