<script lang="ts">
	import Text from '$lib/components/text.svelte';
	import Providers from './_components/providers.svelte';
	import Installed from './_components/installed.svelte';
</script>

<main>
	<header>
		<Text tag="h1">Step #1</Text>
		<Text tag="p">
			This system requires measuring the fonts you plan to use. So to start
			you'll need to install them, or in the case of System fonts configure the
			available settings.
		</Text>
	</header>

	<div>
		<Providers />
		<Installed />
	</div>
</main>

<style>
	main {
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

	div {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		width: 100%;
		box-sizing: border-box;
		align-items: flex-start;
		justify-content: flex-start;
	}
</style>
