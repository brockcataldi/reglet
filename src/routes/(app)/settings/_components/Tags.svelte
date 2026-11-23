<script lang="ts">
	import { Plus } from '@lucide/svelte';

	import type { Tag } from '#lib/types.js';

	import project from '#lib/stores/project.svelte.js';

	import Button from '#lib/ui/button/button.svelte';
	import Dialog from '#lib/ui/display/dialog.svelte';

	import TagCreator from './TagCreator.svelte';
	import TagRow from './TagRow.svelte';

	let showCreator = $state(false);
	let announcement = $state('');

	const closeCreator = () => {
		showCreator = false;
	};

	const handleCreate = (created: Tag) => {
		announcement = `Added ${created.name}. Place it from the Specimen View.`;
		showCreator = false;
	};

	const remove = (tag: Tag) => {
		project.tags.delete(tag.id);
		announcement = `Deleted ${tag.name}.`;
		// the row that had focus is gone
		document.getElementById('add-tag')?.focus();
	};
</script>

<section class="w-full border-black bg-white py-8">
	<div class="mx-auto my-0 max-w-200">
		<header class="mb-4 flex flex-row items-center justify-between">
			<h2 class="text-6xl font-bold tracking-tighter text-black">Tags</h2>

			<Button
				id="add-tag"
				label="Add Tag"
				icon={Plus}
				scheme="primary"
				onclick={() => (showCreator = true)}
			/>

			<Dialog showModal={showCreator} onClose={closeCreator}>
				{#if showCreator}
					<TagCreator onCreate={handleCreate} onCancel={closeCreator} />
				{/if}
			</Dialog>
		</header>

		{#if project.tags.tags.length === 0}
			<p class="text-sm text-neutral-600">No tags yet.</p>
		{:else}
			<ul class="grid w-full grid-cols-2 gap-4">
				{#each project.tags.tags as tag (tag.id)}
					<li class="w-full border border-black bg-white p-4">
						<TagRow {tag} onDelete={() => remove(tag)} />
					</li>
				{/each}
			</ul>
		{/if}

		<p class="sr-only" aria-live="polite">{announcement}</p>
	</div>
</section>
