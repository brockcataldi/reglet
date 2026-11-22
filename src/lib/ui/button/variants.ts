import { cva, type VariantProps } from 'class-variance-authority';

export const textButtonVariants = cva(
	`
        inline-flex gap-2 items-center justify-center
        uppercase font-mono border [&>svg]:shrink-0
    `,
	{
		variants: {
			size: {
				md: 'py-3 px-5 text-sm [&>svg]:size-5',
				// only for actions inside a Separator; md everywhere else
				sm: 'min-h-6 px-2 py-0.5 text-xs [&>svg]:size-4'
			},
			// a square that only shows the icon; keep for tight spots
			iconOnly: {
				true: 'size-8 min-h-0 p-0 [&>svg]:size-5',
				false: ''
			},
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
			scheme: 'primary',
			size: 'md',
			iconOnly: false
		}
	}
);

export type TextButtonVariantsProps = VariantProps<
	typeof textButtonVariants
>;
