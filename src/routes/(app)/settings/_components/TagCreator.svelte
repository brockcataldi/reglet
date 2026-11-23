<script lang="ts">
	import { Check, X } from '@lucide/svelte';

	import type { Tag } from '#lib/types.js';

	import project from '#lib/stores/project.svelte.js';

	import Button from '#lib/ui/button/button.svelte';
	import Separator from '#lib/ui/display/separator.svelte';
	import Input from '#lib/ui/form/input.svelte';

	type TagCreatorProps = {
		onCreate: (created: Tag) => void;
		onCancel: () => void;
	};

	let { onCreate, onCancel }: TagCreatorProps = $props();

	let name = $state('');
	let error = $state<string>();

	const create = (event: SubmitEvent) => {
		event.preventDefault();

		const root = project.breakpoints.root;
		error = project.tags.nameError(name);

		if (error !== undefined || !root) {
			return;
		}

		const created = project.tags.create(name, root.id);

		if (created) {
			onCreate(created);
		}
	};
</script>

<form class="w-full border border-black bg-white p-4" onsubmit={create}>
	<Separator as="label" for="new-tag-name">Name</Separator>
	<Input
		id="new-tag-name"
		class="text-xl font-bold"
		placeholder="ex. caption"
		variant={error ? 'error' : 'default'}
		aria-invalid={error !== undefined}
		aria-describedby={error ? 'new-tag-error' : undefined}
		bind:value={name}
		oninput={() => (error = undefined)}
	/>
	{#if error}
		<p id="new-tag-error" class="mt-1 text-xs text-red-800">
			{error}
		</p>
	{/if}
	<ul class="mt-4 grid grid-cols-3 gap-4">
		<li></li>
		<li>
			<Button
				class="w-full py-2"
				type="submit"
				label="Create"
				icon={Check}
			/>
		</li>
		<li>
			<Button
				class="w-full py-2"
				scheme="destructive"
				label="Cancel"
				icon={X}
				onclick={() => onCancel()}
			/>
		</li>
	</ul>
</form>
