<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = {
		id: string;
		label: string;
		description?: string;
	} & HTMLInputAttributes;

	let {
		id,
		label,
		description,
		value = $bindable(),
		min,
		max,
		...props
	}: Props = $props();
</script>

<div class="flex w-full flex-col gap-1">
	<label class="text-sm" for={id}>{label}</label>
	<div class="flex flex-row items-center justify-between gap-4">
		<p>{min}</p>
		<input class="w-full" type="range" bind:value {id} {min} {max} {...props} />
		<p>{max}</p>
	</div>
	{#if description}
		<p class="text-sm text-gray-500">{description}</p>
	{/if}
</div>
