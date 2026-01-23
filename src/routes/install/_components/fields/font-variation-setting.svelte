<script lang="ts">
	import {
		isVariationAxis,
		isVariationAxisValue,
		type VariationSetting
	} from '$lib/types';

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
	<legend>Variation Setting</legend>
	<section>
		{#if isVariationAxis(variationSetting)}
			<div>
				<label
					for={`${familyIndex}-${faceIndex}-variation-setting-${variationIndex}-name`}
					>Name</label
				>
				<input
					type="text"
					bind:value={variationSetting.name}
					id={`${familyIndex}-${faceIndex}-variation-setting-${variationIndex}-name`}
				/>
			</div>
			<div>
				<label
					for={`${familyIndex}-${faceIndex}-variation-setting-${variationIndex}-min`}
					>Minimum</label
				>
				<input
					type="number"
					bind:value={variationSetting.min}
					id={`${familyIndex}-${faceIndex}-variation-setting-${variationIndex}-min`}
				/>
			</div>
			<div>
				<label
					for={`${familyIndex}-${faceIndex}-variation-setting-${variationIndex}-max`}
					>Maximum</label
				>
				<input
					type="number"
					bind:value={variationSetting.max}
					id={`${familyIndex}-${faceIndex}-variation-setting-${variationIndex}-max`}
				/>
			</div>
			<button onclick={handleChangeToValue}>Change to Value</button>
		{:else}
			<div>
				<label
					for={`${familyIndex}-${faceIndex}-variation-setting-${variationIndex}-value`}
					>Value</label
				>
				<input
					type="number"
					bind:value={variationSetting.value}
					id={`${familyIndex}-${faceIndex}-variation-setting-${variationIndex}-value`}
				/>
			</div>
			<div>
				<label
					for={`${familyIndex}-${faceIndex}-variation-setting-${variationIndex}-name`}
					>Name</label
				>
				<input
					type="text"
					bind:value={variationSetting.name}
					id={`${familyIndex}-${faceIndex}-variation-setting-${variationIndex}-name`}
				/>
			</div>

			<button onclick={handleChangeToAxis}>Change to Axis</button>
		{/if}
		<button onclick={() => onRemove(variationIndex)}>Remove</button>
	</section>
</fieldset>
