<script lang="ts">
	import { type Face, toStringWeight } from '$lib/types';

	import Accordion from '$lib/components/accordion.svelte';
	import Button from '$lib/components/button.svelte';

	import FontStyle from './fields/font-style.svelte';
	import FontWeight from './fields/font-weight.svelte';
	import FontOpticalSize from './fields/font-optical-size.svelte';
	import FontStretch from './fields/font-stretch.svelte';
	import FontVariationSettings from './fields/font-variation-settings.svelte';

	import fonts from '$lib/stores/fonts.svelte';

	type Props = {
		face: Face;
		familyIndex: number;
		faceIndex: number;
	};

	let { face = $bindable(), familyIndex, faceIndex }: Props = $props();

	const handleDeleteFace = () => {
		fonts.deleteFace(familyIndex, faceIndex);
	};
</script>

<Accordion justify="start">
	{#snippet header()}
		<span>
			Weight
			<code>{toStringWeight(face.weight)}</code>
		</span>
		<span>
			Style
			<code>{face.style}</code>
		</span>
	{/snippet}

	<div>
		<FontWeight bind:weight={face.weight} {familyIndex} {faceIndex} />
		<FontStyle bind:style={face.style} {familyIndex} {faceIndex} />
		<FontOpticalSize
			bind:opticalSize={face.opticalSize}
			{familyIndex}
			{faceIndex}
		/>
		<FontStretch bind:stretch={face.stretch} {familyIndex} {faceIndex} />
		<FontVariationSettings
			bind:variationSettings={face.variationSettings}
			{familyIndex}
			{faceIndex}
		/>

		<Button size="small" width="full" color="error" onclick={handleDeleteFace}
			>Delete Face</Button
		>
	</div>
</Accordion>

<style>
	span {
		font-family: var(--ff-ss);
		font-size: 0.875rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		justify-content: space-between;
		padding: 0.25rem 0.5rem;
		border: 1px solid var(--c-whi);
		border-radius: 0.25rem;
	}

	code {
		font-family: var(--ff-m);
		font-size: 0.875rem;
	}

	div {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 100%;
		align-items: flex-start;
		justify-content: flex-start;
	}
</style>
