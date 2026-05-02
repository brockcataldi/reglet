import type { ComponentProps } from 'react';
import { Select as SelectPrimitive } from 'radix-ui';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { cn } from '@/project/helpers';

type SelectProps = {
	className?: string;
	placeholder?: string;
};

export const Select = ({
	className,
	children,
	placeholder,
	...props
}: ComponentProps<typeof SelectPrimitive.Root> & SelectProps) => {
	return (
		<SelectPrimitive.Root {...props}>
			<SelectPrimitive.Trigger className={cn('', className)}>
				<SelectPrimitive.Value placeholder={placeholder} />
				<SelectPrimitive.Icon>
					<ChevronDownIcon />
				</SelectPrimitive.Icon>
			</SelectPrimitive.Trigger>
			<SelectPrimitive.Portal>
				<SelectPrimitive.Content>
					<SelectPrimitive.ScrollUpButton className="SelectScrollButton">
						<ChevronUpIcon />
					</SelectPrimitive.ScrollUpButton>
					<SelectPrimitive.Viewport className="SelectViewport">
						{children}
					</SelectPrimitive.Viewport>
					<SelectPrimitive.ScrollDownButton className="SelectScrollButton">
						<ChevronDownIcon />
					</SelectPrimitive.ScrollDownButton>
				</SelectPrimitive.Content>
			</SelectPrimitive.Portal>
		</SelectPrimitive.Root>
	);
};
