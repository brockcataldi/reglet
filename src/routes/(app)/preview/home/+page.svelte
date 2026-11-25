<script lang="ts">
	import { getPreview } from '../_components/context';
	import Part from '../_components/Part.svelte';

	const { text } = getPreview();

	const LINKS = ['Features', 'Pricing', 'Journal'];

	const FEATURES = [
		{
			title: 'Saves your place',
			body: 'Pick up any article on any device, right at the sentence you left.'
		},
		{
			title: 'Reads at your size',
			body: 'One setting scales every page you open, headings and all, in step.'
		},
		{
			title: 'Quiet by default',
			body: 'No feeds, no streaks, no badges. Just the pages you chose to keep.'
		}
	];

	// the demo's buttons and links only show type; they go nowhere
	const button =
		'inline-block border border-neutral-900 px-[1.25em] py-[0.6em]';
</script>

<svelte:head>
	<title>Home Preview - Reglet</title>
</svelte:head>

<h1 class="sr-only">Home Preview</h1>

<!-- a demo landing page for a made up reading app -->
<div>
	<Part role="label">
		<div
			class="flex flex-row items-center justify-between gap-4 border-b border-neutral-300 pb-4"
		>
			<p {...text('title', 'font-bold')}>Northlight</p>
			<ul class="hidden flex-row gap-6 @xl:flex">
				{#each LINKS as link (link)}
					<li {...text('label')}>{link}</li>
				{/each}
			</ul>
			<span {...text('label', button)}>Sign up</span>
		</div>
	</Part>

	<Part role="headline" class="mt-16">
		<h2 {...text('headline', 'max-w-[14em] text-balance')}>
			Read more. Scroll less.
		</h2>
	</Part>

	<Part role="deck" class="mt-[1em]">
		<p {...text('deck', 'max-w-[32em] text-neutral-700')}>
			Northlight turns the articles you save into a calm, well set library
			you can actually finish.
		</p>
	</Part>

	<Part role="label" first={false} class="mt-8">
		<div class="flex flex-row flex-wrap gap-3">
			<span {...text('label', `${button} bg-neutral-900 text-white`)}>
				Start reading free
			</span>
			<span {...text('label', button)}>See how it works</span>
		</div>
	</Part>

	<ul class="mt-16 grid gap-6 @2xl:grid-cols-3">
		{#each FEATURES as feature, index (feature.title)}
			<li class="border border-neutral-300 p-6">
				<Part role="title" first={index === 0}>
					<h3 {...text('title', 'text-balance')}>{feature.title}</h3>
				</Part>
				<Part role="body" first={index === 0} class="mt-2">
					<p {...text('body', 'text-neutral-700')}>{feature.body}</p>
				</Part>
			</li>
		{/each}
	</ul>

	<Part role="subhead" class="mt-20">
		<h3 {...text('subhead', 'text-balance')}>
			Readers finish what they start
		</h3>
	</Part>

	<Part role="quote" class="mt-6">
		<blockquote {...text('quote', 'max-w-[24em] text-balance')}>
			“I used to save articles to feel productive. Now I actually read
			them.”
		</blockquote>
	</Part>

	<Part role="caption" class="mt-4">
		<p {...text('caption', 'text-neutral-600')}>
			Sam, reading on Northlight since 2025
		</p>
	</Part>

	<Part
		role="caption"
		first={false}
		class="mt-20 border-t border-neutral-300 pt-6"
	>
		<p {...text('caption', 'text-neutral-600')}>
			Northlight is a made up app for this preview.
		</p>
	</Part>
</div>
