<script lang="ts">
	import fonts from '$lib/stores/fonts.svelte';

	import Button from '$lib/components/button.svelte';

	import FaceStyle from './style.svelte';
	import OpticalSizing from './optical-sizing.svelte';
	import Stretch from './stretch.svelte';
	import Weight from './weight.svelte';
	import VariationSettings from './variation-settings.svelte';

	type Props = {
		familyId: string;
		faceId: string;
	};

	let { familyId, faceId }: Props = $props();

	let family = $derived(fonts.families.find((f) => f.id === familyId));
	let face = $derived(family?.faces.find((f) => f.id === faceId));

	const handleClickDelete = () => {
		fonts.deleteFace(familyId, faceId);
	};
</script>

{#if face && family}
	<div>
		<p
			class="text-5xl"
			style:font-family={family.family}
			style:font-style={face.style}
			style:font-optical-sizing={face.opticalSizing}
		>
			Lorem Ipsum
		</p>
	</div>

	<div class="grid grid-cols-[repeat(2,180px)] gap-2">
		<FaceStyle {familyId} {faceId} />
		<OpticalSizing {familyId} {faceId} />
	</div>
	<Weight {familyId} {faceId} />
	<Stretch {familyId} {faceId} />
	<VariationSettings {familyId} {faceId} />

	<Button color="destructive" width="fit" onclick={handleClickDelete}>
		Delete Face
	</Button>
{/if}
