<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = {
		id: string;
		children: Snippet;
		checked: boolean;
	} & HTMLInputAttributes;

	let { id, children, checked = $bindable(), ...props }: Props = $props();
</script>

<div class="relative">
	<input
		type="checkbox"
		bind:checked
		{id}
		{...props}
		class="absolute top-[50%] left-4 translate-y-[-50%]"
	/>
	<label
		for={id}
		class="inline-block h-fit cursor-pointer rounded-md border border-solid py-2 pr-4 pl-10 text-base font-bold"
	>
		{@render children()}
	</label>
</div>
