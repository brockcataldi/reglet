import { useState } from "react";

import { type Style, type Values } from "@/project/types";
import { useSettingsUnit } from "@/project/hooks";

// import { RadioCard, RadioCards } from '@/components/ui/RadioCards';

type DisplayType = "heading" | "paragraph";

type DisplayProps =
	| {
			type: "style";
			defaultType?: DisplayType;
			value: Style;
	  }
	| {
			type: "values";
			defaultType?: DisplayType;
			value: Values;
	  };

const Display = ({ defaultType, type, value }: DisplayProps) => {
	const unit = useSettingsUnit();
	const [display] = useState<DisplayType>(defaultType ?? "heading");

	// const onChangeDisplay = (newDisplay: DisplayType) => {
	// 	setDisplay(newDisplay);
	// };

	return (
		<div className="flex w-full flex-col items-start justify-start gap-4">
			{/* <div className='flex flex-row items-center justify-start'>
				<RadioCards
					className='grid grid-cols-2 gap-2'
					value={display}
					onValueChange={onChangeDisplay}
				>
					<RadioCard value='heading' size='small'>
						<span className="text-sm">Heading</span>
					</RadioCard>
					<RadioCard value='paragraph' size='small'>
						<span className="text-sm">Paragraph</span>
					</RadioCard>
				</RadioCards>
			</div> */}
			<div className="w-full">
				<p
					className="border border-x-0 border-y-neutral-300"
					style={{
						width: "100%",
						fontFamily: value.fontFamily,
						fontStyle: value.fontStyle,
						fontWeight: value.fontWeight,
						lineHeight: type === "style" ? "1.5" : value.lineHeight,
						fontSize:
							type === "style"
								? display === "heading"
									? "2rem"
									: "1rem"
								: `${value.fontSize}${unit}`,
						margin: "0",
						whiteSpace: display === "heading" ? "nowrap" : "wrap",
						overflow: "hidden",
					}}
				>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Ullam provident eaque quas tempore. Nostrum cupiditate
					expedita velit, obcaecati delectus qui unde, fugit nemo
					laborum debitis saepe, quas quis quo suscipit.
				</p>
			</div>
		</div>
	);
};
export default Display;
