<script lang="ts">
	import type { Stretch } from '$lib/types';

	import Select from '$lib/components/select.svelte';

	type Props = {
		id: string;
		stretch: Stretch;
		stretches: Stretch[];
	};

	let { id, stretch = $bindable(), stretches }: Props = $props();
</script>

<Select id={`${id}-stretch`} label="Stretch" bind:value={stretch}>
	{#each stretches as stretch (`${id}-stretch-${stretch}`)}
		<option value={stretch}>{stretch}</option>
	{/each}
</Select>
