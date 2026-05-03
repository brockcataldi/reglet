import { type ComponentProps } from "react";
import { Link } from "react-router";
import { cva, type VariantProps } from "class-variance-authority";

import { FOCUS_STYLE } from "@/components/constants";
import { cn } from "@/project/helpers";

const buttonVariants = cva(
	`block w-fit flex flex-row items-center justify-center gap-3 rounded-md border px-4 py-2 shadow-md [&>svg]:size-4 active:shadow-sm font-medium text-sm ${FOCUS_STYLE}`,
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

type ButtonProps = VariantProps<typeof buttonVariants>;

export const LinkButton = ({
	variant,
	className,
	children,
	...props
}: ComponentProps<typeof Link> & ButtonProps) => {
	return (
		<Link className={cn(buttonVariants({ variant }), className)} {...props}>
			{children}
		</Link>
	);
};

export const Button = ({
	variant,
	className,
	children,
	...props
}: ComponentProps<"button"> & ButtonProps) => {
	return (
		<button
			className={cn(buttonVariants({ variant }), className)}
			{...props}
		>
			{children}
		</button>
	);
};
