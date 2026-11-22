<script lang="ts">
	import { cn } from '#lib/utilities.js';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import {
		textButtonVariants,
		type TextButtonVariantsProps
	} from './variants';
	import type { Component } from 'svelte';

	type LinkButtonProps = {
		// buttons always pair an icon with their text
		icon: Component;
		iconPosition?: 'prepend' | 'append';
		label: string;
	} & TextButtonVariantsProps &
		Omit<HTMLAnchorAttributes, 'children'>;

	let {
		class: className,
		scheme,
		size,
		icon: Icon,
		iconPosition = 'prepend',
		label,
		...props
	}: LinkButtonProps = $props();
</script>

<a class={cn(textButtonVariants({ scheme, size }), className)} {...props}>
	{#if iconPosition === 'prepend'}
		<Icon strokeWidth={1.5} />
	{/if}
	{label}
	{#if iconPosition === 'append'}
		<Icon strokeWidth={1.5} />
	{/if}
</a>
