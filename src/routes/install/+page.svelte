<script lang="ts">
	import { extractFontFaces, type FontFamilies } from '$lib/font/font-face';
	import {
		isFontFaceAxis,
		isFontFaceValue
	} from '$lib/font/font-face-properties';
	import { extractStylesheetUrls } from '$lib/font/stylesheet';
	import FontFaceProperty from './_compontents/font-face-property.svelte';

	let rawInstallText = $state('');
	let stylesheetUrls = $derived(extractStylesheetUrls(rawInstallText));
	let fontFamilies = $state<FontFamilies>({});

	async function handleInstallClick() {
		const stylesheetFontFaces = await Promise.all(
			stylesheetUrls.map((url) => extractFontFaces(url.url))
		);

		const fontFaces = stylesheetFontFaces.reduce((acc, curr: FontFamilies) => {
			for (const [fontFamily, fontStyles] of Object.entries(curr)) {
				if (!acc[fontFamily]) {
					acc[fontFamily] = fontStyles;
				}
			}
			return acc;
		}, {} as FontFamilies);

		fontFamilies = fontFaces;
	}

	function handleDebugClick() {
		rawInstallText = `
		<link rel="preconnect" href="https://fonts.googleapis.com">
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
	<h1>Install</h1>
	<h2>Add your fonts</h2>
	<p>Paste your font URLs here. Google Fonts and TypeKit are supported.</p>
	<textarea bind:value={rawInstallText}></textarea>
	<button onclick={handleInstallClick}>Install</button>
	<button onclick={handleDebugClick}>Debug</button>
	<h2>Double Check the Install</h2>
	<p>Make sure the fonts are installed correctly.</p>

	<ul>
		{#each Object.entries(fontFamilies) as [fontFamily, fontStyles] (fontFamily)}
			<li>
				<h3>{fontFamily}</h3>
				<ul>
					{#each Object.entries(fontStyles).reverse() as [fontStyle, fontFaces] (`${fontFamily}-${fontStyle}`)}
						{#each fontFaces as fontFace}
							<li>
								<h4>Font Weight</h4>
								<FontFaceProperty
									property={fontFace.fontWeight}
									options={['normal', 'bold']}
								/>
								<h4>Font Stretch</h4>
								<FontFaceProperty
									property={fontFace.fontStretch}
									options={[
										'normal',
										'ultra-condensed',
										'extra-condensed',
										'condensed',
										'semi-condensed',
										'semi-expanded',
										'expanded',
										'extra-expanded',
										'ultra-expanded'
									]}
								/>
							</li>
						{/each}
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
</main>

<style>
	main {
		max-width: 750px;
		width: 100%;
		margin: 0 auto;
		padding: 4rem 1rem;
	}

	h1 {
		font-family: var(--font-family);
		font-size: 3rem;
	}

	h2 {
		font-family: var(--font-family);
		font-size: 2rem;
	}

	h3 {
		font-family: var(--font-family);
		font-size: 1.5rem;
	}

	h4 {
		font-family: var(--font-family);
		font-size: 1.25rem;
	}

	h5 {
		font-family: var(--font-family);
		font-size: 1rem;
	}

	p {
		font-family: var(--font-family);
		font-size: 1rem;
	}

	textarea {
		font-family: var(--font-family);
		font-size: 1rem;
		margin: 0;
		width: 100%;
		height: 200px;
	}

	ul {
		margin: 0;
		padding: 0;
		list-style-type: none;
	}
</style>
