<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Props = {
		size?: 'small' | 'medium';
		width?: 'full' | 'fit';
		color?: 'primary' | 'disabled' | 'error';
		children: Snippet;
	} & HTMLButtonAttributes;

	let {
		children,
		size = 'medium',
		width = 'fit',
		color = 'primary',
		...props
	}: Props = $props();
</script>

<button data-size={size} data-width={width} data-color={color} {...props}>
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
		background-color: var(--c-bla);
		color: var(--c-whi);
		display: inline-block;
		border-radius: 0.25rem;
		padding: 0.5rem 1rem;
		width: 100%;
	}

	button[data-color='primary'] {
		background-color: var(--c-bla);
		color: var(--c-whi);
	}

	button[data-color='error'] {
		background-color: var(--c-red);
		color: var(--c-whi);
	}

	button[disabled],
	button[data-color='disabled'] {
		cursor: not-allowed;
		background-color: var(--c-gra);
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
