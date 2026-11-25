<script lang="ts">
	import project from '#lib/stores/project.svelte.js';

	import Banner from '#lib/ui/display/banner.svelte';
	import Separator from '#lib/ui/display/separator.svelte';
	import TextArea from '#lib/ui/form/text-area.svelte';

	const placeholder = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?...`;
</script>

<section class="w-full border-black bg-white py-8">
	<div class="mx-auto my-0 max-w-200">
		<h2 class="mb-4 text-6xl font-bold tracking-tighter text-black">
			Stylesheets
		</h2>

		<Separator
			as="label"
			for="settings-stylesheets"
			description="Optional"
		>
			Stylesheet URLs
		</Separator>
		<p class="mb-2 text-sm text-neutral-600">
			Paste the link tags or URLs that load your fonts; their families show
			up in every font picker.
		</p>
		<TextArea
			id="settings-stylesheets"
			bind:value={project.fonts.rawStylesheets}
			{placeholder}
		/>

		{#if project.fonts.rawStylesheets.trim() !== ''}
			{#if project.fonts.stylesheets.length > 0}
				<Banner scheme="success" class="mt-4">
					Found {project.fonts.stylesheets.length}
					{project.fonts.stylesheets.length === 1
						? 'stylesheet'
						: 'stylesheets'}
				</Banner>
			{:else}
				<Banner scheme="destructive" class="mt-4">
					Couldn't find any stylesheets
				</Banner>
			{/if}
		{/if}
	</div>
</section>
