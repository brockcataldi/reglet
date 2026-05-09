import { RadioGroup } from "radix-ui";
import type { ComponentProps } from "react";

import { cn } from "@/project/helpers";

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
				`focus-visible:outline-auto relative flex flex-row items-start justify-start rounded-md border border-neutral-300 p-2 shadow-md focus-visible:outline data-[state='checked']:fill-blue-800 data-[state='checked']:text-blue-800`,
				className
			)}
			{...props}
		>
			<RadioGroup.Indicator className="absolute top-0 left-0 h-full w-full rounded-md bg-blue-500/10 outline-1 outline-blue-600" />
			<span className="flex flex-col text-left">{children}</span>
		</RadioGroup.Item>
	);
};
