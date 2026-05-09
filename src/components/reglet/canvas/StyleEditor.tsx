import { type ChangeEvent } from "react";

import type { Style } from "@/project/types";

import FamilyField from "@/components/ui/FamilyField";
import Display from "@/components/ui/Display";
import { TextBox } from "@/components/ui/TextBox";
import { Select, SelectOption } from "@/components/ui/Select";

type StyleEditorProps = {
	value: Style;
	onChange: (value: Style) => void;
};

const StyleEditor = ({ value, onChange }: StyleEditorProps) => {
	const onChangeFontFamily = (fontFamily: string) => {
		onChange({
			...value,
			fontFamily,
		});
	};

	const onChangeFontStyle = (fontStyle: string) => {
		onChange({
			...value,
			fontStyle
		});
	};

	const onChangeFontWeight = (event: ChangeEvent<HTMLInputElement>) => {
		onChange({
			...value,
			fontWeight: event.target.value,
		});
	};

	return (
		<div className="w-full">
			<Display type="style" value={value} />

			<dl className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-3 my-4">
				<div className="col-span-2 grid grid-cols-subgrid items-center">
					<dt className="col-span-1">
						<label htmlFor={`${value.id}-font-family`}>
							Font Family
						</label>
					</dt>
					<dd className="col-span-1">
						<FamilyField
							id={`${value.id}-font-family`}
							value={value.fontFamily}
							onChange={onChangeFontFamily}
						/>
					</dd>
				</div>
				<div className="col-span-2 grid grid-cols-subgrid items-center">
					<dt className="col-span-1">
						<label htmlFor={`${value.id}-font-style`}>
							Font Style
						</label>
					</dt>
					<dd className="col-span-1">
						<Select value={value.fontStyle}
							onValueChange={onChangeFontStyle}>
							<SelectOption value="normal">Normal</SelectOption>
							<SelectOption value="italic">Italic</SelectOption>
						</Select>
					</dd>
				</div>
				<div className="col-span-2 grid grid-cols-subgrid items-center">
					<dt className="col-span-1">
						<label htmlFor={`${value.id}-font-weight`}>
							Font Weight
						</label>
					</dt>
					<dd className="col-span-1">
						<TextBox
							id={`${value.id}-font-weight`}
							type="text"
							value={value.fontWeight}
							onChange={onChangeFontWeight}
						/>
					</dd>
				</div>
			</dl>
		</div>
	);
};

export default StyleEditor;
