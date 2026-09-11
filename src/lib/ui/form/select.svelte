<script lang="ts">
	import { cva, type VariantProps } from 'class-variance-authority';
	import { cn } from '$lib/utilities';
	import type { HTMLSelectAttributes } from 'svelte/elements';

	const selectVariants = cva(
		'w-full border-0 border-b px-1 py-2 font-mono text-sm',
		{
			variants: {
				variant: {
					default:
						'border-black bg-transparent hover:border-b-2 hover:border-b-cobalt-500 focus-visible:border-b-2 focus-visible:border-b-cobalt-500',
					disabled: 'border-black bg-transparent disabled:bg-neutral-100',
					error: 'border-red-800 placeholder:text-red-800/50 text-red-800'
				}
			},
			defaultVariants: {
				variant: 'default'
			}
		}
	);

	type SelectVariants = VariantProps<typeof selectVariants>;

	let {
		class: className,
		variant,
		children,
		...props
	}: HTMLSelectAttributes & SelectVariants = $props();
</script>

<select class={cn(selectVariants({ variant }), className)} {...props}>
	{@render children?.()}
</select>
