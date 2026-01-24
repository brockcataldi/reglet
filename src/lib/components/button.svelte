<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Props = {
		size?: 'small' | 'medium';
		width?: 'full' | 'fit';
		children: Snippet;
	} & HTMLButtonAttributes;

	let { children, size = 'medium', width = 'fit', ...props }: Props = $props();
</script>

<button data-size={size} data-width={width} {...props}>
	{@render children()}
</button>

<style>
	button {
		appearance: none;
		border: none;
		cursor: pointer;
		font-family: var(--ff-ss);
		margin: 0;
		font-weight: 700;
		background-color: black;
		color: white;
		display: inline-block;
		border-radius: 0.25rem;
		padding: 0.5rem 1rem;
		width: 100%;
	}

	button[data-size='small'] {
		font-size: 0.875rem;
	}

	button[data-size='medium'] {
		font-size: 1rem;
	}

	button[data-width='full'] {
		width: 100%;
	}

	button[data-width='fit'] {
		width: fit-content;
	}
</style>
