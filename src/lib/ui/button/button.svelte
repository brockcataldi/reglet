<script lang="ts">
	import type { Component } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { cn } from '$lib/utilities';

	import {
		textButtonVariants,
		type TextButtonVariantsProps
	} from './variants';

	type ButtonProps = {
		icon?: Component;
		iconPosition?: 'prepend' | 'append';
		label: string;
	} & TextButtonVariantsProps &
		Omit<HTMLButtonAttributes, 'children'>;

	let {
		class: className,
		icon: Icon,
		iconPosition = 'prepend',
		label,
		variant,
		...props
	}: ButtonProps = $props();
</script>

<button class={cn(textButtonVariants({ variant }), className)} {...props}>
	{#if Icon && iconPosition === 'prepend'}
		<Icon strokeWidth={1.5} />
	{/if}
	{label}
	{#if Icon && iconPosition === 'append'}
		<Icon strokeWidth={1.5} />
	{/if}
</button>
