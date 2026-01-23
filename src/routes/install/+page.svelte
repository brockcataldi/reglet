<script lang="ts">
	import { extractFontFaces } from '$lib/functions/font';
	import { extractStylesheetUrls } from '$lib/functions/stylesheet';
	import type { Family } from '$lib/types';

	import Button from '$lib/components/button.svelte';
	import FontFamily from './_components/font-family.svelte';

	let rawInstallText = $state('');
	let stylesheetUrls = $derived(extractStylesheetUrls(rawInstallText));
	let families = $state<Family[]>([]);

	async function handleInstallClick() {
		const stylesheetFontFaces = await Promise.all(
			stylesheetUrls.map((url) => extractFontFaces(url.url))
		);

		const fontFaces = stylesheetFontFaces.reduce((acc, curr: Family[]) => {
			acc.push(...curr);
			return acc;
		}, [] as Family[]);

		families = fontFaces;
	}

	function handleDebugClick() {
		rawInstallText = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Kablammo:MORF@0..60&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Roboto:ital,wdth,wght@0,75..100,100..900;1,75..100,100..900&display=swap" rel="stylesheet">

<link rel="stylesheet" id="typekit-css" href="https://use.typekit.net/kvs7ptj.css" type="text/css" media="all">
		`;

		handleInstallClick();
	}
</script>

<svelte:head>
	{#each stylesheetUrls as url (url.hash)}
		<link rel="stylesheet" href={url.url} id={url.hash} />
	{/each}
</svelte:head>
<main>
	<header>
		<h1>Install</h1>
		<p>
			This system requires measuring the fonts you plan to use. So to start
			you'll need to install them.
		</p>
	</header>

	<section>
		<h2>Add your fonts</h2>
		<p>
			Paste your font URLs here, this supports raw URLs or exported link tags.
		</p>
		<textarea bind:value={rawInstallText}></textarea>

		<Button onclick={handleInstallClick}>Install</Button>
		<Button onclick={handleDebugClick}>Debug</Button>
	</section>

	<section>
		<h2>Double Check the Install</h2>
		<p>Make sure the fonts are installed correctly.</p>
		<div>
			{#each families as _, index (index)}
				<FontFamily bind:family={families[index]} familyIndex={index} />
			{/each}
		</div>
	</section>
</main>

<style>
	main {
		max-width: 750px;
		width: 100%;
		margin: 0 auto;
		padding: 1rem;
		box-sizing: border-box;
	}

	header {
		padding: 2rem 0;
		width: 100%;
		box-sizing: border-box;
	}

	h1 {
		font-family: var(--ff-ss);
		font-size: 3rem;
		margin: 0;
	}

	h2 {
		font-family: var(--ff-ss);
		font-size: 2rem;
		margin: 0;
	}

	p {
		font-family: var(--ff-ss);
		font-size: 1rem;
		margin: 0;
	}

	textarea {
		font-family: var(--ff-m);
		font-size: 0.875rem;
		margin: 0;
		width: 100%;
		height: 200px;
		padding: 1rem;
		box-sizing: border-box;
		border: 1px solid #aaaaaa;
		border-radius: 0.25rem;
		resize: none;
	}
</style>
