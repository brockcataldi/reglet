import { type Style, type Values } from '@/project/types';
import { useSettingsUnit } from '@/project/hooks';

import { HeadingIcon, PilcrowIcon } from '@radix-ui/react-icons';
import { Box, Card, Flex, SegmentedControl } from '@radix-ui/themes';
import { useState } from 'react';

type DisplayType = 'heading' | 'paragraph';

type DisplayProps =
	| {
			type: 'style';
			defaultType?: DisplayType;
			value: Style;
	  }
	| {
			type: 'values';
			defaultType?: DisplayType;
			value: Values;
	  };

const Display = ({ defaultType, type, value }: DisplayProps) => {
	const unit = useSettingsUnit();
	const [display, setDisplay] = useState<DisplayType>(
		defaultType ?? 'heading'
	);

	const onChangeDisplay = (newDisplay: DisplayType) => {
		setDisplay(newDisplay);
	};

	return (
		<Box width="100%">
			<Card>
				<Flex
					gap="4"
					direction="column"
					align="start"
					justify="start"
				>
					<Box width="100%">
						<p
							style={{
								width: '100%',
								fontFamily: value.fontFamily,
								fontStyle: value.fontStyle,
								fontWeight: value.fontWeight,
								lineHeight:
									type === 'style' ? '1.5' : value.lineHeight,
								fontSize:
									type === 'style'
										? display === 'heading'
											? '2rem'
											: '1rem'
										: `${value.fontSize}${unit}`,
								margin: '0',
								whiteSpace:
									display === 'heading' ? 'nowrap' : 'wrap',
								overflow: 'hidden',
							}}
						>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Ullam provident eaque quas tempore. Nostrum
							cupiditate expedita velit, obcaecati delectus qui
							unde, fugit nemo laborum debitis saepe, quas quis
							quo suscipit.
						</p>
					</Box>
					<Flex
						direction="row"
						align="center"
						justify="start"
						width="100%"
					>
						<SegmentedControl.Root
							value={display}
							onValueChange={onChangeDisplay}
						>
							<SegmentedControl.Item value="heading">
								<Flex
									direction="row"
									align="center"
									justify="center"
									gap="1"
								>
									<HeadingIcon />
									Heading
								</Flex>
							</SegmentedControl.Item>
							<SegmentedControl.Item value="paragraph">
								<Flex
									direction="row"
									align="center"
									justify="center"
									gap="1"
								>
									<PilcrowIcon />
									Paragraph
								</Flex>
							</SegmentedControl.Item>
						</SegmentedControl.Root>
					</Flex>
				</Flex>
			</Card>
		</Box>
	);
};
export default Display;
