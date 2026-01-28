<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = {
		id: string;
		label: string;
	} & HTMLInputAttributes;

	let { id, label, value = $bindable(), ...props }: Props = $props();
</script>

<div class="flex w-full flex-col gap-1">
	<label class="text-sm" for={id}>{label}</label>
	<input
		class="m-0 inline-block rounded-md bg-white px-4 py-2 text-base text-black"
		{id}
		bind:value
		{...props}
	/>
</div>
