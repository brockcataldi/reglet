<script lang="ts">
	import type { VariationSetting } from '$lib/types';
	import FontVariationSetting from './font-variation-setting.svelte';

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
		variationSettings.push({
			name: '',
			min: 0,
			max: 100
		});
	};

	const handleRemoveVariationSetting = (index: number) => {
		variationSettings = variationSettings.filter((_, i) => i !== index);
	};
</script>

<fieldset>
	<legend>Variation Settings</legend>
	<section>
		<ul>
			{#each variationSettings as _, index (`${familyIndex}-${faceIndex}-${index}`)}
				<li>
					<FontVariationSetting
						bind:variationSetting={variationSettings[index]}
						variationIndex={index}
						{familyIndex}
						{faceIndex}
						onRemove={handleRemoveVariationSetting}
					/>
				</li>
			{/each}
		</ul>
		<button onclick={handleAddVariationSetting}>Add Variation Setting</button>
	</section>
</fieldset>
