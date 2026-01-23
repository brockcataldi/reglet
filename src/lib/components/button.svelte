<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Props = {
		children: Snippet;
	} & HTMLButtonAttributes;

	let { children, ...props }: Props = $props();
</script>

<button {...props}>
	{@render children()}
</button>

<style>
	button {
		appearance: none;
		border: none;
		cursor: pointer;
		font-family: var(--ff-ss);
		font-size: 1rem;
		margin: 0;
		font-weight: 700;
		padding: 0.5rem 1rem;
		background-color: black;
		text-decoration: none;
		color: white;
		display: inline-block;
		border-radius: 0.25rem;
	}
</style>
