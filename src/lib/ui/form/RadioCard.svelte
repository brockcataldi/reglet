<script lang="ts">
	import { cn } from '$lib/utilities';
	import type { Snippet } from 'svelte';
	import { type HTMLInputAttributes } from 'svelte/elements';

	type Props = Omit<HTMLInputAttributes, 'type'> & {
		class?: string;
		children?: Snippet;
	};

	let { class: className, children, group = $bindable(), ...props }: Props = $props();
</script>

<label class={cn('block cursor-pointer', className)}>
	<input bind:group {...props} type="radio" class="peer sr-only" />

	<span
		class={cn(
			'block h-full w-fit border border-black p-4 font-mono text-black',
			'peer-checked:border-black peer-checked:bg-black peer-checked:text-white',
			'hover:border-cobalt-500 hover:bg-cobalt-500 hover:text-white',
			'peer-focus-visible:border-cobalt-500 peer-focus-visible:bg-cobalt-500 peer-focus-visible:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-cobalt-500 peer-focus-visible:ring-offset-2'
		)}
	>
		{@render children?.()}
	</span>
</label>
