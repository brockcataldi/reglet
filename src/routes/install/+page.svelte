<script lang="ts">
	import { resolve } from '$app/paths';

	import LinkButton from '$lib/components/link-button.svelte';

	import Providers from './_components/providers.svelte';
	import Installed from './_components/installed.svelte';
</script>

<main class="mx-auto max-w-xl pt-16">
	<header>
		<h1 class="mb-2 text-5xl font-bold">Step #1</h1>
		<p class="text-base">
			This system requires measuring the fonts you plan to use. So to start
			you'll need to install them, or in the case of System fonts configure the
			available settings.
		</p>
	</header>
	<hr class="my-8" />
	<section>
		<Providers />
		<Installed />
	</section>

	<footer>
		<LinkButton href={resolve('/define')}>Next</LinkButton>
	</footer>
</main>
