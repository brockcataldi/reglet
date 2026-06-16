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
			'block w-fit border p-4 font-mono',
			'peer-checked:border-cobalt-500 peer-checked:bg-cobalt-500 peer-checked:text-white',
			'peer-focus-visible:ring-2 peer-focus-visible:ring-cobalt-500 peer-focus-visible:ring-offset-2'
		)}
	>
		{@render children?.()}
	</span>
</label>
