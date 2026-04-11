import { useState, type ChangeEvent } from 'react';
import { Box, Button, Flex, Select, TextField } from '@radix-ui/themes';

import { WEB_SAFE_FONTS } from '@/project';

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
		<Box>
			{showCustomInput ? (
				<Flex direction={'row'} gap="1">
					<TextField.Root
						id={id}
						type="text"
						min={1}
						step={0.01}
						value={value}
						onChange={(event: ChangeEvent<HTMLInputElement>) => {
							onChange(event.target.value);
						}}
					></TextField.Root>
					<Button
						onClick={() => {
							setIsManual(false);
							onChange(WEB_SAFE_FONTS[0]);
						}}
					>
						Back to Presets
					</Button>
				</Flex>
			) : (
				<Select.Root
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
					<Select.Trigger id={id} />
					<Select.Content>
						<Select.Item value="custom">Custom</Select.Item>
						<Select.Separator />
						<Select.Group>
							<Select.Label>Installed</Select.Label>
							<Select.Item value="none-installed" disabled>
								None Installed
							</Select.Item>
						</Select.Group>
						<Select.Separator />
						<Select.Group>
							<Select.Label>Web Safe</Select.Label>
							{WEB_SAFE_FONTS.map((webSafeFont) => (
								<Select.Item
									value={webSafeFont}
									key={`${id}-web-safe-${webSafeFont}`}
								>
									{webSafeFont}
								</Select.Item>
							))}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			)}
		</Box>
	);
};

export default FamilyField;
