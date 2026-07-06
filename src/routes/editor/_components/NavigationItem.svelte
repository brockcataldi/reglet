<script lang="ts">
	import { cn } from '$lib/utilities';
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	type NavigationItem = {
		active: boolean;
		children?: Snippet;
	} & HTMLAnchorAttributes;

	let {
		active,
		children,
		class: className,
		...props
	}: NavigationItem = $props();
</script>

{#if active}
	<span
		class={cn(
			'block min-w-30 border-r border-r-black bg-black px-4 py-1 text-white',
			className
		)}
	>
		{@render children?.()}
	</span>
{:else}
	<a
		{...props}
		// I don't like that I had to forward href in this way but whatever.
		class={cn(
			'block min-w-30 border-r border-r-black bg-white px-4 py-1 text-black hover:bg-cobalt-500 hover:text-white focus-visible:bg-cobalt-500 focus-visible:text-white',
			cn
		)}
	>
		{@render children?.()}
	</a>
{/if}
