<script lang="ts">
	import type { Stretch } from '$lib/types';

	import Select from '$lib/components/select.svelte';
	import Input from '$lib/components/input.svelte';

	type Props = {
		stretch: Stretch;
		selectedStretches: Stretch | Stretch[];
	};

	let { stretch = $bindable(), selectedStretches }: Props = $props();
</script>

{#if selectedStretches instanceof Array}
	<Select id="stretch" label="Stretch" bind:value={stretch}>
		{#each selectedStretches as stretch}
			<option value={stretch}>{stretch}</option>
		{/each}
	</Select>
{:else}
	<Input
		id="stretch"
		label="Stretch"
		bind:value={stretch}
		type={typeof selectedStretches === 'string' ? 'text' : 'number'}
		disabled
	/>
{/if}
