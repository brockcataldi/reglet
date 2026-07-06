<script lang="ts">
	import { cn } from '$lib/utilities';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type CheckboxProps = {
		label: string;
	} & Omit<HTMLInputAttributes, 'type'>;

	let {
		label,
		id,
		checked = $bindable(),
		...props
	}: CheckboxProps = $props();
</script>

<label
	for={id}
	class={cn(
		'group inline-flex cursor-pointer items-center gap-2',
		'has-disabled:cursor-not-allowed has-disabled:opacity-60'
	)}
>
	<input {id} type="checkbox" class="sr-only" bind:checked {...props} />

	<span
		aria-hidden="true"
		class={cn(
			'relative inline-block h-4 w-4 border border-black bg-white',
			'group-hover:border-cobalt-500 group-hover:bg-cobalt-500',
			'group-has-checked:border-black group-has-checked:bg-black',
			'group-has-focus-visible:border-cobalt-500 group-has-focus-visible:bg-cobalt-500 group-has-focus-visible:outline-2 group-has-focus-visible:outline-offset-2 group-has-focus-visible:outline-cobalt-500',
			'group-has-checked:group-hover:bg-cobalt-700 group-has-checked:group-has-focus-visible:bg-cobalt-700'
		)}
	></span>

	<span
		class={cn(
			'font-mono text-sm',
			'group-hover:text-cobalt-500',
			'group-has-focus-visible:text-cobalt-500',
			'group-has-checked:group-hover:text-cobalt-700',
			'group-has-checked:group-has-focus-visible:text-cobalt-700'
		)}>{label}</span
	>
</label>
