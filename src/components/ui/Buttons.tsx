import { type ComponentProps } from "react";
import { Link } from "react-router";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/project/helpers";
import { TEXT_BUTTON_STYLE } from "@/components/constants";

const buttonVariants = cva(
	`rounded-md border text-sm font-medium shadow-md active:shadow-sm [&>svg]:size-4`,
	{
		variants: {
			variant: {
				primary: "border-neutral-300 bg-white text-neutral-800",
				destructive: "border-red-800 bg-red-100 text-red-800",
			},
		},
		defaultVariants: {
			variant: "primary",
		},
	}
);

type ButtonVariantsProps = VariantProps<typeof buttonVariants>;
type ButtonProps = ComponentProps<"button"> & ButtonVariantsProps;

export const Button = ({
	variant,
	className,
	children,
	...props
}: ButtonProps) => {
	return (
		<button
			className={cn(
				TEXT_BUTTON_STYLE,
				buttonVariants({ variant }),
				className
			)}
			{...props}
		>
			{children}
		</button>
	);
};

type LinkButtonProps = ComponentProps<typeof Link> & ButtonVariantsProps;

export const LinkButton = ({
	variant,
	className,
	children,
	...props
}: LinkButtonProps) => {
	return (
		<Link
			className={cn(
				TEXT_BUTTON_STYLE,
				buttonVariants({ variant }),
				className
			)}
			{...props}
		>
			{children}
		</Link>
	);
};

const iconButtonVariants = cva("grid place-items-center", {
	variants: {
		size: {
			base: "h-10 w-10",
			sm: "h-8 w-8",
		},
	},
	defaultVariants: {
		size: "base",
	},
});

type IconButtonVariantsProps = VariantProps<typeof iconButtonVariants>;
type IconButtonProps = IconButtonVariantsProps &
	ButtonProps & { content: string };

export const IconButton = ({
	variant,
	size,
	className,
	children,
	content,
	...props
}: IconButtonProps) => {
	return (
		<button
			className={cn(
				iconButtonVariants({ size }),
				buttonVariants({ variant }),
				className
			)}
			{...props}
		>
			{children}
			<span className="sr-only">{content}</span>
		</button>
	);
};
