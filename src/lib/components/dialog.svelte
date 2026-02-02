<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button from './button.svelte';

	type Props = {
		children: Snippet;
		open: boolean;
	};

	let { children, open = $bindable(false) }: Props = $props();

	let dialog = $state<HTMLDialogElement | null>(null);

	$effect(() => {
		if (!dialog) return;

		if (open) {
			dialog.showModal();
		} else {
			dialog.close();
		}
	});

	function onClose() {
		open = false;
	}

	function onCancel() {
		open = false;
	}
</script>

<dialog
	bind:this={dialog}
	oncancel={onCancel}
	class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-4"
>
	{@render children()}
	<Button autofocus onclick={onClose}>Close</Button>
</dialog>
