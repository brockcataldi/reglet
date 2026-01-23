<script lang="ts">
	import { toStringWeight, type Face } from '$lib/types';

	import FontStyle from './fields/font-style.svelte';
	import FontWeight from './fields/font-weight.svelte';
	import FontOpticalSize from './fields/font-optical-size.svelte';
	import FontStretch from './fields/font-stretch.svelte';
	import FontVariationSettings from './fields/font-variation-settings.svelte';

	type Props = {
		face: Face;
		familyIndex: number;
		faceIndex: number;
	};

	let { face = $bindable(), familyIndex, faceIndex }: Props = $props();
</script>

<div>
	<details>
		<summary>
			<span>
				Weight
				<strong>{toStringWeight(face.weight)}</strong>
			</span>
			<span>
				Style
				<strong>{face.style}</strong>
			</span>
		</summary>
		<FontWeight bind:weight={face.weight} {familyIndex} {faceIndex} />
		<FontStyle
			bind:style={face.style}
			bind:obliqueAngle={face.obliqueAngle}
			{familyIndex}
			{faceIndex}
		/>
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
	</details>
</div>

<style>
	div {
		width: 100%;
	}
</style>
