<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import Text from '$lib/components/text.svelte';

	import fonts from '$lib/stores/fonts.svelte';

	function handleDebugClick() {
		fonts.rawText = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Kablammo:MORF@0..60&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Roboto:ital,wdth,wght@0,75..100,100..900;1,75..100,100..900&display=swap" rel="stylesheet">

<link rel="stylesheet" id="typekit-css" href="https://use.typekit.net/kvs7ptj.css" type="text/css" media="all">`;

		fonts.install();
	}
</script>

<section>
	<Text tag="h2">Install (optional)</Text>
	<Text tag="p">
		Paste your font URLs here, this supports raw URLs or exported link tags.
	</Text>

	<label for="font-providers">Font Providers</label>
	<textarea id="font-providers" bind:value={fonts.rawText}></textarea>

	<Button onclick={fonts.install} disabled={fonts.rawText.length === 0}
		>Install</Button
	>
	<Button onclick={handleDebugClick}>Debug</Button>
</section>

<style>
	label {
		font-family: var(--ff-ss);
		font-size: 0.875rem;
		margin: 0 0 0.5rem;
	}

	textarea {
		font-family: var(--ff-m);
		font-size: 0.875rem;
		margin: 0 0 1rem;
		width: 100%;
		height: 210px;
		padding: 0.75rem;
		box-sizing: border-box;
		border: 1px solid var(--c-bla);
		border-radius: 0.25rem;
		resize: none;
	}
</style>
