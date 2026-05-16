import type { ChangeEvent } from "react";

import type { Unit } from "@/store/types";
import { useSettingsUnit } from "@/store/hooks";

import { TextBox } from "@/ui/TextBox";

type UnitFieldProps = {
	id: string;
	value: number;
	unit?: Unit;
	onChange: (newValue: number) => void;
};

const UnitField = ({ id, value, unit, onChange }: UnitFieldProps) => {
	const unitSettings = useSettingsUnit();

	const selectedUnit = unit ?? unitSettings;

	const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
		onChange(parseFloat(event.target.value));
	};

	return (
		<div className="flex flex-row items-center gap-1">
			<TextBox
				value={value}
				id={id}
				type="number"
				min={0}
				step={
					selectedUnit === "rem"
						? 0.005
						: selectedUnit === "px"
							? 1
							: 0.05
				}
				onChange={onChangeValue}
			/>
			<p>{selectedUnit}</p>
		</div>
	);
};
export default UnitField;
