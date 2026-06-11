<script lang="ts">
	import { cn } from '$lib/utilities';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { iconButtonVariants, type IconButtonVariantsProps } from './Variants';

	type ButtonProps = {
		label: string;
	} & IconButtonVariantsProps &
		HTMLAnchorAttributes;

	let { label, class: className, variant, children, ...props }: ButtonProps = $props();
</script>

<a class={cn(iconButtonVariants({ variant }), className)} {...props}>
	{@render children?.()}
	<span class="sr-only">{label}</span>
</a>
