<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import FontFamily from './_components/font-family.svelte';

	import fonts from '$lib/fonts.svelte';

	function handleDebugClick() {
		fonts.rawText = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Kablammo:MORF@0..60&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Roboto:ital,wdth,wght@0,75..100,100..900;1,75..100,100..900&display=swap" rel="stylesheet">

<link rel="stylesheet" id="typekit-css" href="https://use.typekit.net/kvs7ptj.css" type="text/css" media="all">`;

		fonts.install();
	}
</script>

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

		<label for="font-providers">Font Providers</label>
		<textarea id="font-providers" bind:value={fonts.rawText}></textarea>

		<Button onclick={fonts.install}>Install</Button>
		<Button onclick={handleDebugClick}>Debug</Button>
	</section>

	<section>
		<h2>Fonts</h2>
		
		{#if fonts.families.length > 0}
			<ul>
				{#each fonts.families as _, index (index)}
					<li>
						<FontFamily
							bind:family={fonts.families[index]}
							familyIndex={index}
						/>
					</li>
				{/each}
			</ul>
		{/if}
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

	section {
		padding: 2rem 0;
		width: 100%;
	}

	h1 {
		font-family: var(--ff-ss);
		font-size: 3rem;
		margin: 0;
	}

	h2 {
		font-family: var(--ff-ss);
		font-size: 2rem;
		margin: 0 0 0.5rem;
	}

	p {
		font-family: var(--ff-ss);
		font-size: 1rem;
		margin: 0 0 1rem;
	}

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
		height: 195px;
		padding: 0.75rem;
		box-sizing: border-box;
		border: 1px solid black;
		border-radius: 0.25rem;
		resize: none;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
