import type { ChangeEvent } from "react";
import { Link, Unlink } from "lucide-react";

import { type Values } from "@/store/types";
import { useOverride, useSettingsUnit } from "@/store/hooks";
import {
	disableOverride,
	enableOverride,
	updateOverride,
} from "@/store/actions";

import UnitField from "@/ui/UnitField";
import Display from "@/ui/Display";
import { Stat } from "@/ui/Stat";
import { Button } from "@/ui/Buttons";
import { TextBox } from "@/ui/TextBox";

type CellProps = {
	values: Values;
	id: string;
	rowIndex: number;
	columnIndex: number;
};

const Cell = ({ values, id, rowIndex, columnIndex }: CellProps) => {
	const override = useOverride(id, rowIndex, columnIndex);
	const unit = useSettingsUnit();

	const onClickUnlink = () => {
		enableOverride(id, rowIndex, columnIndex);
	};

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
		<div className="flex w-full flex-col items-start justify-start gap-2 p-2">
			<Display
				type="values"
				value={values}
				defaultType={
					values.lineHeight === 1.5 ? "paragraph" : "heading"
				}
			/>

			{override === undefined ? (
				<div className="flex w-full flex-row items-end justify-between">
					<div className="grid w-full grid-cols-4 gap-2">
						<Stat
							label="Font Size"
							value={`${values.fontSize}${unit}`}
						/>
						<Stat
							label="Line Height"
							value={`${values.lineHeight}`}
						/>
					</div>

					<Button onClick={onClickUnlink}>
						<Unlink /> Unlink
					</Button>
				</div>
			) : (
				<div className="flex w-full flex-row items-end justify-between gap-3">
					<div className="grid w-full grid-cols-4 gap-2">
						<div className="flex flex-col items-start">
							<label
								className="text-sm text-neutral-500"
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
								className="text-sm text-neutral-500"
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
						<Link /> Link
					</Button>
				</div>
			)}
		</div>
	);
};

export default Cell;
