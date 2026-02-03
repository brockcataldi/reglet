<script lang="ts">
	import { resolve } from '$app/paths';

	import styles from '$lib/stores/styles.svelte';

	import LinkButton from '$lib/components/link-button.svelte';
	import TextStyle from './_components/text-style.svelte';
</script>

<main class="mx-auto max-w-2xl pt-16">
	<header>
		<h1 class="mb-2 text-5xl font-bold">Step #2</h1>
		<p class="text-base">
			Reglet requires to you have a "host" style, which the font you plan on to
			use the most, typically the body text style. All other fonts will be
			considered "guest" styles.
		</p>
	</header>

	<hr class="my-8" />

	<section>
		<header>
			<h2 class="mb-2 text-3xl font-bold">Host Style</h2>
		</header>
		<TextStyle id="host" bind:style={styles.host} />
	</section>

	<hr class="my-8" />

	<footer class="mb-8 flex justify-between">
		<LinkButton href={resolve('/step-1')}>Back to Step #1</LinkButton>
		<LinkButton href={resolve('/')}>On to Step #3</LinkButton>
	</footer>
</main>
