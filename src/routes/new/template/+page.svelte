<script lang="ts">
	import { TAG_TEMPLATES } from '#lib/constants.js';
	import project from '#lib/stores/project.svelte.js';

	import Separator from '#lib/ui/display/separator.svelte';
	import RadioCard from '#lib/ui/form/radio-card.svelte';

	const draft = project.draft;
</script>

<svelte:head>
	<title>Tag Template - Reglet</title>
</svelte:head>

<div class="w-full">
	<Separator as="h2" description="Replaces your tag list"
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
