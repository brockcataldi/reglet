<script lang="ts">
	import { Trash2 } from '@lucide/svelte';

	import type { Tag } from '#lib/types.js';

	import project from '#lib/stores/project.svelte.js';

	import Button from '#lib/ui/button/button.svelte';
	import Input from '#lib/ui/form/input.svelte';

	type TagRowProps = {
		tag: Tag;
		// where the tag is placed, ex. "root: step 6 · Arial 400"
		placements: string[];
	};

	let { tag, placements }: TagRowProps = $props();

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

<div class="grid grid-cols-[minmax(0,16rem)_1fr_auto] items-start gap-4">
	<div>
		<label for={inputId} class="sr-only">Name of {tag.name}</label>
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
		{#if error}
			<p id={errorId} class="mt-1 font-mono text-xs text-red-800">
				{error}
			</p>
		{/if}
	</div>

	<p class="pt-2 font-mono text-sm text-neutral-600">
		{#if placements.length === 0}
			Unplaced
		{:else}
			{placements.join(', ')}
		{/if}
	</p>

	<Button
		label="Delete"
		aria-label={`Delete ${tag.name}`}
		size="sm"
		class="mt-1"
		icon={Trash2}
		scheme="destructive"
		onclick={() => project.tags.delete(tag.id)}
	/>
</div>
