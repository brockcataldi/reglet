import { DesktopIcon, LaptopIcon, MobileIcon } from '@radix-ui/react-icons';

export const widthToIcon = (width: number) => {
	if (width > 1199) {
		return <DesktopIcon />;
	}

	if (width > 992) {
		return <LaptopIcon />;
	}

	return <MobileIcon />;
};
