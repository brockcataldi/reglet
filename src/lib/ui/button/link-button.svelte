<script lang="ts">
	import { cn } from '$lib/utilities';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import {
		textButtonVariants,
		type TextButtonVariantsProps
	} from './variants';
	import type { Component } from 'svelte';

	type LinkButtonProps = {
		icon?: Component;
		iconPosition?: 'prepend' | 'append';
		label: string;
	} & TextButtonVariantsProps &
		Omit<HTMLAnchorAttributes, 'children'>;

	let {
		class: className,
		variant,
		icon: Icon,
		iconPosition = 'prepend',
		label,
		...props
	}: LinkButtonProps = $props();
</script>

<a class={cn(textButtonVariants({ variant }), className)} {...props}>
	{#if Icon && iconPosition === 'prepend'}
		<Icon strokeWidth={1.5} />
	{/if}
	{label}
	{#if Icon && iconPosition === 'append'}
		<Icon strokeWidth={1.5} />
	{/if}
</a>
