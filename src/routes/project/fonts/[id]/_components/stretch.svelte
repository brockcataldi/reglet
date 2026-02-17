<script lang="ts">
	import fonts from '$lib/stores/fonts.svelte';
	import Input from '$lib/components/input.svelte';

	type Props = {
		familyId: string;
		faceId: string;
	};

	let { familyId, faceId }: Props = $props();

	let value = $derived(fonts.getFace(familyId, faceId)?.stretch);

	const onchange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		fonts.updateStretch(familyId, faceId, target.value);
	};
</script>

{#if value}
	<Input
		label="Font Stretch"
		type="text"
		id={`${faceId}-stretch`}
		{value}
		{onchange}
	/>
{/if}
