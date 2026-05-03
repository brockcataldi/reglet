import { type ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Tooltip } from "radix-ui";

import { FOCUS_STYLE } from "@/components/constants";
import { cn } from "@/project/helpers";

const iconButtonVariants = cva(
	`w-10 h-10 rounded-md border shadow-md 
    grid place-items-center [&>svg]:size-4 ${FOCUS_STYLE}`,
	{
		variants: {
			variant: {
				primary: "bg-white border-neutral-300",
				error: "bg-red-100 border-red-800 text-red-800",
			},
		},
		defaultVariants: {
			variant: "primary",
		},
	}
);

type IconButtonVariants = VariantProps<typeof iconButtonVariants>;
type IconButtonProps = ComponentProps<"button"> & IconButtonVariants;

export const IconButton = ({
	variant,
	className,
	children,
	...props
}: IconButtonProps) => {
	return (
		<button
			className={cn(iconButtonVariants({ variant }), className)}
			{...props}
		>
			{children}
		</button>
	);
};

type DescriptiveIconButtonProps = {
	content: string;
};

export const DescriptiveIconButton = ({
	content,
	className,
	children,
	...props
}: IconButtonProps & DescriptiveIconButtonProps) => {
	return (
		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger asChild>
					<IconButton className={className} {...props}>
						{children}
						<span className="sr-only">{content}</span>
					</IconButton>
				</Tooltip.Trigger>
				<Tooltip.Portal>
					<Tooltip.Content
						className={
							"block w-fit rounded-md bg-black px-2 py-1 text-xs text-white shadow-sm"
						}
					>
						{content}
						<Tooltip.Arrow className={"fill-black"} />
					</Tooltip.Content>
				</Tooltip.Portal>
			</Tooltip.Root>
		</Tooltip.Provider>
	);
};
