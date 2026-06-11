import { cva, type VariantProps } from 'class-variance-authority';

export const textButtonVariants = cva(
	`
        inline-flex gap-2 items-center justify-center 
        border border-1 py-3 px-5 text-sm [&>svg]:size-5
        uppercase
    `,
	{
		variants: {
			variant: {
				default: `
                    text-neutral-800 border-neutral-800 bg-white 
                    hover:bg-neutral-800 hover:text-white
                    focus-visible:bg-neutral-800 focus-visible:text-white
                `,
				destructive: `
                    text-red-800 border-red-800 bg-red-100
                    hover:bg-red-800 hover:text-red-100
                    focus-visible:bg-red-800 focus-visible:text-red-100
                `
			}
		},
		defaultVariants: {
			variant: 'default'
		}
	}
);

export const iconButtonVariants = cva(
	`
        inline-flex gap-2 items-center justify-center 
        border border-1 p-3 text-sm font-semibold [&>svg]:size-5
    `,
	{
		variants: {
			variant: {
				default: `
                    text-neutral-800 border-neutral-800 bg-white 
                    hover:bg-neutral-800 hover:text-white
                    focus-visible:bg-neutral-800 focus-visible:text-white
                `,
				destructive: `
                    text-red-800 border-red-800 bg-red-100
                    hover:bg-red-800 hover:text-red-100
                    focus-visible:bg-red-800 focus-visible:text-red-100
                `
			}
		},
		defaultVariants: {
			variant: 'default'
		}
	}
);

export type IconButtonVariantsProps = VariantProps<typeof iconButtonVariants>;
export type TextButtonVariantsProps = VariantProps<typeof textButtonVariants>;
