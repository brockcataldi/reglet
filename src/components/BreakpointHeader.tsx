import { Table, IconButton, Tooltip } from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';

import { incrementBound, useBounds } from '../project/slices/bounds';
import { useTextStyles } from '../project/slices/text-styles';
import { suffix } from '../project/helpers';

import BreakpointHeaderCell from './BreakpointHeaderCell';

type BreakpointHeader = {
	id: string;
};

const BreakpointHeader = ({ id }: BreakpointHeader) => {
	const textStyles = useTextStyles();
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
				{textStyles.map((textStyle, index) => (
					<BreakpointHeaderCell
						textStyle={textStyle}
						key={`${id}-text-style-${index}`}
					/>
				))}
			</Table.Row>
		</Table.Header>
	);
};

export default BreakpointHeader;
