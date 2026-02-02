<script lang="ts">
	import { resolve } from '$app/paths';

	import fonts from '$lib/stores/fonts.svelte';

	import LinkButton from '$lib/components/link-button.svelte';
	import Dialog from '$lib/components/dialog.svelte';
	import Button from '$lib/components/button.svelte';

	import Providers from './_components/providers.svelte';
	import FontFamily from './_components/font-family.svelte';

	let open = $state(false);

	const handleAddFamily = () => {
		fonts.createFamily({
			id: crypto.randomUUID(),
			family: 'New Font',
			faces: [
				{
					weight: 400,
					style: 'normal',
					stretch: 'normal',
					opticalSize: 'auto',
					variationSettings: []
				}
			]
		});
	};

	function handleClearFamilies() {
		fonts.clearFamilies();
	}

	function handleStylesheets() {
		open = true;
	}
</script>

<main class="mx-auto max-w-2xl pt-16">
	<header>
		<h1 class="mb-2 text-5xl font-bold">Step #1</h1>
		<p class="text-base">
			This system requires measuring the fonts you plan to use. So to start
			you'll need to install them, or in the case of System fonts configure the
			available settings.
		</p>
	</header>
	<hr class="my-8" />

	<Dialog bind:open>
		<Providers />
	</Dialog>

	<section class="mb-8">
		<header class="mb-4 flex flex-col items-start justify-start gap-2">
			<div>
				<h2 class="mb-2 text-3xl font-bold">Fonts</h2>
				<p class="mb-4 text-base">
					The following fonts have been recognized by Reglet. You need at least
					one font to continue.
				</p>
			</div>
			<div class="align-center flex w-full justify-between gap-2">
				<div class="flex gap-2">
					<Button width="fit" onclick={handleStylesheets}
						>Install Stylesheets</Button
					>
					<Button width="fit" onclick={handleAddFamily}>Add Font</Button>
				</div>

				<Button
					width="fit"
					disabled={fonts.families.length === 0}
					color="error"
					onclick={handleClearFamilies}>Clear Fonts</Button
				>
			</div>
		</header>
		<ul class="mb-4">
			{#each fonts.families as family, index (family.id)}
				<li class="mb-2">
					<FontFamily bind:family={fonts.families[index]} familyIndex={index} />
				</li>
			{/each}
		</ul>
	</section>

	<hr class="my-8" />

	{#if fonts.families.length > 0}
		<footer class="mb-8 flex justify-end">
			<LinkButton href={resolve('/step-2')}>On to Step #2</LinkButton>
		</footer>
	{/if}
</main>
