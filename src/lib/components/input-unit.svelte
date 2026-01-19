<script lang="ts">
	import type { Unit } from '$lib/unit';

	type Props = {
		value: Unit;
		label: string;
		id: string;
	};

	let {
		value = $bindable({ value: 0, unit: 'px' }),
		label,
		id
	}: Props = $props();
</script>

<div class="input-unit">
	<p class="input-unit__title">
		{label}
	</p>
	<div class="input-unit__container">
		<label for={`${id}-value`} class="sr-only">{label} Unit Value</label>
		<input
			type="number"
			id={`${id}-value`}
			bind:value={value.value}
			class="input-unit__input"
		/>
		<label for={`${id}-unit`} class="sr-only">{label} Unit</label>
		<select
			id={`${id}-unit`}
			bind:value={value.unit}
			class="input-unit__select"
		>
			<option value="px">px</option>
			<option value="em">em</option>
			<option value="rem">rem</option>
		</select>
	</div>
</div>

<style>
	.input-unit {
		width: 100%;
	}

	.input-unit__container {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		width: 100%;
	}

	.input-unit__title {
		font-family: var(--font-family);
		margin: 0 0 0.25rem;
		font-weight: 500;
		font-size: 0.875rem;
	}

	.input-unit__input,
	.input-unit__select {
		font-family: var(--font-family);
		padding: 0.25rem 0.5rem;
		font-size: 1rem;
		height: 2rem;
		border: 1px solid black;
		box-sizing: border-box;
	}

	.input-unit__input {
		border-top-left-radius: 0.25rem;
		border-bottom-left-radius: 0.25rem;
		width: 100%;
	}

	.input-unit__select {
		border-left: none;
		border-top-right-radius: 0.25rem;
		border-bottom-right-radius: 0.25rem;
		width: 4rem;
	}
</style>
