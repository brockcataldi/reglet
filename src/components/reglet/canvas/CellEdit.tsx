import type { ChangeEvent } from 'react';

import { LinkIcon } from '@heroicons/react/24/outline';

import { disableOverride, updateOverride } from '@/project/actions';
import { useOverride } from '@/project/hooks';

import UnitField from '@/components/ui/UnitField';
import { Button } from '@/components/ui/Buttons';
import { TextBox } from '@/components/ui/TextBox';

type CellEditProps = {
	id: string;
	rowIndex: number;
	columnIndex: number;
};

const CellEdit = ({ id, rowIndex, columnIndex }: CellEditProps) => {
	const override = useOverride(id, rowIndex, columnIndex);

	if (!override) {
		return;
	}

	const onChangeFontSize = (newValue: number) => {
		updateOverride(id, rowIndex, columnIndex, {
			fontSize: newValue,
		});
	};

	const onChangeLineHeight = (event: ChangeEvent<HTMLInputElement>) => {
		updateOverride(id, rowIndex, columnIndex, {
			lineHeight: parseFloat(event.target.value),
		});
	};

	const onClickLink = () => {
		disableOverride(id, rowIndex, columnIndex);
	};

	return (
		<div className="flex w-full flex-row items-end justify-between gap-3">
			<div className="flex w-full flex-row items-end justify-start gap-3">
				<div className="flex flex-col items-start">
					<label
						className="text-sm"
						htmlFor={`${rowIndex}:${columnIndex}-font-size`}
					>
						Font Size
					</label>
					<UnitField
						id={`${rowIndex}:${columnIndex}-font-size`}
						value={override.fontSize}
						onChange={onChangeFontSize}
					/>
				</div>
				<div className="flex flex-col items-start">
					<label
						className="text-sm"
						htmlFor={`${rowIndex}:${columnIndex}-line-height`}
					>
						Line Height
					</label>
					<TextBox
						value={override.lineHeight}
						id={`${rowIndex}:${columnIndex}-line-height`}
						type="number"
						min={1}
						step={0.005}
						onChange={onChangeLineHeight}
					/>
				</div>
			</div>

			<Button onClick={onClickLink}>
				<LinkIcon /> Link
			</Button>
		</div>
	);
};

export default CellEdit;
