<script lang="ts">
	import type { OpticalSize } from '$lib/types';

	import Select from '$lib/components/select.svelte';
	import Input from '$lib/components/input.svelte';

	type Props = {
		opticalSize: OpticalSize;
		selectedOpticalSizes: OpticalSize | OpticalSize[];
	};

	let { opticalSize = $bindable(), selectedOpticalSizes }: Props = $props();
</script>

{#if selectedOpticalSizes instanceof Array}
    <Select id="optical-size" label="Optical Size" bind:value={opticalSize}>
        <option value="" disabled>Select a style</option>
        {#each selectedOpticalSizes as selectedOpticalSize (selectedOpticalSize)}
            <option value={selectedOpticalSize}>{selectedOpticalSize}</option>
        {/each}
    </Select>
{:else}
	<Input id="optical-size" label="Optical Size" bind:value={opticalSize} type="text" disabled />
{/if}
