<script lang="ts">
	import fonts from '$lib/stores/fonts.svelte';

	import Button from '$lib/components/button.svelte';
	import FontDemo from '$lib/components/font-demo.svelte';

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
	<div class="rounded-md border border-neutral-300 p-4">
		<div class="mb-4">
			<FontDemo {familyId} {faceId} showSliders={true} showValues={false} />
		</div>

		<hr class="my-4" />

		<div class="grid grid-cols-3 gap-2">
			<FaceStyle {familyId} {faceId} />
			<OpticalSizing {familyId} {faceId} />
			<Stretch {familyId} {faceId} />
		</div>

		<hr class="my-4" />

		<Weight {familyId} {faceId} />

		<hr class="my-4" />

		<VariationSettings {familyId} {faceId} />

		<hr class="my-4" />

		<Button color="destructive" width="fit" onclick={handleClickDelete}>
			Delete Face
		</Button>
	</div>
{/if}
