import { useState, type ChangeEvent } from "react";

import { WEB_SAFE_FONTS } from "@/project/constants";
import { Button } from "./Buttons";
import { TextBox } from "./TextBox";
import {
	Select,
	SelectGroup,
	SelectLabel,
	SelectOption,
	SelectSeparator,
} from "./Select";

type FamilyFieldProps = {
	id: string;
	value: string;
	onChange: (newValue: string) => void;
};

const FamilyField = ({ id, value, onChange }: FamilyFieldProps) => {
	const [isManual, setIsManual] = useState(false);

	const matched = WEB_SAFE_FONTS.find((font) => font === value);
	const showCustomInput = isManual || !matched;
	const selectValue = matched && !isManual ? matched : "custom";

	return (
		<div>
			{showCustomInput ? (
				<div className="flex flex-row gap-2">
					<TextBox
						id={id}
						type="text"
						min={1}
						step={0.01}
						value={value}
						onChange={(event: ChangeEvent<HTMLInputElement>) => {
							onChange(event.target.value);
						}}
					></TextBox>
					<Button
						onClick={() => {
							setIsManual(false);
							onChange(WEB_SAFE_FONTS[0]);
						}}
					>
						Back to Presets
					</Button>
				</div>
			) : (
				<Select
					value={selectValue}
					onValueChange={(newValue) => {
						if (newValue === "custom") {
							setIsManual(true);
						} else {
							setIsManual(false);
							onChange(newValue);
						}
					}}
				>
					<SelectOption value="custom">Custom</SelectOption>
					<SelectSeparator />
					<SelectGroup>
						<SelectLabel>Installed</SelectLabel>
						<SelectOption value="none-installed" disabled>
							None Installed
						</SelectOption>
					</SelectGroup>
					<SelectSeparator />
					<SelectGroup>
						<SelectLabel>Web Safe</SelectLabel>
						{WEB_SAFE_FONTS.map((webSafeFont) => (
							<SelectOption
								value={webSafeFont}
								key={`${id}-web-safe-${webSafeFont}`}
							>
								{webSafeFont}
							</SelectOption>
						))}
					</SelectGroup>
				</Select>
			)}
		</div>
	);
};

export default FamilyField;
