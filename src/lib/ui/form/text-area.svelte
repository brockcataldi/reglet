<script lang="ts">
	import { cn } from '$lib/utilities';
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	let {
		class: className,
		value = $bindable(),
		...props
	}: HTMLTextareaAttributes = $props();
</script>

<textarea
	class={cn(
		'field-sizing-content min-h-[6rlh] w-full resize-none border-0 border-b px-1 py-2 font-mono text-sm',
		'not-placeholder-shown:border-b-2 not-placeholder-shown:border-b-cobalt-500',
		'hover:border-b-2 hover:border-b-cobalt-500',
		'focus-visible:border-b-2 focus-visible:border-b-cobalt-500',
		className
	)}
	bind:value
	{...props}
></textarea>
