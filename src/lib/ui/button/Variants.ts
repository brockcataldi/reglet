import { cva, type VariantProps } from 'class-variance-authority';

export const textButtonVariants = cva(
	`
        inline-flex gap-2 items-center justify-center 
        py-3 px-5 text-sm [&>svg]:size-5
        uppercase font-mono
    `,
	{
		variants: {
			variant: {
				primary: `
				 	text-white bg-cobalt-500 
                    hover:bg-neutral-800 hover:text-white
                    focus-visible:bg-neutral-800 focus-visible:text-white
				`,

				// idk a hover state for this?
				secondary: `
                    text-white bg-neutral-800 
                    hover:bg-cobalt-500 hover:text-white
                    focus-visible:bg-cobalt-500 focus-visible:text-white
                `,

				// idk a hover state for this?
				destructive: `
                    text-white bg-red-700
                    hover:bg-red-800 hover:text-red-100
                    focus-visible:bg-red-800 focus-visible:text-red-100
                `
			}
		},
		defaultVariants: {
			variant: 'primary'
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
				primary: `
				 	text-white bg-cobalt-500 
                    hover:bg-neutral-800 hover:text-white
                    focus-visible:bg-neutral-800 focus-visible:text-white
				`,
				destructive: `
                    text-white bg-red-700
                    hover:bg-red-800 hover:text-red-100
                    focus-visible:bg-red-800 focus-visible:text-red-100
                `
			}
		},
		defaultVariants: {
			variant: 'primary'
		}
	}
);

export type IconButtonVariantsProps = VariantProps<typeof iconButtonVariants>;
export type TextButtonVariantsProps = VariantProps<typeof textButtonVariants>;
