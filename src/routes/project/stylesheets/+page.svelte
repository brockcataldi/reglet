<script lang="ts">
	import { getStylesheetsFromLocalStorage } from '$lib/types';

	import fonts from '$lib/stores/fonts.svelte';

	import install from '$lib/functions/install';

	import Button from '$lib/components/button.svelte';
	import stylesheets from '$lib/stores/stylesheets.svelte';

	let value = $state<string>(getStylesheetsFromLocalStorage());

	const onchange = (event: Event) => {
		const target = event.target as HTMLTextAreaElement;

		value = target.value;
	};

	const onclick = () => {
		install(value);
	};
</script>

<main class="mx-auto my-0 max-w-2xl">
	<header class="mb-4 pt-8">
		<h1 class="mb-2 text-5xl font-bold">Stylesheets</h1>
		<p>
			To ensure accurate text spacing, you need to measure the specific fonts
			you plan to use. You can provide the font styles by pasting stylesheet
			URLs (one per line) or by including raw embedded styles, as long as they
			are wrapped in a <code>&lt;link rel="stylesheet"&gt;</code> tag.
		</p>
	</header>

	<label for="raw">Stylesheet URLs</label>
	<textarea
		class="mb-4 h-48 w-full resize-none rounded-md px-4 py-2 font-mono text-base"
		id="raw"
		{value}
		{onchange}
	></textarea>

	{#if stylesheets.stylesheets.length > 0 && fonts.families.length > 0}
		<p
			class="mb-4 rounded-md border border-yellow-900 bg-yellow-100 p-2 text-yellow-900"
		>
			Keep in mind, since you've already installed fonts, you'll be overwriting
			what you previously worked on.
			<strong>
				You have {fonts.families.length} font{fonts.families.length === 1
					? ''
					: 's'} installed from {stylesheets.stylesheets.length} stylesheet{stylesheets
					.stylesheets.length === 1
					? ''
					: 's'}.
			</strong>
		</p>
	{/if}

	<div>
		<Button {onclick}>Install</Button>
	</div>
</main>
