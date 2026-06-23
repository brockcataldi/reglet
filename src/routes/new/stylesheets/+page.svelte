<script>
	import TextArea from '$lib/ui/form/TextArea.svelte';

	import projectSettings from '$lib/stores/project-settings.svelte';

	const placeholder = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?...`;
</script>

<svelte:head>
	<title>Stylesheets // Reglet</title>
</svelte:head>
<div class="w-full">
	<h2 class="font-mono text-sm text-neutral-600 uppercase">
		<label for="stylesheets">
			Stylesheets
			<span class="text-cobalt-500">(optional)</span>
		</label>
	</h2>
	<hr class="my-2 text-neutral-600" />
	<TextArea
		id="stylesheets"
		bind:value={projectSettings.rawStylesheets}
		{placeholder}
	/>
</div>
