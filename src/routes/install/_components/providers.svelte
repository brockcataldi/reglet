<script lang="ts">
	import { rawInstallTextFromLocalStorage } from '$lib/functions/utilities';

	import fonts from '$lib/stores/fonts.svelte';

	import Button from '$lib/components/button.svelte';

	let rawText = $state(rawInstallTextFromLocalStorage());

	function handleInstallClick() {
		fonts.install(rawText);
	}

	function handleDebugClick() {
		rawText = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Kablammo:MORF@0..60&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Roboto:ital,wdth,wght@0,75..100,100..900;1,75..100,100..900&display=swap" rel="stylesheet">

<link rel="stylesheet" id="typekit-css" href="https://use.typekit.net/kvs7ptj.css" type="text/css" media="all">`;

		fonts.install(rawText);
	}
</script>

<section class="mb-8">
	<h2 class="mb-2 text-3xl font-bold">
		Install <span class="text-gray-600">(optional)</span>
	</h2>
	<p class="mb-4 text-base">
		Paste your font URLs here, this supports raw URLs or exported link tags.
	</p>

	<label for="font-providers" class="mb-2 text-sm">Font Providers</label>
	<textarea
		id="font-providers"
		bind:value={rawText}
		class="mb-4 h-60 w-full resize-none rounded-md border border-solid border-black p-2 font-mono text-sm"
	></textarea>

	<menu class="flex gap-2">
		<Button
			width="fit"
			onclick={handleInstallClick}
			disabled={rawText.length === 0}>Install</Button
		>
		<Button width="fit" onclick={handleDebugClick}>Debug</Button>
	</menu>
</section>
