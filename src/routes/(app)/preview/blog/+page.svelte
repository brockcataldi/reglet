<script lang="ts">
	import { getPreview } from '../_components/context';
	import Part from '../_components/Part.svelte';

	const { text } = getPreview();

	const TOPICS = ['Typography', 'CSS', 'Design systems'];
</script>

<svelte:head>
	<title>Blog Preview - Reglet</title>
</svelte:head>

<h1 class="sr-only">Blog Preview</h1>

<!-- a personal blog: one narrow column, centred on the page -->
<article class="mx-auto max-w-[42rem]">
	<Part role="headline">
		<h2 {...text('headline', 'text-balance')}>
			Why I stopped picking font sizes
		</h2>
	</Part>

	<Part role="caption" class="mt-4">
		<p {...text('caption', 'text-neutral-600')}>
			Posted 25 November 2026 (4 minute read)
		</p>
	</Part>

	<Part role="body" class="mt-8">
		<p {...text('body')}>
			For years every new project started the same way. I'd open a blank
			stylesheet and type out sizes I half remembered from the last one:
			14, 16, 18, 24, 32, and a big one for the hero. They always looked
			fine on my laptop, and they always fell apart somewhere else.
		</p>
		<p {...text('body', 'mt-[1em]')}>
			The fix wasn't better numbers. It was fewer decisions.
		</p>
	</Part>

	<Part role="subhead" class="mt-10">
		<h3 {...text('subhead', 'text-balance')}>Steps, not sizes</h3>
	</Part>

	<Part role="body" first={false} class="mt-4">
		<p {...text('body')}>
			A modular scale gives you one base size and one ratio. Every other
			size is the base, stepped up or down. Instead of asking "how big
			should this heading be?" you ask "how many steps above the body is
			it?", which is a much easier question to answer twice in a row.
		</p>
	</Part>

	<Part role="title" class="mt-8">
		<h4 {...text('title')}>What changed for me</h4>
	</Part>

	<Part role="body" first={false} class="mt-3">
		<ul {...text('body', 'list-disc pl-[1.25em]')}>
			<li>Headings stopped drifting between pages.</li>
			<li class="mt-[0.5em]">
				Breakpoints became a matter of moving a tag up a step.
			</li>
			<li class="mt-[0.5em]">
				Reviews got shorter, because nobody argues with a ratio.
			</li>
		</ul>
	</Part>

	<Part role="quote" class="my-10">
		<blockquote {...text('quote', 'text-balance italic')}>
			“Nobody argues with a ratio” has become my favourite line in design
			reviews.
		</blockquote>
	</Part>

	<Part role="body" first={false}>
		<p {...text('body')}>
			If you try it, start small: name the roles your pages use, place each
			one on a step, and only then worry about how it should change on a
			phone.
		</p>
	</Part>

	<Part role="label" class="mt-10 border-t border-neutral-300 pt-6">
		<ul class="flex flex-row flex-wrap gap-2" aria-label="Topics">
			{#each TOPICS as topic (topic)}
				<li
					{...text(
						'label',
						'border border-neutral-400 px-[0.75em] py-[0.25em]'
					)}
				>
					{topic}
				</li>
			{/each}
		</ul>
	</Part>
</article>
