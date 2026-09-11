<script lang="ts">
	import settings from '$lib/stores/settings.svelte';

	import BreakpointsStandard from './_page-components/BreakpointsStandard.svelte';
	import Lanes from './_page-components/Lanes.svelte';
</script>

<svelte:head>
	<title>Project - Reglet</title>
</svelte:head>
<main>
	<header class="bg-sunburst-500 py-4">
		<div class="mx-auto my-0 max-w-200">
			<h1 class="mb-4 text-8xl font-bold tracking-tighter text-black">
				Project
			</h1>
		</div>
	</header>

	<Lanes />

	{#if settings.type === 'standard'}
		<BreakpointsStandard />
	{:else}
		<h1>Fluid Project</h1>
	{/if}
</main>
