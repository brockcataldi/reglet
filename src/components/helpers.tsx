import {
	ComputerDesktopIcon,
	DevicePhoneMobileIcon,
	DeviceTabletIcon,
} from "@heroicons/react/24/outline";

export const widthToIcon = (width: number) => {
	if (width > 1199) {
		return <ComputerDesktopIcon />;
	}

	if (width > 768) {
		return <DevicePhoneMobileIcon />;
	}

	return <DeviceTabletIcon />;
};
