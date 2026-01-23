<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	type Props = {
		children: Snippet;
	} & HTMLAnchorAttributes;

	let { children, ...props }: Props = $props();
</script>

<a {...props}>
	{@render children()}
</a>

<style>
	a {
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
