<script lang="ts">
	import { type Weight } from '$lib/types';
	import { isAxis } from '$lib/functions/types';

	import Input from '$lib/components/input.svelte';
	import Select from '$lib/components/select.svelte';

	type Props = {
		weight: Weight;
		selectedWeights: Weight | Weight[];
	};

	let { weight = $bindable(), selectedWeights }: Props = $props();
</script>

{#if selectedWeights instanceof Array}
	<Select id="weight" label="Weight" bind:value={weight}>
		{#each selectedWeights as weight (weight.toString())}
			{#if !isAxis(weight)}
				<option value={weight}>{weight}</option>
			{/if}
		{/each}
	</Select>
{:else if isAxis(selectedWeights)}
	<Input
		id="weight"
		label="Weight"
		bind:value={weight}
		type="number"
		description="{selectedWeights.min} to {selectedWeights.max}"
		min={selectedWeights.min}
		max={selectedWeights.max}
	/>
{:else}
	<Input
		id="weight"
		label="Weight"
		bind:value={weight}
		type={typeof selectedWeights === 'number' ? 'number' : 'text'}
		disabled
	/>
{/if}
