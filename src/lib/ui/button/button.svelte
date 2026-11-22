<script lang="ts">
	import type { Component } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { cn } from '#lib/utilities.js';

	import {
		textButtonVariants,
		type TextButtonVariantsProps
	} from './variants';

	type ButtonProps = {
		// buttons pair an icon with their text unless `iconOnly` is set
		icon: Component;
		iconPosition?: 'prepend' | 'append';
		// with `iconOnly`, read by screen readers and shown on hover
		label: string;
	} & TextButtonVariantsProps &
		Omit<HTMLButtonAttributes, 'children'>;

	let {
		class: className,
		icon: Icon,
		iconPosition = 'prepend',
		label,
		scheme,
		size,
		iconOnly = false,
		...props
	}: ButtonProps = $props();
</script>

<button
	class={cn(textButtonVariants({ scheme, size, iconOnly }), className)}
	title={iconOnly ? label : undefined}
	{...props}
>
	{#if iconOnly}
		<Icon strokeWidth={1.5} aria-hidden="true" />
		<span class="sr-only">{label}</span>
	{:else}
		{#if iconPosition === 'prepend'}
			<Icon strokeWidth={1.5} />
		{/if}
		{label}
		{#if iconPosition === 'append'}
			<Icon strokeWidth={1.5} />
		{/if}
	{/if}
</button>
