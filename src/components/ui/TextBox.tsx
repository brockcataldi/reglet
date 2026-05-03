import { cn } from "@/project/helpers";
import { type ComponentProps } from "react";

export const TextBox = ({ className, ...props }: ComponentProps<"input">) => {
	return (
		<input
			className={cn(
				"w-full rounded-md border border-neutral-300 bg-white px-2 py-1 text-sm",
				className
			)}
			{...props}
		/>
	);
};
