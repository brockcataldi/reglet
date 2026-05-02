import { RadioGroup } from 'radix-ui';
import type { ComponentProps } from 'react';

import { cn } from '@/project/helpers';

import { FOCUS_STYLE } from '@/components/constants';
import { cva, type VariantProps } from 'class-variance-authority';

export const RadioCards = ({
	className,
	...props
}: ComponentProps<typeof RadioGroup.Root>) => {
	return <RadioGroup.Root className={cn('', className)} {...props} />;
};

const radioCardVariant = cva(
	`relative flex flex-row items-start justify-start rounded-md border border-neutral-300 shadow-md ${FOCUS_STYLE}`,
	{
		variants: {
			size: {
				default: 'p-3',
				small: 'py-1 px-2',
			},
		},
		defaultVariants: {
			size: 'default',
		},
	}
);

type RadioCardVariant = VariantProps<typeof radioCardVariant>;

export const RadioCard = ({
	size,
	className,
	id,
	children,
	...props
}: ComponentProps<typeof RadioGroup.Item> & RadioCardVariant) => {
	return (
		<RadioGroup.Item
			className={cn(radioCardVariant({ size }), className)}
			{...props}
		>
			<RadioGroup.Indicator className="absolute top-0 left-0 h-full w-full rounded-md bg-blue-500/10 outline-2 -outline-offset-1 outline-blue-600" />
			<span className="flex flex-col text-left">{children}</span>
		</RadioGroup.Item>
	);
};
