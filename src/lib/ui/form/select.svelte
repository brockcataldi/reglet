<script lang="ts">
	import { cn } from '$lib/utilities';
	import type { HTMLSelectAttributes } from 'svelte/elements';

	let {
		class: className,
		children,
		...props
	}: HTMLSelectAttributes = $props();
</script>

<select
	class={cn(
		'w-full border-0 border-b border-black pl-0 font-mono text-sm',
		'hover:border-b-2 hover:border-b-cobalt-500',
		'focus-visible:border-b-2 focus-visible:border-b-cobalt-500',
		className
	)}
	{...props}
>
	{@render children?.()}
</select>
