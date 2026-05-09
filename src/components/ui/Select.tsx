import type { ComponentProps } from "react";
import { Select as SelectPrimitive } from "radix-ui";
import { ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/project/helpers";

type SelectProps = {
	className?: string;
	placeholder?: string;
} & ComponentProps<typeof SelectPrimitive.Root>;

export const Select = ({
	className,
	children,
	placeholder,
	...props
}: SelectProps) => {
	return (
		<SelectPrimitive.Root {...props}>
			<SelectPrimitive.Trigger
				className={cn(
					`flex w-full flex-row items-center justify-between gap-3 rounded-md border border-neutral-300 bg-white px-4 py-2 text-left text-sm font-normal shadow-md active:shadow-sm [&>svg]:size-4`,
					className
				)}
			>
				<SelectPrimitive.Value placeholder={placeholder} />
				<SelectPrimitive.Icon>
					<ChevronDown className="size-4" />
				</SelectPrimitive.Icon>
			</SelectPrimitive.Trigger>
			<SelectPrimitive.Portal>
				<SelectPrimitive.Content className="z-50 overflow-hidden rounded-md border border-neutral-300 bg-white p-1 shadow-md">
					<SelectPrimitive.ScrollUpButton className="flex items-center justify-center py-1">
						<ChevronUp className="size-4" />
					</SelectPrimitive.ScrollUpButton>

					<SelectPrimitive.Viewport>
						{children}
					</SelectPrimitive.Viewport>

					<SelectPrimitive.ScrollDownButton className="flex items-center justify-center py-1">
						<ChevronDown className="size-4" />
					</SelectPrimitive.ScrollDownButton>
				</SelectPrimitive.Content>
			</SelectPrimitive.Portal>
		</SelectPrimitive.Root>
	);
};

type SelectSeparatorProps = ComponentProps<typeof SelectPrimitive.Separator>;

export const SelectSeparator = ({ className }: SelectSeparatorProps) => {
	return (
		<SelectPrimitive.Separator
			className={cn("my-2 h-px w-full bg-neutral-300", className)}
		/>
	);
};

type SelectGroupProps = ComponentProps<typeof SelectPrimitive.SelectGroup>;

export const SelectGroup = ({
	className,
	children,
	...props
}: SelectGroupProps) => {
	return (
		<SelectPrimitive.SelectGroup className={cn("", className)} {...props}>
			{children}
		</SelectPrimitive.SelectGroup>
	);
};

type SelectLabelProps = ComponentProps<typeof SelectPrimitive.SelectLabel>;

export const SelectLabel = ({
	className,
	children,
	...props
}: SelectLabelProps) => {
	return (
		<SelectPrimitive.SelectLabel
			className={cn("px-2 py-1.5 text-xs text-neutral-500", className)}
			{...props}
		>
			{children}
		</SelectPrimitive.SelectLabel>
	);
};

type SelectOptionProps = ComponentProps<typeof SelectPrimitive.SelectItem>;

export const SelectOption = ({
	className,
	children,
	...props
}: SelectOptionProps) => {
	return (
		<SelectPrimitive.Item
			className={cn(
				"px-2 py-1.5 text-sm hover:bg-neutral-100",
				className
			)}
			{...props}
		>
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
		</SelectPrimitive.Item>
	);
};
