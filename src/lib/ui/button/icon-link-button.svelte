<script lang="ts">
	import { cn } from '$lib/utilities';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { iconButtonVariants, type IconButtonVariantsProps } from './variants';
	import type { Component } from 'svelte';

	export type IconLinkButtonProps = {
		label: string;
		icon: Component;
	} & IconButtonVariantsProps &
		Omit<HTMLAnchorAttributes, 'children'>;

	let {
		label,
		class: className,
		icon: Icon,
		variant,
		...props
	}: IconLinkButtonProps = $props();
</script>

<a class={cn(iconButtonVariants({ variant }), className)} {...props}>
	<Icon strokeWidth={1.5} />
	<span class="sr-only">{label}</span>
</a>
