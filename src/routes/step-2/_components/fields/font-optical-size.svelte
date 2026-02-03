<script lang="ts">
	import type { OpticalSize } from '$lib/types';

	import Select from '$lib/components/select.svelte';

	type Props = {
		id: string;
		opticalSize: OpticalSize;
		opticalSizes: OpticalSize[];
	};

	let { id, opticalSize = $bindable(), opticalSizes }: Props = $props();
</script>

<Select
	id={`${id}-optical-size`}
	label="Optical Sizing"
	bind:value={opticalSize}
>
	<option value="" disabled>Select a style</option>
	{#each opticalSizes as selectedOpticalSize (`${id}-optical-size-${selectedOpticalSize}`)}
		<option value={selectedOpticalSize}>{selectedOpticalSize}</option>
	{/each}
</Select>
