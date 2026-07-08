<script lang="ts">
	import type { Unit } from '$lib/types';
	import { cn } from '$lib/utilities';
	import type { ClassValue, HTMLInputAttributes } from 'svelte/elements';

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
		...props
	}: HTMLInputAttributes & InputUnitProps = $props();
</script>

<div
	class={cn(
		'grid grid-cols-[1fr_48px] items-end justify-end',
		containerClass
	)}
>
	<input
		class={cn(
			'peer w-full border-0 border-b border-black px-1 py-2 text-right font-mono text-sm',
			'disabled:bg-neutral-100',
			'hover:border-b-2 hover:border-b-cobalt-500',
			'focus-visible:border-b-2 focus-visible:border-b-cobalt-500',
			className
		)}
		{...props}
		bind:value
	/>
	<p
		class={cn(
			'border-0 border-b border-black px-1 py-2 font-mono',
			'peer-hover:border-b-2 peer-hover:border-b-cobalt-500',
			'peer-focus-visible:border-b-2 peer-focus-visible:border-b-cobalt-500',
			unitClass
		)}
	>
		{unit}
	</p>
</div>
