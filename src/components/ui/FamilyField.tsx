import { useState, type ChangeEvent } from 'react';

import { WEB_SAFE_FONTS } from '@/project/constants';
import { Button } from './Buttons';
import { TextBox } from './TextBox';
import { Select } from './Select';

import { Select as SelectPrimitve } from 'radix-ui';

type FamilyFieldProps = {
	id: string;
	value: string;
	onChange: (newValue: string) => void;
};

const FamilyField = ({ id, value, onChange }: FamilyFieldProps) => {
	const [isManual, setIsManual] = useState(false);

	const matched = WEB_SAFE_FONTS.find((font) => font === value);
	const showCustomInput = isManual || !matched;
	const selectValue = matched && !isManual ? matched : 'custom';

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
						if (newValue === 'custom') {
							setIsManual(true);
						} else {
							setIsManual(false);
							onChange(newValue);
						}
					}}
				>
					<SelectPrimitve.Item value="custom">
						Custom
					</SelectPrimitve.Item>
					<SelectPrimitve.Separator />
					<SelectPrimitve.Group>
						<SelectPrimitve.Label>Installed</SelectPrimitve.Label>
						<SelectPrimitve.Item value="none-installed" disabled>
							None Installed
						</SelectPrimitve.Item>
					</SelectPrimitve.Group>
					<SelectPrimitve.Separator />
					<SelectPrimitve.Group>
						<SelectPrimitve.Label>Web Safe</SelectPrimitve.Label>
						{WEB_SAFE_FONTS.map((webSafeFont) => (
							<SelectPrimitve.Item
								value={webSafeFont}
								key={`${id}-web-safe-${webSafeFont}`}
							>
								{webSafeFont}
							</SelectPrimitve.Item>
						))}
					</SelectPrimitve.Group>
				</Select>
			)}
		</div>
	);
};

export default FamilyField;
