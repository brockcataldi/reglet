<script lang="ts">
	import type { VariationSetting } from '$lib/types';

	import Button from '$lib/components/button.svelte';
	import FontVariationSetting from './font-variation-setting.svelte';

	import fonts from '$lib/stores/fonts.svelte';

	type Props = {
		variationSettings: VariationSetting[];
		familyIndex: number;
		faceIndex: number;
	};

	let {
		variationSettings = $bindable(),
		familyIndex,
		faceIndex
	}: Props = $props();

	const handleAddVariationSetting = () => {
		fonts.createVariationSetting(familyIndex, faceIndex, {
			name: '',
			min: 0,
			max: 100
		});
	};
</script>

<fieldset>
	<legend>Variation Settings</legend>
	{#if variationSettings.length > 0}
		<ul>
			{#each variationSettings as _, index (`${familyIndex}-${faceIndex}-${index}`)}
				<li>
					<FontVariationSetting
						bind:variationSetting={variationSettings[index]}
						variationIndex={index}
						{familyIndex}
						{faceIndex}
					/>
				</li>
			{/each}
		</ul>
	{/if}
	<Button size="small" width="fit" onclick={handleAddVariationSetting}
		>Add Variation Setting</Button
	>
</fieldset>

<style>
	fieldset {
		border: none;
		padding: 0;
		width: 100%;
	}

	legend {
		font-family: var(--ff-ss);
		font-size: 1.125rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 100%;
		list-style: none;
		padding: 0;
		margin: 0 0 1rem;
	}

	li {
		width: 100%;
	}
</style>
