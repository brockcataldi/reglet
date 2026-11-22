<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { cn } from '#lib/utilities.js';

	type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

	type BaseProps = {
		children: Snippet;
		description?: string;
		action?: Snippet;
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
		action,
		class: className,
		...props
	}: SeparatorProps = $props();
</script>

<div class="w-full">
	<div class="flex w-full flex-row items-center justify-between gap-2">
		<svelte:element
			this={as}
			class={cn('text-sm text-neutral-600 uppercase', className)}
			{...props}
		>
			{@render children?.()}
		</svelte:element>

		{#if action}
			<div class="shrink-0 whitespace-nowrap">
				{@render action()}
			</div>
		{:else if description}
			<p
				class="shrink-0 text-xs whitespace-nowrap text-cobalt-500 uppercase"
			>
				{description}
			</p>
		{/if}
	</div>

	<hr class="my-2 text-neutral-400" />
</div>
