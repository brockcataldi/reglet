<script>
	import settings from '$lib/stores/settings.svelte';

	import TextArea from '$lib/ui/form/text-area.svelte';
	import Separator from '$lib/ui/display/separator.svelte';
	import Banner from '$lib/ui/display/banner.svelte';

	const placeholder = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?...`;
</script>

<svelte:head>
	<title>Stylesheets - Reglet</title>
</svelte:head>
<div class="w-full">
	<Separator as="label" for="stylesheets" description="Optional"
		>Stylesheets</Separator
	>

	<TextArea
		id="stylesheets"
		bind:value={settings.rawStylesheets}
		{placeholder}
	/>

	{#if settings.rawStylesheets.trim() !== ''}
		{#if settings.stylesheets.length > 0}
			<Banner variant="success" class="mt-4">
				Found {settings.stylesheets.length} stylesheets
			</Banner>
		{:else}
			<Banner variant="destructive" class="mt-4">
				Couldn't find any stylesheets
			</Banner>
		{/if}
	{/if}
</div>
