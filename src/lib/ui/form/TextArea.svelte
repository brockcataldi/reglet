<script lang="ts">
	import { cn } from '$lib/utilities';
	import { type HTMLTextareaAttributes } from 'svelte/elements';

	let { class: className, ...props }: HTMLTextareaAttributes = $props();
</script>

<textarea class={cn('', className)} {...props}></textarea>
