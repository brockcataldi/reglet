<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		justify?: 'between' | 'start' | 'end';
		header: Snippet;
		children: Snippet;
	};

	let { header, children, justify = 'start' }: Props = $props();

	const justifyClass = $derived(
		justify === 'between'
			? 'justify-between'
			: justify === 'start'
				? 'justify-start'
				: 'justify-end'
	);
</script>

<details class="group w-full rounded-md border border-black px-2 pt-2 pb-0">
	<summary
		class="-webkit-details-marker:hidden m-0 -mx-2 -mt-2 flex cursor-pointer items-center justify-between gap-2 rounded-md p-2"
	>
		<span
			class="align-items-center flex w-[calc(100%-1rem)] flex-row gap-1 {justifyClass}"
		>
			{@render header()}
		</span>
	</summary>

	<div class="px-2 py-4">
		{@render children()}
	</div>
</details>

<style>
	details > summary::after {
		content: '▶';
		display: grid;
		width: 1.75rem;
		height: 1.75rem;
		place-items: center;
		border-radius: 0.25rem;
	}

	details[open] > summary::after {
		content: '▼';
	}
</style>
