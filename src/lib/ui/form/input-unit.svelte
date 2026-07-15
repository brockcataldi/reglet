<script lang="ts">
	import type { Unit } from '$lib/types';
	import { cn } from '$lib/utilities';
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { ClassValue, HTMLInputAttributes } from 'svelte/elements';

	const inputUnitInputVariants = cva(
		'w-full border-0 border-b px-1 py-2 font-mono text-sm peer text-right',
		{
			variants: {
				variant: {
					default:
						'border-black bg-transparent hover:border-b-2 hover:border-b-cobalt-500 focus-visible:border-b-2 focus-visible:border-b-cobalt-500',
					disabled: 'border-black bg-transparent disabled:bg-neutral-100',
					error: 'border-red-800 placeholder:text-red-800/50 text-red-800'
				}
			},
			defaultVariants: {
				variant: 'default'
			}
		}
	);

	const inputUnitSuffixVariants = cva(
		'border-0 border-b px-1 py-2 font-mono',
		{
			variants: {
				variant: {
					default:
						'text-black border-black peer-hover:border-b-2 peer-hover:border-b-cobalt-500 peer-focus-visible:border-b-2 peer-focus-visible:border-b-cobalt-500',
					disabled: 'border-black bg-transparent disabled:bg-neutral-100',
					error: 'border-red-800 text-red-800'
				}
			},
			defaultVariants: {
				variant: 'default'
			}
		}
	);

	type InputUnitInputVariants = VariantProps<
		typeof inputUnitInputVariants
	>;

	type InputUnitProps = {
		unit: Unit;
		unitClass?: ClassValue;
		containerClass?: ClassValue;
	};

	let {
		unit,
		unitClass,
		containerClass,
		class: className,
		value = $bindable(),
		variant,
		...props
	}: HTMLInputAttributes &
		InputUnitProps &
		InputUnitInputVariants = $props();
</script>

<div
	class={cn(
		'grid grid-cols-[1fr_48px] items-end justify-end',
		containerClass
	)}
>
	<input
		class={cn(inputUnitInputVariants({ variant }), className)}
		{...props}
		bind:value
	/>
	<p class={cn(inputUnitSuffixVariants({ variant }), unitClass)}>
		{unit}
	</p>
</div>
