import { type ChangeEvent } from 'react';
import { Text, TextField, Box, DataList, Separator } from '@radix-ui/themes';

import type { Style } from '@/project/types';

import FamilyField from '$/ui/FamilyField';
import Display from '$/ui/Display';

type StyleEditProps = {
	value: Style;
	onChange: (value: Style) => void;
};

const StyleEdit = ({ value, onChange }: StyleEditProps) => {
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
		<Box>
			<Display type="style" value={value} />

			<Separator orientation={'horizontal'} size={'4'} my={'4'} />

			<DataList.Root>
				<DataList.Item align="center">
					<DataList.Label minWidth="88px">
						<Text as="label" htmlFor={`${value.id}-font-family`}>
							Font Family
						</Text>
					</DataList.Label>
					<DataList.Value>
						<FamilyField
							id={`${value.id}-font-family`}
							value={value.fontFamily}
							onChange={onChangeFontFamily}
						/>
					</DataList.Value>
				</DataList.Item>
				<DataList.Item>
					<DataList.Label minWidth="88px">
						<Text as="label" htmlFor={`${value.id}-font-style`}>
							Font Style
						</Text>
					</DataList.Label>
					<DataList.Value>
						<TextField.Root
							id={`${value.id}-font-style`}
							type="text"
							value={value.fontStyle}
							onChange={onChangeFontStyle}
						/>
					</DataList.Value>
				</DataList.Item>
				<DataList.Item>
					<DataList.Label minWidth="88px">
						<Text as="label" htmlFor={`${value.id}-font-weight`}>
							Font Weight
						</Text>
					</DataList.Label>
					<DataList.Value>
						<TextField.Root
							id={`${value.id}-font-weight`}
							type="text"
							value={value.fontWeight}
							onChange={onChangeFontWeight}
						/>
					</DataList.Value>
				</DataList.Item>
			</DataList.Root>
		</Box>
	);
};

export default StyleEdit;
