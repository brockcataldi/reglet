<script lang="ts">
	import { cn } from '$lib/utilities';
	import type { Snippet } from 'svelte';
	import type { ClassNameValue } from 'tailwind-merge';

	type DialogProps = {
		showModal: boolean;
		children?: Snippet;
		class?: ClassNameValue;
		onclose: () => void;
	};

	let {
		showModal,
		children,
		class: className,
		onclose
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
		onclose();
	};

	const onclick = (event: MouseEvent) => {
		if (event.target !== dialog) {
			return;
		}

		dialog.close();
	};
</script>

<dialog
	class={cn(
		className,
		'top-[50%] left-[50%] max-w-120 translate-x-[-50%] translate-y-[-50%]  backdrop:bg-black/30'
	)}
	bind:this={dialog}
	onclose={handleclose}
	{onclick}
>
	<div>
		{@render children?.()}
	</div>
</dialog>
