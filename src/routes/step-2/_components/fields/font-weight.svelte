<script lang="ts">
	import { type Weight, isAxis } from '$lib/types';

	import Input from '$lib/components/input.svelte';
	import Select from '$lib/components/select.svelte';

	type Props = {
		id: string;
		weight: Weight;
		weights: Weight[];
	};

	let { id, weight = $bindable(), weights }: Props = $props();
</script>

{#if weights.length === 1}
	{@const value = weights[0]}
	{#if isAxis(value)}
		<Input
			id={`${id}-weight`}
			label="Weight"
			bind:value={weight}
			type="number"
			description="{value.min} to {value.max}"
			min={value.min}
			max={value.max}
		/>
	{:else}
		<Input
			id={`${id}-weight`}
			label="Weight"
			bind:value={weight}
			type={typeof value === 'number' ? 'number' : 'text'}
			disabled
		/>
	{/if}
{:else}
	<Select id={`${id}-weight`} label="Weight" bind:value={weight}>
		{#each weights as weight (`${id}-weight-${weight}`)}
			{#if !isAxis(weight)}
				<option value={weight}>{weight}</option>
			{/if}
		{/each}
	</Select>
{/if}
