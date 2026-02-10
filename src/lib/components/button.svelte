<script lang="ts">
	import { cn } from '$lib/functions/utilities';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Props = {
		width?: 'full' | 'fit';
		color?: 'primary' | 'disabled' | 'error';
		children: Snippet;
	} & HTMLButtonAttributes;

	let {
		children,
		width = 'fit',
		color = 'primary',
		...props
	}: Props = $props();

	const classes = $derived(
		cn([
			props.class,
			'inline-block h-fit cursor-pointer rounded-md border border-solid px-4 py-2 font-bold text-base',
			'disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500',
			width === 'full' && 'w-full',
			width === 'fit' && 'w-fit',
			color === 'primary' && 'border-black text-black bg-white',
			color === 'error' && 'border-red-900 text-red-900 bg-red-100',
			color === 'disabled' && 'bg-gray-300 text-gray-500'
		])
	);
</script>

<button class={classes} {...props}>
	{@render children()}
</button>
