<script lang="ts">
	import { cn } from '$lib/functions/utilities';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = {
		id: string;
		label: string;
		description?: string;
		containerClass?: string;
		inputClass?: string;
	} & HTMLInputAttributes;

	let {
		id,
		label,
		description,
		containerClass,
		inputClass,
		value = $bindable(),
		...props
	}: Props = $props();

	const containerClasses = $derived(
		cn('flex w-full flex-col gap-1', containerClass)
	);

	const inputClasses = $derived(
		cn(
			'm-0 block rounded-md bg-white px-4 py-2 text-base text-black disabled:cursor-not-allowed disabled:opacity-50',
			inputClass
		)
	);
</script>

<div class={containerClasses}>
	<label class="text-sm" for={id}>{label}</label>
	<input class={inputClasses} {id} bind:value {...props} />
	{#if description}
		<p class="text-sm text-gray-500">{description}</p>
	{/if}
</div>
