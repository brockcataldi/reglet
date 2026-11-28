<script lang="ts">
	// templates are a starting point: append their tags or swap the list for them
	import { ListRestart, Plus } from '@lucide/svelte';

	import { TAG_TEMPLATES } from '#lib/constants.js';
	import project from '#lib/stores/project.svelte.js';

	import Button from '#lib/ui/button/button.svelte';
	import InlineField, {
		inlineControlClass
	} from '#lib/ui/form/inline-field.svelte';

	const draft = project.draft;
	const templates = TAG_TEMPLATES.filter((t) => t.tags.length > 0);

	let selected = $state(templates[0].id);
	let announcement = $state('');

	const template = $derived(templates.find((t) => t.id === selected));

	const append = () => {
		const added = draft.appendTemplate(selected);
		announcement =
			added === 0
				? `Every ${template?.name} tag is already in the list.`
				: `Appended ${added} ${added === 1 ? 'tag' : 'tags'} from ${template?.name}.`;
	};

	const replace = () => {
		draft.loadTemplate(selected);
		announcement = `Replaced the list with ${template?.name} (${draft.tags.length} tags).`;
	};
</script>

<div class="flex flex-wrap items-end gap-2">
	<InlineField
		for="tag-template"
		label="Template"
		labelClass="w-auto"
		class="min-w-60 flex-1"
	>
		<select
			id="tag-template"
			class={inlineControlClass}
			aria-describedby="tag-template-description"
			bind:value={selected}
		>
			{#each templates as t (t.id)}
				<option value={t.id}>{t.name}</option>
			{/each}
		</select>
	</InlineField>
	<Button label="Append tags" icon={Plus} onclick={append} />
	<Button label="Replace list" icon={ListRestart} onclick={replace} />
</div>
<p id="tag-template-description" class="mt-2 text-sm text-neutral-600">
	{template?.description} Templates are only a starting point; edit, add or remove
	anything after.
</p>
<p class="mt-1 text-sm" aria-live="polite">{announcement}</p>
