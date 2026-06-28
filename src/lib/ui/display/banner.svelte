<script lang="ts">
	import { cn } from '$lib/utilities';
	import { cva, type VariantProps } from 'class-variance-authority';

	import type { Component, Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	const bannerVariants = cva('py-2 px-4 font-mono text-sm', {
		variants: {
			variant: {
				primary: 'border-cobalt-500 text-cobalt-500 bg-cobalt-50',
				success: 'text-black bg-lime-300',
				destructive: 'border-red-700 text-red-700 bg-red-100'
			}
		},
		defaultVariants: {
			variant: 'primary'
		}
	});

	type BannerVariantProps = VariantProps<typeof bannerVariants>;

	type BannerProps = {
		icon?: Component;
		children?: Snippet;
	} & BannerVariantProps &
		HTMLAttributes<HTMLDivElement>;

	let {
		class: className,
		children,
		icon: Icon,
		variant,
		...props
	}: BannerProps = $props();
</script>

<div class={cn(bannerVariants({ variant }), className)} {...props}>
	{#if Icon}
		<Icon />
	{/if}
	<p>
		{@render children?.()}
	</p>
</div>
