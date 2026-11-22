<script lang="ts">
	import { cn } from '#lib/utilities.js';
	import type { Snippet } from 'svelte';
	import type { ClassNameValue } from 'tailwind-merge';

	type DialogProps = {
		showModal: boolean;
		children?: Snippet;
		class?: ClassNameValue;
		onClose: () => void;
	};

	let {
		showModal,
		children,
		class: className,
		onClose
	}: DialogProps = $props();

	let dialog = $state<HTMLDialogElement>();

	$effect(() => {
		if (dialog === undefined) {
			return;
		}

		if (showModal === true && dialog.open === false) {
			dialog.showModal();
			return;
		}

		if (showModal === false && dialog.open === true) {
			dialog.close();
			return;
		}
	});

	const handleclose = () => {
		onClose();
	};

	const onClick = (event: MouseEvent) => {
		if (event.target !== dialog) {
			return;
		}

		dialog.close();
	};
</script>

<dialog
	class={cn(
		// pinned to the top rather than centered, so it grows downward instead
		// of jumping when its content changes height
		'inset-x-0 top-[10vh] bottom-auto mx-auto my-0 max-h-[80vh] w-[calc(100vw-2rem)] max-w-120 overflow-y-auto backdrop:bg-black/30',
		className
	)}
	bind:this={dialog}
	onclose={handleclose}
	onclick={onClick}
>
	<div>
		{@render children?.()}
	</div>
</dialog>
