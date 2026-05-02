import { cn } from '@/project/helpers';
import { type ComponentProps } from 'react';

export const TextBox = ({ className, ...props }: ComponentProps<'input'>) => {
	return (
		<input
			className={cn(
				'w-full rounded-md border border-neutral-300 px-2 py-1',
				className
			)}
			{...props}
		/>
	);
};
