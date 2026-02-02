<script lang="ts">
	import type { Style } from '$lib/types';

	import Select from '$lib/components/select.svelte';

	type Props = {
		style: Style;
		selectedStyles: Style[];
	};

	let { style = $bindable(), selectedStyles }: Props = $props();
</script>

<Select id="style" label="Style" bind:value={style}>
	<option value="" disabled>Select a style</option>
	{#each selectedStyles as style}
		<option value={style}>{style}</option>
	{/each}
</Select>
