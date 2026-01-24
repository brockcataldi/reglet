<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = {
		id: string;
		label: string;
	} & HTMLInputAttributes;

	let { id, label, value = $bindable(), ...props }: Props = $props();
</script>

<div>
	<label for={id}>{label}</label>
	<input {id} bind:value {...props} />
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

	input {
		font-family: var(--ff-ss);
		font-size: 1rem;
		box-sizing: border-box;
		width: 100%;
		padding: 0.25rem 0.75rem;
		border: 1px solid black;
		border-radius: 0.25rem;
	}
</style>
