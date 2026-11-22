<script lang="ts">
	import { Plus, Trash2 } from '@lucide/svelte';

	import { TAG_TEMPLATES } from '#lib/constants.js';
	import { isTagNameTaken } from '#lib/domain/tags/normalize-tag-name.js';
	import { validateTagNames } from '#lib/domain/project/validate-draft.js';
	import project from '#lib/stores/project.svelte.js';

	import Button from '#lib/ui/button/button.svelte';
	import IconButton from '#lib/ui/button/icon-button.svelte';
	import Banner from '#lib/ui/display/banner.svelte';
	import Separator from '#lib/ui/display/separator.svelte';
	import Input from '#lib/ui/form/input.svelte';
	import RadioCard from '#lib/ui/form/radio-card.svelte';

	const draft = project.draft;

	const errors = $derived(validateTagNames(draft.tags));
</script>

<svelte:head>
	<title>Tags - Reglet</title>
</svelte:head>

<div class="mb-4 w-full">
	<Separator as="h2" description="Replaces the list below"
		>Template</Separator
	>
	<div class="grid grid-cols-2 gap-2">
		{#each TAG_TEMPLATES as template (template.id)}
			<RadioCard value={template.id} bind:group={draft.template}>
				<span class="flex flex-col gap-1">
					<span class="text-xl font-semibold">{template.name}</span>
					<span class="text-sm">{template.description}</span>
				</span>
			</RadioCard>
		{/each}
	</div>
</div>

<div class="w-full">
	<Separator as="h2" description={`${draft.tags.length} tags`}
		>Tags</Separator
	>

	{#if draft.tags.length === 0}
		<p class="font-mono text-sm text-neutral-600">
			No tags yet. You can add them now or later in the editor.
		</p>
	{/if}

	<ul class="flex flex-col gap-2">
		{#each draft.tags as tag (tag.id)}
			{@const invalid =
				tag.name.trim() === '' ||
				tag.name.includes('/') ||
				isTagNameTaken(draft.tags, tag.name, tag.id)}
			<li class="flex flex-row items-center gap-4">
				<label for={`tag-${tag.id}`} class="sr-only">Tag name</label>
				<Input
					id={`tag-${tag.id}`}
					placeholder="ex. h1"
					variant={invalid ? 'error' : 'default'}
					bind:value={tag.name}
				/>
				<span
					class="w-20 shrink-0 font-mono text-xs text-neutral-600 uppercase"
				>
					{tag.step === null ? 'Unplaced' : `Step ${tag.step}`}
				</span>
				<IconButton
					label={`Remove ${tag.name || 'tag'}`}
					icon={Trash2}
					scheme="destructive"
					onclick={() => draft.removeTag(tag.id)}
				/>
			</li>
		{/each}
	</ul>

	<Button
		class="mt-4"
		size="sm"
		icon={Plus}
		label="Add tag"
		onclick={() => draft.addTag()}
	/>

	{#each errors as error (error)}
		<Banner scheme="destructive" class="mt-4">{error}</Banner>
	{/each}
</div>
