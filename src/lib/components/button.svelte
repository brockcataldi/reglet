<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Props = {
		size?: 'small' | 'medium';
		width?: 'full' | 'fit';
		color?: 'primary' | 'disabled' | 'error';
		children: Snippet;
	} & HTMLButtonAttributes;

	let {
		children,
		size = 'medium',
		width = 'fit',
		color = 'primary',
		...props
	}: Props = $props();

	const sizeClass = $derived(size === 'small' ? 'text-sm' : 'text-base');
	const widthClass = $derived(width === 'full' ? 'w-full' : 'w-fit');
	const colorClass = $derived(
		color === 'primary'
			? 'bg-black text-white'
			: color === 'disabled'
				? 'bg-gray-300 text-gray-500'
				: 'bg-red-700 text-white'
	);
</script>

<button
	class="inline-block cursor-pointer rounded-md border-none px-4 py-2 font-bold {sizeClass} {widthClass} {colorClass} disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
	{...props}
>
	{@render children()}
</button>
