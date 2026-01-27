<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLSelectAttributes } from 'svelte/elements';

	type Props = {
		id: string;
		label: string;
		children: Snippet;
	} & HTMLSelectAttributes;

	let { id, label, value = $bindable(), children, ...props }: Props = $props();
</script>

<div>
	<label for={id}>{label}</label>
	<select {id} bind:value {...props}>
		{@render children()}
	</select>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		width: 100%;
	}

	label {
		font-family: var(--ff-ss);
		font-size: 0.875rem;
	}

	select {
		font-family: var(--ff-ss);
		font-size: 1rem;
		box-sizing: border-box;
		width: 100%;
		padding: 0.25rem 0.75rem;
		border: 1px solid var(--c-bla);
		border-radius: 0.25rem;
	}
</style>
