<script lang="ts">
	import { cn } from '#lib/utilities.js';
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

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
		// the page being shown; plain text rather than a link. Defaults to
		// `active`, so a section can be active while still linking home
		current?: boolean;
	} & HTMLAnchorAttributes &
		VariantProps<typeof navigationItemVariants>;

	let {
		active,
		current = !!active,
		border,
		children,
		class: className,
		...props
	}: NavigationItem = $props();
</script>

{#if current}
	<span
		class={cn(navigationItemVariants({ active: true, border }), className)}
		aria-current="page"
	>
		<span class="block font-mono text-sm font-bold">
			{@render children?.()}
		</span>
	</span>
{:else}
	<a
		{...props}
		class={cn(
			navigationItemVariants({ active: !!active, border }),
			active &&
				'hover:bg-cobalt-500 focus-visible:bg-cobalt-500 focus-visible:outline-none',
			className
		)}
		aria-current={active ? 'true' : undefined}
	>
		<span class="block font-mono text-sm font-bold">
			{@render children?.()}
		</span>
	</a>
{/if}
