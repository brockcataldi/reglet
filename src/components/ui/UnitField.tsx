import type { ChangeEvent } from "react";

import { useSettingsUnit } from "@/project/hooks";
import { TextBox } from "@/components/ui/TextBox";

type UnitFieldProps = {
	id: string;
	value: number;
	onChange: (newValue: number) => void;
};

const UnitField = ({ id, value, onChange }: UnitFieldProps) => {
	const unit = useSettingsUnit();

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
				step={unit === "rem" ? 0.005 : 0.05}
				onChange={onChangeValue}
			/>
			<p>{unit}</p>
		</div>
	);
};
export default UnitField;
