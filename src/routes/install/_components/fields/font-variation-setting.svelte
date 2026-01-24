<script lang="ts">
	import {
		isVariationAxis,
		isVariationAxisValue,
		type VariationSetting
	} from '$lib/types';

	import Button from '$lib/components/button.svelte';
	import Input from '$lib/components/input.svelte';

	type Props = {
		variationSetting: VariationSetting;
		variationIndex: number;
		familyIndex: number;
		faceIndex: number;
		onRemove: (index: number) => void;
	};

	let {
		variationSetting = $bindable(),
		variationIndex,
		familyIndex,
		faceIndex,
		onRemove
	}: Props = $props();

	const handleChangeToAxis = () => {
		if (isVariationAxis(variationSetting)) {
			return;
		}

		variationSetting = {
			name: variationSetting.name,
			min: variationSetting.value,
			max: variationSetting.value
		};
	};

	const handleChangeToValue = () => {
		if (isVariationAxisValue(variationSetting)) {
			return;
		}
		variationSetting = {
			name: variationSetting.name,
			value: variationSetting.min
		};
	};
</script>

<fieldset>
	<legend class="sr-only">Variation Setting</legend>
	{#if isVariationAxis(variationSetting)}
		<div>
			<Input
				type="text"
				bind:value={variationSetting.name}
				id={`${familyIndex}-${faceIndex}-variation-setting-${variationIndex}-name`}
				label="Name"
			/>
			<Input
				type="number"
				bind:value={variationSetting.min}
				id={`${familyIndex}-${faceIndex}-variation-setting-${variationIndex}-min`}
				label="Minimum"
			/>
			<Input
				type="number"
				bind:value={variationSetting.max}
				id={`${familyIndex}-${faceIndex}-variation-setting-${variationIndex}-max`}
				label="Maximum"
			/>
		</div>
	{:else}
		<div>
			<Input
				type="number"
				bind:value={variationSetting.value}
				id={`${familyIndex}-${faceIndex}-variation-setting-${variationIndex}-value`}
				label="Value"
			/>
			<Input
				type="text"
				bind:value={variationSetting.name}
				id={`${familyIndex}-${faceIndex}-variation-setting-${variationIndex}-name`}
				label="Name"
			/>
		</div>
	{/if}
	<div>
		{#if isVariationAxis(variationSetting)}
			<Button size="small" width="full" onclick={handleChangeToValue}
				>Change to Value</Button
			>
		{:else}
			<Button size="small" width="full" onclick={handleChangeToAxis}
				>Change to Axis</Button
			>
		{/if}

		<Button size="small" width="full" onclick={() => onRemove(variationIndex)}
			>Remove</Button
		>
	</div>
</fieldset>

<style>
	fieldset {
		border: none;
		padding: 0;
		margin: 0;
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 100%;
	}

	div {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		width: 100%;
	}
</style>
