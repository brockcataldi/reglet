import type { ComponentProps } from "react";
import { Select as SelectPrimitive } from "radix-ui";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/project/helpers";
import { FOCUS_STYLE } from "@/components/constants";

const selectVariants = cva(
	`w-full flex flex-row items-center justify-between gap-3 rounded-md border px-4 py-2 shadow-md text-left [&>svg]:size-4 active:shadow-sm font-normal text-sm ${FOCUS_STYLE}`,
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

type SelectProps = {
	className?: string;
	placeholder?: string;
} & VariantProps<typeof selectVariants> &
	ComponentProps<typeof SelectPrimitive.Root>;

export const Select = ({
	className,
	children,
	placeholder,
	variant,
	...props
}: SelectProps) => {
	return (
		<SelectPrimitive.Root {...props}>
			<SelectPrimitive.Trigger
				className={cn(selectVariants({ variant }), className)}
			>
				<SelectPrimitive.Value placeholder={placeholder} />
				<SelectPrimitive.Icon>
					<ChevronDownIcon className="size-4" />
				</SelectPrimitive.Icon>
			</SelectPrimitive.Trigger>
			<SelectPrimitive.Portal>
				<SelectPrimitive.Content className="z-50 overflow-hidden rounded-md border border-neutral-300 bg-white shadow-md">
					<SelectPrimitive.ScrollUpButton className="flex items-center justify-center py-1">
						<ChevronUpIcon className="size-4" />
					</SelectPrimitive.ScrollUpButton>

					<SelectPrimitive.Viewport className="p-1">
						{children}
					</SelectPrimitive.Viewport>

					<SelectPrimitive.ScrollDownButton className="flex items-center justify-center py-1">
						<ChevronDownIcon className="size-4" />
					</SelectPrimitive.ScrollDownButton>
				</SelectPrimitive.Content>
			</SelectPrimitive.Portal>
		</SelectPrimitive.Root>
	);
};

type SelectOptionProps = ComponentProps<typeof SelectPrimitive.SelectItem>;

export const SelectOption = ({
	className,
	children,
	...props
}: SelectOptionProps) => {
	return (
		<SelectPrimitive.Item className={cn("p-1", className)} {...props}>
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
		</SelectPrimitive.Item>
	);
};
