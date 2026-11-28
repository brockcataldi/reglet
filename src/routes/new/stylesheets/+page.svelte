<script lang="ts">
	import { CircleAlert } from '@lucide/svelte';

	import project from '#lib/stores/project.svelte.js';

	import Separator from '#lib/ui/display/separator.svelte';
	import TextArea from '#lib/ui/form/text-area.svelte';

	const fonts = project.fonts;

	const placeholder = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?...`;

	const pasted = $derived(fonts.rawStylesheets.trim() !== '');
</script>

<svelte:head>
	<title>Stylesheets - Reglet</title>
</svelte:head>

<div class="w-full">
	<Separator as="label" for="stylesheets" description="Optional"
		>Stylesheet URLs or embed code</Separator
	>
	<TextArea
		id="stylesheets"
		bind:value={fonts.rawStylesheets}
		{placeholder}
	/>

	<div class="mt-4" aria-live="polite">
		{#if pasted && fonts.stylesheets.length === 0}
			<p class="flex items-center gap-2 text-sm text-red-800">
				<CircleAlert class="size-4 shrink-0" />
				No stylesheet links or URLs found in that text.
			</p>
		{:else if fonts.available.length > 0}
			<ul class="grid grid-cols-2 gap-2">
				{#each fonts.available as family (family.family)}
					<li class="border border-black bg-white p-4">
						<p
							class="truncate text-4xl"
							style:font-family="'{family.family}'"
						>
							Aa Gg 123
						</p>
						<p class="mt-2 text-sm text-neutral-600">
							{family.family} ({family.styles.join(', ')})
						</p>
					</li>
				{/each}
			</ul>
		{:else if pasted}
			<p class="text-sm text-neutral-600">Loading families…</p>
		{:else}
			<p class="text-sm text-neutral-600">
				Paste a stylesheet to preview its fonts here, or skip this to use
				system fonts.
			</p>
		{/if}
	</div>
</div>
