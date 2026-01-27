<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = {
		tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
		children: Snippet;
	} & HTMLAttributes<HTMLElement>;

	let { children, tag = 'p', ...props }: Props = $props();
</script>

<svelte:element this={tag} {...props}>
	{@render children()}
</svelte:element>

<style>
	h1 {
		font-family: var(--ff-ss);
		font-size: 3rem;
		margin: 0;
	}

	h2 {
		font-family: var(--ff-ss);
		font-size: 2rem;
		margin: 0;
	}

	h3 {
		font-family: var(--ff-ss);
		font-size: 1.5rem;
		margin: 0;
	}

	h4 {
		font-family: var(--ff-ss);
		font-size: 1.25rem;
		margin: 0;
	}

	h5 {
		font-family: var(--ff-ss);
		font-size: 1rem;
		margin: 0;
	}

	h6 {
		font-family: var(--ff-ss);
		font-size: 0.875rem;
		margin: 0;
	}

	p {
		font-family: var(--ff-ss);
		font-size: 1rem;
		margin: 0;
	}
</style>
