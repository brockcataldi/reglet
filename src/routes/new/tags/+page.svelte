<script lang="ts">
	import { CircleAlert, Plus } from '@lucide/svelte';

	import { validateTagNames } from '#lib/domain/project/validate-draft.js';
	import project from '#lib/stores/project.svelte.js';

	import Button from '#lib/ui/button/button.svelte';
	import Separator from '#lib/ui/display/separator.svelte';

	import StartFrom from './_components/start-from.svelte';
	import TagRow from './_components/tag-row.svelte';

	const draft = project.draft;

	const errors = $derived(validateTagNames(draft.tags));
</script>

<svelte:head>
	<title>Tags - Reglet</title>
</svelte:head>

<div class="w-full">
	<StartFrom />

	<div class="mt-6">
		<Separator as="h2">Tags ({draft.tags.length})</Separator>

		{#if draft.tags.length === 0}
			<p class="text-sm text-neutral-600">
				No tags yet. You can add them now or later in the editor.
			</p>
		{/if}

		<ul class="flex flex-col gap-2">
			{#each draft.tags as tag (tag.id)}
				<TagRow {tag} />
			{/each}
		</ul>

		<p class="mt-3 text-sm text-neutral-600">
			The step sets where each tag starts on the type scale (0 is the base
			size, each step up is bigger). You can move tags to other steps any
			time in the editor.
		</p>

		<Button
			class="mt-4"
			icon={Plus}
			label="Add tag"
			onclick={() => draft.addTag()}
		/>

		{#each errors as error (error)}
			<p class="mt-2 flex items-center gap-2 text-sm text-red-800">
				<CircleAlert class="size-4 shrink-0" />
				{error}
			</p>
		{/each}
	</div>
</div>
