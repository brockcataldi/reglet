<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLSelectAttributes } from 'svelte/elements';

	type Props = {
		id: string;
		label: string;
		children: Snippet;
	} & HTMLSelectAttributes;

	let { id, label, value = $bindable(), children, ...props }: Props = $props();
</script>

<div class="flex w-full flex-col gap-1">
	<label class="text-sm" for={id}>{label}</label>
	<select
		class="m-0 inline-block rounded-md bg-white px-4 py-2 text-base text-black"
		{id}
		bind:value
		{...props}
	>
		{@render children()}
	</select>
</div>
