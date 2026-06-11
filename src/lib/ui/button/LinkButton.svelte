<script lang="ts">
	import { cn } from '$lib/utilities';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { textButtonVariants, type TextButtonVariantsProps } from './Variants';

	type ButtonProps = TextButtonVariantsProps & HTMLAnchorAttributes;

	let { class: className, variant, children, ...props }: ButtonProps = $props();
</script>

<a class={cn(textButtonVariants({ variant }), className)} {...props}>
	{@render children?.()}
</a>
