<script lang="ts">
	import type { OpticalSize } from '$lib/types';

	import Select from '$lib/components/select.svelte';

	type Props = {
		opticalSize: OpticalSize;
		familyIndex: number;
		faceIndex: number;
	};

	let { opticalSize = $bindable(), familyIndex, faceIndex }: Props = $props();
</script>

<fieldset>
	<legend>Optical Size</legend>

	<Select
		id={`${familyIndex}-${faceIndex}-optical-size`}
		label="Optical Size"
		bind:value={opticalSize}
	>
		<option value="none">none</option>
		<option value="auto">auto</option>
	</Select>
</fieldset>

<style>
	fieldset {
		border: none;
		padding: 0;
		margin: 0;
		width: 100%;
	}

	legend {
		font-family: var(--ff-ss);
		font-size: 1.125rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
	}
</style>
