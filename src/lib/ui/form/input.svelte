<script lang="ts">
	import { cva, type VariantProps } from 'class-variance-authority';
	import { cn } from '$lib/utilities';
	import type { HTMLInputAttributes } from 'svelte/elements';

	const inputVariants = cva(
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

	type InputVariants = VariantProps<typeof inputVariants>;

	let {
		class: className,
		variant,
		value = $bindable(),
		...props
	}: HTMLInputAttributes & InputVariants = $props();
</script>

<input
	class={cn(inputVariants({ variant }), className)}
	{...props}
	bind:value
/>
