<script lang="ts">
	import { Trash } from '@lucide/svelte';

	import type { Tag } from '#lib/types.js';

	import project from '#lib/stores/project.svelte.js';

	import Button from '#lib/ui/button/button.svelte';
	import Separator from '#lib/ui/display/separator.svelte';
	import Input from '#lib/ui/form/input.svelte';

	type TagRowProps = {
		tag: Tag;
		onDelete: () => void;
	};

	let { tag, onDelete }: TagRowProps = $props();

	// edits stay local until committed, so a half-typed clash isn't saved;
	// undefined means not editing, so renames from elsewhere show through
	let draft = $state<string>();
	let error = $state<string>();

	const inputId = $derived(`tag-${tag.id}-name`);
	const errorId = $derived(`tag-${tag.id}-error`);

	const revert = () => {
		draft = undefined;
		error = undefined;
	};

	const commit = () => {
		if (draft === undefined || draft.trim() === tag.name) {
			revert();
			return;
		}

		error = project.tags.nameError(draft, tag.id);

		if (error === undefined) {
			project.tags.rename(tag.id, draft);
			draft = undefined;
		}
	};
</script>

<div>
	<div class="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
		<div>
			<Separator as="label" for={inputId}
				>Name<span class="sr-only"> of {tag.name}</span></Separator
			>
			<Input
				id={inputId}
				class="text-xl font-bold"
				variant={error ? 'error' : 'default'}
				aria-invalid={error !== undefined}
				aria-describedby={error ? errorId : undefined}
				bind:value={() => draft ?? tag.name, (value) => (draft = value)}
				onblur={commit}
				onkeydown={(event) => {
					if (event.key === 'Enter') {
						event.preventDefault();
						commit();
					} else if (event.key === 'Escape') {
						revert();
					}
				}}
			/>
		</div>

		<Button
			label="Delete"
			aria-label={`Delete ${tag.name}`}
			icon={Trash}
			scheme="destructive"
			onclick={onDelete}
		/>
	</div>
	{#if error}
		<p id={errorId} class="mt-1 text-xs text-red-800">
			{error}
		</p>
	{/if}
</div>
