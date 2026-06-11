<script lang="ts">
	import { cn } from '$lib/utilities';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { iconButtonVariants, type IconButtonVariantsProps } from './Variants';

	type ButtonProps = {
		label: string;
	} & IconButtonVariantsProps &
		HTMLButtonAttributes;

	let { label, class: className, variant, children, ...props }: ButtonProps = $props();
</script>

<button class={cn(iconButtonVariants({ variant }), className)} {...props}>
	{@render children?.()}
	<span class="sr-only">{label}</span>
</button>
