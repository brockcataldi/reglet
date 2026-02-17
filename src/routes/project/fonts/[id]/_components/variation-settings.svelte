<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import fonts from '$lib/stores/fonts.svelte';
	import VariationSetting from './variation-setting.svelte';

	type Props = {
		familyId: string;
		faceId: string;
	};

	let { familyId, faceId }: Props = $props();

	let value = $derived(fonts.getFace(familyId, faceId)?.variationSettings);

	const onclick = () => {
		fonts.createVariationSetting(familyId, faceId, {
			id: crypto.randomUUID(),
			name: '',
			min: 100,
			max: 900
		});
	};
</script>

{#if value}
	<div>
		<ul class="mb-4">
			<li>
				{#each value as variationSetting (variationSetting.id)}
					<VariationSetting
						{familyId}
						{faceId}
						variationId={variationSetting.id}
					/>
				{/each}
			</li>
		</ul>
		<Button {onclick}>Add Variation Setting</Button>
	</div>
{/if}
