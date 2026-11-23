<script lang="ts">
	import { cn } from '#lib/utilities.js';
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	//  border-r border-r-black

	const navigationItemVariants = cva(
		'min-w-30 h-9 block px-4 py-1 border-black flex items-center justify-start',
		{
			variants: {
				active: {
					true: 'bg-black text-white',
					false:
						'bg-white text-black hover:bg-cobalt-500 hover:text-white focus-visible:bg-cobalt-500 focus-visible:text-white'
				},
				border: {
					none: 'border-none',
					l: 'border-l',
					r: 'border-r'
				}
			},
			defaultVariants: {
				active: false,
				border: 'none'
			}
		}
	);

	type NavigationItem = {
		children?: Snippet;
	} & HTMLAnchorAttributes &
		VariantProps<typeof navigationItemVariants>;

	let {
		active,
		border,
		children,
		class: className,
		...props
	}: NavigationItem = $props();
</script>

{#if active}
	<span
		class={cn(navigationItemVariants({ active: true, border }), className)}
	>
		<span class="block font-mono text-sm font-bold">
			{@render children?.()}
		</span>
	</span>
{:else}
	<a
		{...props}
		class={cn(
			navigationItemVariants({ active: false, border }),
			className
		)}
	>
		<span class="block font-mono text-sm font-bold">
			{@render children?.()}
		</span>
	</a>
{/if}
