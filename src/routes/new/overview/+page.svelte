<script lang="ts">
	import { resolve } from '$app/paths';
	import type { ResolvedPathname } from '$app/types';
	import project from '#lib/stores/project.svelte.js';
	import { CircleAlert } from '@lucide/svelte';

	import Banner from '#lib/ui/display/banner.svelte';

	const draft = project.draft;

	const typeWords = {
		standard: 'responsive',
		fluid: 'fluid',
		static: 'single-size'
	};

	const plural = (count: number, word: string) =>
		`${count} ${word}${count === 1 ? '' : 's'}`;

	// fluid projects read as a range, the rest as a count
	const breakpoints = $derived.by(() => {
		const list = draft.breakpoints;

		if (draft.type === 'fluid') {
			return {
				lead: 'from',
				text: `${list[0]?.width ?? 0}px to ${list.at(-1)?.width ?? 0}px`
			};
		}

		return { lead: 'with', text: plural(list.length, 'breakpoint') };
	});
</script>

<svelte:head>
	<title>Overview - Reglet</title>
</svelte:head>

{#snippet step(href: ResolvedPathname, text: string)}
	<a
		{href}
		class="font-mono underline decoration-1 underline-offset-4
		hover:bg-cobalt-500 hover:text-white hover:no-underline
		focus-visible:bg-cobalt-500 focus-visible:text-white"
	>
		{text}
	</a>
{/snippet}

<div class="w-full">
	<p
		class="text-3xl leading-snug font-semibold tracking-tight text-balance"
	>
		A
		{@render step(resolve('/new/type'), typeWords[draft.type])}
		project{#if draft.type !== 'static'}{` ${breakpoints.lead}`}
			{@render step(resolve('/new/breakpoints'), breakpoints.text)}{/if},
		sized in
		{@render step(resolve('/new/units'), draft.fontSizeUnit)}
		with letter spacing in
		{@render step(resolve('/new/units'), draft.letterSpacingUnit)}. It
		starts with
		{@render step(resolve('/new/tags'), plural(draft.tags.length, 'tag'))}
		and
		{@render step(
			resolve('/new/stylesheets'),
			plural(project.fonts.stylesheets.length, 'stylesheet')
		)}.
	</p>

	{#each draft.errors as error (error)}
		<p class="mt-2 flex items-center gap-2 text-sm text-red-800">
			<CircleAlert class="size-4 shrink-0" />
			{error}
		</p>
	{/each}

	{#if project.exists}
		<Banner scheme="destructive" class="mt-6">
			Creating replaces your current project.
		</Banner>
	{/if}
</div>
