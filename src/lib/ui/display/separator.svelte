<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { cn } from '$lib/utilities';

	type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

	type BaseProps = {
		children: Snippet;
		description?: string;
	};

	type HeadingProps = BaseProps &
		SvelteHTMLElements[HeadingElement] & {
			as?: HeadingElement;
		};

	type ParagraphProps = BaseProps &
		SvelteHTMLElements['p'] & {
			as: 'p';
		};

	type LabelProps = BaseProps &
		SvelteHTMLElements['label'] & {
			as: 'label';
		};

	type SeparatorProps = HeadingProps | ParagraphProps | LabelProps;

	let {
		as = 'h2',
		children,
		description,
		class: className,
		...props
	}: SeparatorProps = $props();
</script>

<div class="w-full">
	<div class="flex w-full flex-row items-center justify-between">
		<svelte:element
			this={as}
			class={cn('font-mono text-sm text-neutral-600 uppercase', className)}
			{...props}
		>
			{@render children?.()}
		</svelte:element>

		{#if description}
			<p class="font-mono text-xs text-cobalt-500 uppercase">
				{description}
			</p>
		{/if}
	</div>

	<hr class="my-2 text-neutral-400" />
</div>
