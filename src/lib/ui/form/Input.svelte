<script lang="ts">
	import { cn } from '$lib/utilities';
	import { type HTMLInputAttributes } from 'svelte/elements';

	let { class: className, ...props }: HTMLInputAttributes = $props();
</script>

<input
	class={cn(
		'border-0 border-b px-1 py-2 hover:border-b-violet-700 focus-visible:border-b-violet-700',
		className
	)}
	{...props}
/>
