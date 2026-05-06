import { useState } from "react";

import { type Style, type Values } from "@/project/types";
import { useSettingsUnit } from "@/project/hooks";

import { RadioBadge, RadioBadges } from "@/components/ui/RadioBadges";

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
	const [display, setDisplay] = useState<DisplayType>(
		defaultType ?? "heading"
	);

	const onChangeDisplay = (newDisplay: DisplayType) => {
		setDisplay(newDisplay);
	};

	return (
		<div className="flex w-full flex-col items-start justify-start gap-4">
			<div className="flex flex-row items-center justify-start">
				<RadioBadges
					className="grid grid-cols-2 gap-2"
					value={display}
					onValueChange={onChangeDisplay}
				>
					<RadioBadge value="heading">
						<span className="text-sm">Heading</span>
					</RadioBadge>
					<RadioBadge value="paragraph">
						<span className="text-sm">Paragraph</span>
					</RadioBadge>
				</RadioBadges>
			</div>
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
