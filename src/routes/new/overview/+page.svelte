<script lang="ts">
	import { TAG_TEMPLATES } from '#lib/constants.js';
	import project from '#lib/stores/project.svelte.js';

	import Banner from '#lib/ui/display/banner.svelte';
	import Separator from '#lib/ui/display/separator.svelte';

	const draft = project.draft;

	const typeNames = {
		standard: 'Breakpoints',
		fluid: 'Fluid',
		static: 'No breakpoints'
	};

	const template = $derived(
		TAG_TEMPLATES.find((t) => t.id === draft.template)?.name ?? 'Custom'
	);

	const tagNames = $derived(
		draft.tags.map((tag) => tag.name.trim()).filter((name) => name !== '')
	);
</script>

<svelte:head>
	<title>Overview - Reglet</title>
</svelte:head>

<div class="w-full">
	<Separator as="h2">Overview</Separator>

	<dl class="grid grid-cols-[max-content_1fr] gap-x-8 gap-y-3 text-sm">
		<dt class="text-neutral-600 uppercase">Project type</dt>
		<dd>{typeNames[draft.type]}</dd>

		{#if draft.type !== 'static'}
			<dt class="text-neutral-600 uppercase">Breakpoints</dt>
			<dd>
				<ul>
					{#each draft.breakpoints as breakpoint (breakpoint.id)}
						<li>{breakpoint.name || '(unnamed)'}: {breakpoint.width}px</li>
					{/each}
				</ul>
			</dd>
		{/if}

		<dt class="text-neutral-600 uppercase">Font size unit</dt>
		<dd>{project.fontSizeUnit}</dd>

		<dt class="text-neutral-600 uppercase">Letter spacing unit</dt>
		<dd>{project.letterSpacingUnit}</dd>

		<dt class="text-neutral-600 uppercase">Tags</dt>
		<dd>
			{template}, {draft.tags.length}
			{draft.tags.length === 1 ? 'tag' : 'tags'}
			{#if tagNames.length > 0}
				<p class="text-neutral-600">{tagNames.join(', ')}</p>
			{/if}
		</dd>

		<dt class="text-neutral-600 uppercase">Stylesheets</dt>
		<dd>{project.fonts.stylesheets.length}</dd>
	</dl>

	{#each draft.errors as error (error)}
		<Banner scheme="destructive" class="mt-4">{error}</Banner>
	{/each}

	<Banner class="mt-4">
		Creating replaces your current project. The project type can't be
		changed afterwards.
	</Banner>
</div>
