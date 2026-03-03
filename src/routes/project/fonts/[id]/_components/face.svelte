<script lang="ts">
	import fonts from '$lib/stores/fonts.svelte';

	import Button from '$lib/components/button.svelte';
	import FontDemo from '$lib/components/font-demo.svelte';

	import FaceStyle from './face-style.svelte';
	import FaceOpticalSizing from './face-optical-sizing.svelte';
	import FaceStretch from './face-stretch.svelte';
	import FaceWeight from './face-weight.svelte';
	import FaceVariationSettings from './face-variation-settings.svelte';
	import Trash from '$lib/icons/trash.svelte';

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

		<hr class="my-4 border-neutral-300" />

		<div class="grid grid-cols-3 gap-2">
			<FaceStyle {familyId} {faceId} />
			<FaceOpticalSizing {familyId} {faceId} />
			<FaceStretch {familyId} {faceId} />
		</div>

		<hr class="my-4 border-neutral-300" />

		<FaceWeight {familyId} {faceId} />

		<hr class="my-4 border-neutral-300" />

		<FaceVariationSettings {familyId} {faceId} />

		<hr class="my-4 border-neutral-300" />

		<Button
			icon={Trash}
			color="destructive"
			width="fit"
			onclick={handleClickDelete}
		>
			Delete Face
		</Button>
	</div>
{/if}
