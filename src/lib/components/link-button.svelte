<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	type Props = {
		children: Snippet;
	} & HTMLAnchorAttributes;

	let { children, ...props }: Props = $props();
</script>

<a
	class="m-0 inline-block rounded-md bg-black px-4 py-2 text-base font-bold text-white"
	{...props}
>
	{@render children()}
</a>
