import {
	ComputerDesktopIcon,
	DevicePhoneMobileIcon,
	DeviceTabletIcon,
} from "@heroicons/react/24/outline";
import type { ComponentProps } from "react";

type WidthIconProps = {
	value: number;
} & ComponentProps<"svg">;

export const WidthIcon = ({ value, ...props }: WidthIconProps) => {
	if (value > 1199) {
		return <ComputerDesktopIcon {...props} />;
	}

	if (value > 768) {
		return <DeviceTabletIcon {...props} />;
	}

	return <DevicePhoneMobileIcon {...props} />;
};
