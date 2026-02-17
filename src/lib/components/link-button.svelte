<script lang="ts">
	import type { Component, Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	import { cn } from '$lib/functions/utilities';

	type Props = {
		icon?: Component;
		hideText?: boolean;
		width?: 'full' | 'fit';
		color?: 'primary' | 'disabled' | 'destructive';
		children: Snippet;
	} & HTMLAnchorAttributes;

	let {
		icon,
		hideText,
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
			color === 'destructive' && 'border-red-900 text-red-900 bg-red-100',
			color === 'disabled' && 'bg-gray-300 text-gray-500',
			icon !== undefined &&
				hideText !== true &&
				'inline-flex items-center justify-center gap-2',
			icon !== undefined && hideText === true && 'px-2'
		])
	);
	const Icon = $derived(icon);
</script>

<a class={classes} {...props}>
	{#if Icon}
		<Icon></Icon>
	{/if}
	<span class={cn(hideText === true && 'sr-only')}>
		{@render children()}
	</span>
</a>
