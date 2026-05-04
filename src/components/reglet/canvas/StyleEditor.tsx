import { type ChangeEvent } from "react";

import type { Style } from "@/project/types";

import FamilyField from "@/components/ui/FamilyField";
import Display from "@/components/ui/Display";
import { TextBox } from "@/components/ui/TextBox";

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

	const onChangeFontStyle = (event: ChangeEvent<HTMLInputElement>) => {
		onChange({
			...value,
			fontStyle: event.target.value,
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

			<hr className="my-4" />

			<dl>
				<dt>
					<label htmlFor={`${value.id}-font-family`}>
						Font Family
					</label>
				</dt>
				<dd>
					<FamilyField
						id={`${value.id}-font-family`}
						value={value.fontFamily}
						onChange={onChangeFontFamily}
					/>
				</dd>
				<dt>
					<label htmlFor={`${value.id}-font-style`}>Font Style</label>
				</dt>
				<dd>
					<TextBox
						id={`${value.id}-font-style`}
						type="text"
						value={value.fontStyle}
						onChange={onChangeFontStyle}
					/>
				</dd>
				<dt>
					<label htmlFor={`${value.id}-font-weight`}>
						Font Weight
					</label>
				</dt>
				<dd>
					<TextBox
						id={`${value.id}-font-weight`}
						type="text"
						value={value.fontWeight}
						onChange={onChangeFontWeight}
					/>
				</dd>
			</dl>
		</div>
	);
};

export default StyleEditor;
