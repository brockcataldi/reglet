<script lang="ts">
	import { cn } from '$lib/utilities';
	import type { HTMLSelectAttributes } from 'svelte/elements';

	let { class: className, children, ...props }: HTMLSelectAttributes = $props();
</script>

<select class={cn('border-0 border-b', className)} {...props}>
	{@render children?.()}
</select>
