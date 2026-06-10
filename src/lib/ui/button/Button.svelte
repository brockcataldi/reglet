<script lang="ts">
	import type { Snippet } from 'svelte';

	type ButtonProps = {
		children: Snippet;
	};

	let { children }: ButtonProps = $props();
</script>

<button class="text-red-700">
	{@render children()}
</button>
