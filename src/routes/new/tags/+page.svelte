<script lang="ts">
	import { Import, Plus, Trash2 } from '@lucide/svelte';

	import { TAG_TEMPLATES } from '#lib/constants.js';

	import { isTagNameTaken } from '#lib/domain/tags/normalize-tag-name.js';
	import { validateTagNames } from '#lib/domain/project/validate-draft.js';
	import project from '#lib/stores/project.svelte.js';

	import Button from '#lib/ui/button/button.svelte';
	import Banner from '#lib/ui/display/banner.svelte';
	import Separator from '#lib/ui/display/separator.svelte';
	import Input from '#lib/ui/form/input.svelte';
	import Select from '#lib/ui/form/select.svelte';

	const draft = project.draft;

	const errors = $derived(validateTagNames(draft.tags));

	// what the select points at; nothing changes until it's loaded
	let selected = $state(draft.template);

	const selectedTemplate = $derived(
		TAG_TEMPLATES.find((template) => template.id === selected)
	);

	let announcement = $state('');

	const load = () => {
		draft.loadTemplate(selected);
		announcement = `Loaded ${selectedTemplate?.name}: ${draft.tags.length} tags.`;
	};
</script>

<svelte:head>
	<title>Tags - Reglet</title>
</svelte:head>

<div class="mb-4 w-full">
	<Separator
		as="label"
		for="tag-template"
		description="Replaces the tags below">Template</Separator
	>
	<div class="flex flex-row items-end gap-4">
		<Select
			id="tag-template"
			aria-describedby="tag-template-description"
			value={selected}
			onchange={(event) => (selected = event.currentTarget.value)}
		>
			{#each TAG_TEMPLATES as template (template.id)}
				<option value={template.id}>{template.name}</option>
			{/each}
		</Select>
		<Button label="Load" icon={Import} onclick={load} />
	</div>
	{#if selectedTemplate}
		<p id="tag-template-description" class="mt-2 text-sm text-neutral-600">
			{selectedTemplate.description}
			{selectedTemplate.tags.length}
			{selectedTemplate.tags.length === 1 ? 'tag' : 'tags'}.
		</p>
	{/if}
	<p class="sr-only" aria-live="polite">{announcement}</p>
</div>

<div class="w-full">
	<Separator as="h2" description={`${draft.tags.length} tags`}
		>Tags</Separator
	>

	{#if draft.tags.length === 0}
		<p class="text-sm text-neutral-600">
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
				<span class="w-20 shrink-0 text-xs text-neutral-600 uppercase">
					{tag.step === null ? 'Unplaced' : `Step ${tag.step}`}
				</span>
				<Button
					label="Remove"
					aria-label={`Remove ${tag.name || 'tag'}`}
					icon={Trash2}
					scheme="destructive"
					onclick={() => draft.removeTag(tag.id)}
				/>
			</li>
		{/each}
	</ul>

	<Button
		class="mt-4"
		icon={Plus}
		label="Add tag"
		onclick={() => draft.addTag()}
	/>

	{#each errors as error (error)}
		<Banner scheme="destructive" class="mt-4">{error}</Banner>
	{/each}
</div>
