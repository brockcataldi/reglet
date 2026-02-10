<script lang="ts">
	import type { Style } from '$lib/types';
	import fonts from '$lib/stores/fonts.svelte';
	import Select from '$lib/components/select.svelte';

	type Props = {
		familyId: string;
		faceId: string;
	};

	let { familyId, faceId }: Props = $props();

	let value = $derived(fonts.getFace(familyId, faceId)?.style);

	const onchange = (event: Event) => {
		const target = event.target as HTMLSelectElement;
		fonts.updateStyle(familyId, faceId, target.value as Style);
	};
</script>

{#if value}
	<Select label="Font Style" id={`${faceId}-style`} {value} {onchange}>
		<option value="normal">normal</option>
		<option value="italic">italic</option>
	</Select>
{/if}
