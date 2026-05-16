import { RadioGroup } from "radix-ui";
import type { ComponentProps } from "react";

import { cn } from "@/store/helpers";

export const RadioBadges = ({
	className,
	...props
}: ComponentProps<typeof RadioGroup.Root>) => {
	return (
		<RadioGroup.Root
			className={cn("flex flex-row", className)}
			{...props}
		/>
	);
};

export const RadioBadge = ({
	className,
	children,
	...props
}: ComponentProps<typeof RadioGroup.Item>) => {
	return (
		<RadioGroup.Item
			className={cn(
				`focus-visible:outline-auto relative flex flex-row items-start justify-start rounded-md border border-neutral-300 px-2 py-1 shadow-md first:rounded-r-none last:rounded-l-none focus-visible:outline data-[state='checked']:fill-blue-800 data-[state='checked']:text-blue-800 [&:first-child>[data-state='checked']]:rounded-r-none [&:last-child>[data-state='checked']]:rounded-l-none`,
				className
			)}
			{...props}
		>
			<RadioGroup.Indicator className="absolute top-0 left-0 h-full w-full rounded-md bg-blue-500/10 outline-1 outline-blue-600" />
			<span className="flex flex-row items-center justify-center gap-1 [&>span]:text-sm [&>svg]:size-5">
				{children}
			</span>
		</RadioGroup.Item>
	);
};
