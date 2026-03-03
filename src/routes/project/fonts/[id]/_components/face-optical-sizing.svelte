<script lang="ts">
	import fonts from '$lib/stores/fonts.svelte';
	import Select from '$lib/components/select.svelte';

	type Props = {
		familyId: string;
		faceId: string;
	};

	let { familyId, faceId }: Props = $props();

	let value = $derived(fonts.getFace(familyId, faceId)?.opticalSizing);

	const onchange = (event: Event) => {
		const target = event.target as HTMLSelectElement;
		fonts.updateOpticalSizing(familyId, faceId, target.value);
	};
</script>

{#if value}
	<Select
		label="Font Optical Sizing"
		id={`${faceId}-optical-sizing`}
		{value}
		{onchange}
	>
		<option value="none">none</option>
		<option value="auto">auto</option>
	</Select>
{/if}
