<script lang="ts">
	import { cn } from '$lib/utilities';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import {
		iconButtonVariants,
		type IconButtonVariantsProps
	} from './variants';
	import type { Component } from 'svelte';

	type IconButtonProps = {
		label: string;
		icon: Component;
	} & IconButtonVariantsProps &
		Omit<HTMLButtonAttributes, 'children'>;

	let {
		label,
		class: className,
		variant,
		icon: Icon,
		...props
	}: IconButtonProps = $props();
</script>

<button class={cn(iconButtonVariants({ variant }), className)} {...props}>
	<Icon strokeWidth={1.5} />
	<span class="sr-only">{label}</span>
</button>
