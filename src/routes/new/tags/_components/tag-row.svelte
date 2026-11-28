<script lang="ts">
	// one tag in the list: name and starting step side by side, each labelled
	import { Trash } from '@lucide/svelte';

	import { isTagNameTaken } from '#lib/domain/tags/normalize-tag-name.js';
	import { TAG_SEPARATOR } from '#lib/domain/tags/parse-tag-query.js';
	import type { TagDraft } from '#lib/stores/draft-repository.svelte.js';
	import project from '#lib/stores/project.svelte.js';

	import Button from '#lib/ui/button/button.svelte';
	import InlineField, {
		inlineControlClass
	} from '#lib/ui/form/inline-field.svelte';

	let { tag }: { tag: TagDraft } = $props();

	const draft = project.draft;

	const invalid = $derived(
		tag.name.trim() === '' ||
			tag.name.includes(TAG_SEPARATOR) ||
			isTagNameTaken(draft.tags, tag.name, tag.id)
	);

	// the step's size on the default lane (1rem base, 1.2 ratio)
	const size = $derived.by(() => {
		if (tag.step === null) return null;

		const px = 16 * 1.2 ** tag.step;
		const round = (n: number) => Math.round(n * 100) / 100;

		switch (draft.fontSizeUnit) {
			case 'px':
				return `${Math.round(px)}px`;
			case 'pt':
				return `${round(px * 0.75)}pt`;
			default:
				return `${round(px / 16)}${draft.fontSizeUnit}`;
		}
	});

	const nameId = $derived(`tag-${tag.id}-name`);
	const stepId = $derived(`tag-${tag.id}-step`);
</script>

<li class="flex items-end gap-2">
	<InlineField
		for={nameId}
		label="Name"
		labelClass="w-auto"
		variant={invalid ? 'error' : 'default'}
		class="min-w-0 flex-1"
	>
		<input
			id={nameId}
			class={inlineControlClass}
			placeholder="ex. h1"
			aria-invalid={invalid}
			bind:value={tag.name}
		/>
	</InlineField>

	<InlineField
		for={stepId}
		label="Step"
		labelClass="w-auto"
		class="w-44 shrink-0"
	>
		<input
			id={stepId}
			type="number"
			step="1"
			placeholder="none"
			class="{inlineControlClass} w-12 flex-none px-0 text-center"
			aria-describedby={size ? `${stepId}-size` : undefined}
			bind:value={
				() => tag.step ?? '',
				(value) =>
					(tag.step =
						value === '' || value === null || value === undefined
							? null
							: Math.round(Number(value)))
			}
		/>
		<span
			id={`${stepId}-size`}
			class="ml-auto pr-2 font-sans text-xs text-neutral-600"
		>
			{size ?? ''}
		</span>
	</InlineField>

	<Button
		iconOnly
		label="Remove {tag.name || 'tag'}"
		icon={Trash}
		scheme="destructive"
		onclick={() => draft.removeTag(tag.id)}
	/>
</li>
