<script lang="ts">
	import { Import, Plus, Trash } from '@lucide/svelte';

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

	// only a way to fill the list; nothing changes until it's loaded
	let selected = $state(TAG_TEMPLATES[0].id);

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

<div class="mb-8 w-full">
	<Separator as="label" for="tag-template">Load Template</Separator>
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
	{#if draft.tags.length === 0}
		<p class="text-sm text-neutral-600">
			No tags yet. You can add them now or later in the editor.
		</p>
	{/if}

	<ul class="flex flex-col gap-4">
		{#each draft.tags as tag (tag.id)}
			{@const invalid =
				tag.name.trim() === '' ||
				tag.name.includes('/') ||
				isTagNameTaken(draft.tags, tag.name, tag.id)}
			<li
				class="grid grid-cols-[1fr_8rem_auto] items-end gap-4 border border-black bg-white p-4"
			>
				<div>
					<Separator as="label" for={`tag-${tag.id}-name`}>Name</Separator>
					<Input
						id={`tag-${tag.id}-name`}
						placeholder="ex. h1"
						variant={invalid ? 'error' : 'default'}
						aria-invalid={invalid}
						bind:value={tag.name}
					/>
				</div>
				<div>
					<Separator as="label" for={`tag-${tag.id}-step`}>Step</Separator>
					<Input
						id={`tag-${tag.id}-step`}
						type="number"
						step="1"
						placeholder="Unplaced"
						bind:value={
							() => tag.step ?? '',
							(value) =>
								(tag.step =
									value === '' || value === null || value === undefined
										? null
										: Math.round(Number(value)))
						}
					/>
				</div>
				<Button
					label="Remove"
					aria-label={`Remove ${tag.name || 'tag'}`}
					icon={Trash}
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
