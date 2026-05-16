import { useState } from "react";

import { type Style, type Values } from "@/store/types";
import { useSettingsUnit } from "@/store/hooks";

import { RadioBadge, RadioBadges } from "@/ui/RadioBadges";
import { Heading, Pilcrow } from "lucide-react";

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
			<div className="flex w-full flex-row items-end justify-start">
				<div className="flex flex-row items-center justify-start gap-2">
					<p className="text-sm text-neutral-500">Preview</p>
					<RadioBadges
						value={display}
						onValueChange={onChangeDisplay}
					>
						<RadioBadge value="heading">
							<Heading />
							<span>Heading</span>
						</RadioBadge>
						<RadioBadge value="paragraph">
							<Pilcrow />
							<span>Paragraph</span>
						</RadioBadge>
					</RadioBadges>
				</div>
			</div>
			<div className="w-full">
				<p
					className="line-clamp-3 border border-x-0 border-y-neutral-300"
					style={{
						width: "100%",
						fontFamily: value.fontFamily,
						fontStyle: value.fontStyle,
						fontWeight: value.fontWeight,
						lineHeight: type === "style" ? "1.5" : value.lineHeight,
						fontSize:
							type === "style"
								? display === "heading"
									? "3rem"
									: "1.2rem"
								: `${value.fontSize}${unit}`,
						margin: "0",
						whiteSpace: display === "heading" ? "nowrap" : "wrap",
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
