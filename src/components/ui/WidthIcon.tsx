import type { ComponentProps } from "react";

import { Smartphone, Tablet, Laptop, Monitor } from "lucide-react";

type WidthIconProps = {
	value: number;
} & ComponentProps<"svg">;

export const WidthIcon = ({ value, ...props }: WidthIconProps) => {
	if (value > 1199) {
		return <Monitor {...props} />;
	}

	if (value > 992) {
		return <Laptop {...props} />;
	}

	if (value > 567) {
		return <Tablet {...props} />;
	}

	return <Smartphone {...props} />;
};
