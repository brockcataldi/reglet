import { LinkSlashIcon } from '@heroicons/react/24/outline';

import { type Values } from '@/project/types';
import { useSettingsUnit } from '@/project/hooks';
import { enableOverride } from '@/project/actions';
import { Button } from '@/components/ui/Buttons';
import { Stat } from '@/components/ui/Stat';

type CellDetailsProps = {
	values: Values;
	id: string;
	rowIndex: number;
	columnIndex: number;
};

const CellDetails = ({
	values,
	id,
	rowIndex,
	columnIndex,
}: CellDetailsProps) => {
	const unit = useSettingsUnit();

	const onClickUnlink = () => {
		enableOverride(id, rowIndex, columnIndex);
	};

	return (
		<div className="flex w-full flex-row items-end justify-between">
			<div className="flex w-full flex-row items-end justify-start gap-4">
				<Stat label="Font Size" value={`${values.fontSize}${unit}`} />
				<Stat label="Line Height" value={`${values.lineHeight}`} />
			</div>

			<Button onClick={onClickUnlink}>
				<LinkSlashIcon /> Unlink
			</Button>
		</div>
	);
};

export default CellDetails;
