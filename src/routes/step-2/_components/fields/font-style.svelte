<script lang="ts">
	import type { Style } from '$lib/types';

	import Select from '$lib/components/select.svelte';

	type Props = {
		id: string;
		style: Style;
		selectedStyles: Style[];
	};

	let { id, style = $bindable(), selectedStyles }: Props = $props();
</script>

<Select id={`${id}-style`} label="Style" bind:value={style}>
	<option value="" disabled>Select a style</option>
	{#each selectedStyles as style (`${id}-style-${style}`)}
		<option value={style}>{style}</option>
	{/each}
</Select>
