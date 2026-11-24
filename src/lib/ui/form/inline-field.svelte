<script lang="ts" module>
	// bare controls sit inside an InlineField, which draws the shared rule and
	// the hover/focus state for the whole row
	export const inlineControlClass =
		'min-w-0 flex-1 border-0 bg-transparent px-2 py-2 font-mono text-sm focus:ring-0 focus:outline-none disabled:cursor-not-allowed';

	// a second control in the same row (the typed value beside a preset select)
	export const inlineSegmentClass =
		'w-20 flex-none border-l border-neutral-300';
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { ClassValue } from 'svelte/elements';

	import { cn } from '#lib/utilities.js';

	const inlineFieldVariants = cva(
		'flex items-center gap-2 border-b font-mono text-sm',
		{
			variants: {
				variant: {
					// the inset shadow thickens the rule to 2px without shifting the row
					default:
						'border-black hover:border-cobalt-500 hover:shadow-[inset_0_-1px_0_var(--color-cobalt-500)] has-focus-visible:border-cobalt-500 has-focus-visible:shadow-[inset_0_-1px_0_var(--color-cobalt-500)]',
					disabled: 'border-black bg-neutral-100',
					error: 'border-red-800 text-red-800'
				}
			},
			defaultVariants: {
				variant: 'default'
			}
		}
	);

	type InlineFieldProps = VariantProps<typeof inlineFieldVariants> & {
		/** id of the control the label focuses */
		for: string;
		label: string;
		/** suffix after the control, such as a unit */
		suffix?: string;
		class?: ClassValue;
		labelClass?: ClassValue;
		children: Snippet;
	};

	let {
		for: htmlFor,
		label,
		suffix,
		variant,
		class: className,
		labelClass,
		children
	}: InlineFieldProps = $props();
</script>

<div class={cn(inlineFieldVariants({ variant }), className)}>
	<label
		for={htmlFor}
		class={cn(
			'w-32 shrink-0 px-1 py-2 uppercase',
			variant === 'error' ? 'text-red-800' : 'text-neutral-600',
			labelClass
		)}>{label}</label
	>
	{@render children()}
	{#if suffix}
		<span class="w-12 shrink-0 px-2">{suffix}</span>
	{/if}
</div>
