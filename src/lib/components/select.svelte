<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLSelectAttributes } from 'svelte/elements';

	import { cn } from '$lib/functions/utilities';

	type Props = {
		id: string;
		label: string;
		children: Snippet;
		containerClass?: string;
		inputClass?: string;
	} & HTMLSelectAttributes;

	let {
		id,
		label,
		value = $bindable(),
		containerClass,
		inputClass,
		children,
		...props
	}: Props = $props();

	const containerClasses = $derived(
		cn('flex w-full flex-col gap-1', containerClass)
	);

	const inputClasses = $derived(
		cn(
			'm-0 inline-block rounded-md bg-white px-4 py-2 text-base text-black',
			inputClass
		)
	);
</script>

<div class={containerClasses}>
	<label class="text-sm" for={id}>{label}</label>
	<select class={inputClasses} {id} bind:value {...props}>
		{@render children()}
	</select>
</div>
