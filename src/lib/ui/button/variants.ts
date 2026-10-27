import { cva, type VariantProps } from 'class-variance-authority';

export const textButtonVariants = cva(
	`
        inline-flex gap-2 items-center justify-center 
        py-3 px-5 text-sm [&>svg]:size-5
        uppercase font-mono border
    `,
	{
		variants: {
			scheme: {
				primary: `
                    text-black bg-white border-black
                    hover:bg-cobalt-500 hover:text-white
                    focus-visible:bg-cobalt-500 focus-visible:text-white
				`,
				destructive: `
                    text-white bg-white border-red-800 text-red-800
                    hover:bg-red-700 hover:text-white
                    focus-visible:bg-red-800 focus-visible:text-white
                `
			}
		},
		defaultVariants: {
			scheme: 'primary'
		}
	}
);

export const iconButtonVariants = cva(
	`
        inline-flex gap-2 items-center justify-center 
        border border-1 w-8 h-8 text-sm font-semibold [&>svg]:size-5
    `,
	{
		variants: {
			scheme: {
				primary: `
                    text-black bg-white border-black
                    hover:bg-cobalt-500 hover:text-white
                    focus-visible:bg-cobalt-500 focus-visible:text-white
				`,
				destructive: `
                    text-white bg-white border-red-800 text-red-800
                    hover:bg-red-700 hover:text-white
                    focus-visible:bg-red-800 focus-visible:text-white
                `
			}
		},
		defaultVariants: {
			scheme: 'primary'
		}
	}
);

export type TextButtonVariantsProps = VariantProps<
	typeof textButtonVariants
>;
export type IconButtonVariantsProps = VariantProps<
	typeof iconButtonVariants
>;
