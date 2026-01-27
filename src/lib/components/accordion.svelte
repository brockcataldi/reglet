<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		justify?: 'between' | 'start' | 'end';
		header: Snippet;
		children: Snippet;
	};

	let { header, children, justify = 'start' }: Props = $props();
</script>

<details>
	<summary>
		<span data-justify={justify}>
			{@render header()}
		</span>
	</summary>
	{@render children()}
</details>

<style>
	details {
		border: 1px solid var(--c-bla);
		border-radius: 0.25rem;
		padding: 0.5rem 0.5rem 0;
	}

	summary {
		margin: -0.5rem -0.5rem 0;
		padding: 0.5rem;
		list-style: none;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		cursor: pointer;
		background-color: var(--c-bla);
		color: var(--c-whi);
		border-radius: 0.25rem;
	}

	summary::-webkit-details-marker {
		display: none;
	}

	span {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: calc(100% - 1rem);
		gap: 1rem;
	}

	span[data-justify='between'] {
		justify-content: space-between;
	}

	span[data-justify='start'] {
		justify-content: flex-start;
	}

	span[data-justify='end'] {
		justify-content: flex-end;
	}

	details > summary::after {
		content: '▶';
		display: grid;
		width: 1.75rem;
		height: 1.75rem;
		place-items: center;
		border-radius: 0.25rem;
	}

	details[open] {
		padding: 0.5rem;
	}

	details[open] > summary {
		margin-bottom: 0.5rem;
	}

	details[open] > summary::after {
		content: '▼';
	}
</style>
