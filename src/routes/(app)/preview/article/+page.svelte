<script lang="ts">
	import { getPreview } from '../_components/context';
	import Part from '../_components/Part.svelte';

	const { text } = getPreview();
</script>

<svelte:head>
	<title>Article Preview - Reglet</title>
</svelte:head>

<h1 class="sr-only">Article Preview</h1>

<article>
	<Part role="headline">
		<h2 {...text('headline', 'text-balance')}>
			The quiet grid behind every page you love
		</h2>
	</Part>

	<Part role="deck" class="mt-[0.75em]">
		<p {...text('deck', 'text-neutral-700')}>
			A type scale isn't a list of sizes. It's a promise about how a page
			will feel at every width, kept one step at a time.
		</p>
	</Part>

	<Part role="caption" class="mt-6">
		<p {...text('caption', 'text-neutral-600')}>
			By the Reglet desk (November 2026, 6 minute read)
		</p>
	</Part>

	<Part role="caption" first={false} class="my-8">
		<figure>
			<div
				class="aspect-[16/7] w-full bg-[repeating-linear-gradient(135deg,var(--color-neutral-200)_0_12px,var(--color-neutral-100)_12px_24px)]"
			></div>
			<figcaption {...text('caption', 'mt-2 text-neutral-600')}>
				Ruled paper, the oldest grid most of us ever wrote on.
			</figcaption>
		</figure>
	</Part>

	<Part role="body">
		<p {...text('body')}>
			Open any well set magazine and measure it. The headline, the
			standfirst, the running text and the captions rarely land on
			arbitrary numbers. They step up and down from a shared base, each one
			a fixed ratio from its neighbour, so the page holds together even
			when nothing on it lines up by eye.
		</p>
		<p {...text('body', 'mt-[1em]')}>
			On the web that promise has to stretch. A headline that commands a
			desktop can swallow a phone, and body copy that reads comfortably at
			arm's length turns to dust on a wide monitor. Breakpoints and fluid
			sizes are how we keep the scale honest as the measure changes.
		</p>
	</Part>

	<Part role="subhead" class="mt-10">
		<h3 {...text('subhead', 'text-balance')}>
			Start from the body, not the headline
		</h3>
	</Part>

	<Part role="body" first={false} class="mt-4">
		<p {...text('body')}>
			Readers spend most of their time in running text, so that's where the
			scale should be tuned first. Pick a size and line height that read
			well at the narrowest width, then let every other role grow from it.
			The headline is simply the body, a few steps up.
		</p>
	</Part>

	<Part role="quote" class="my-10">
		<blockquote
			{...text(
				'quote',
				'border-l-4 border-neutral-900 pl-[0.75em] text-balance'
			)}
		>
			The headline is simply the body, a few steps up.
		</blockquote>
	</Part>

	<Part role="body" first={false}>
		<p {...text('body')}>
			When a size needs to change, change the step it sits on rather than
			the number. The relationship survives, and so does the page.
		</p>
	</Part>
</article>
