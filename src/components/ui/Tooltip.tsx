import { cn } from "@/project/helpers";
import { Tooltip as TooltipPrimitive } from "radix-ui";
import type { ComponentProps } from "react";

export type TooltipProps = ComponentProps<typeof TooltipPrimitive.Content>;

export const Tooltip = ({
	content,
	className,
	children,
	side,
	...props
}: TooltipProps) => (
	<TooltipPrimitive.Provider>
		<TooltipPrimitive.Root>
			<TooltipPrimitive.Trigger asChild>
				{children}
			</TooltipPrimitive.Trigger>
			<TooltipPrimitive.Portal>
				<TooltipPrimitive.Content
					className={cn(
						"z-100 block w-fit rounded-md bg-black px-2 py-1 text-xs text-white shadow-sm",
						className
					)}
					{...props}
				>
					{content}
					<TooltipPrimitive.Arrow className="fill-black" />
				</TooltipPrimitive.Content>
			</TooltipPrimitive.Portal>
		</TooltipPrimitive.Root>
	</TooltipPrimitive.Provider>
);
