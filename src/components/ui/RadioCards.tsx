import { RadioGroup } from "radix-ui";
import type { ComponentProps } from "react";

import { cn } from "@/project/helpers";

import { FOCUS_STYLE } from "@/components/constants";

export const RadioCards = ({
	className,
	...props
}: ComponentProps<typeof RadioGroup.Root>) => {
	return <RadioGroup.Root className={cn("", className)} {...props} />;
};

export const RadioCard = ({
	className,
	children,
	...props
}: ComponentProps<typeof RadioGroup.Item>) => {
	return (
		<RadioGroup.Item
			className={cn(
				`relative flex flex-row items-start justify-start rounded-md border border-neutral-300 p-2 shadow-md ${FOCUS_STYLE}`,
				className
			)}
			{...props}
		>
			<RadioGroup.Indicator className="absolute top-0 left-0 h-full w-full rounded-md bg-blue-500/10 outline-2 -outline-offset-1 outline-blue-600" />
			<span className="flex flex-col text-left">{children}</span>
		</RadioGroup.Item>
	);
};
