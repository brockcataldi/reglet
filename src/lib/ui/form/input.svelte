<script lang="ts">
	import { cn } from '$lib/utilities';
	import type { HTMLInputAttributes } from 'svelte/elements';

	let { class: className, ...props }: HTMLInputAttributes = $props();
</script>

<input
	class={cn(
		'w-full border-0 border-b px-1 py-2 font-mono text-sm',
		'not-placeholder-shown:border-b-2 not-placeholder-shown:border-b-cobalt-500',
		'hover:border-b-2 hover:border-b-cobalt-500',
		'focus-visible:border-b-2 focus-visible:border-b-cobalt-500',
		className
	)}
	{...props}
/>
