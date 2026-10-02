<script lang="ts">
	import project from '$lib/stores/project.svelte';

	import BreakpointsStandard from './_page-components/BreakpointsStandard.svelte';
	import Lanes from './_page-components/Lanes.svelte';
</script>

<svelte:head>
	<title>Project - Reglet</title>
</svelte:head>

<header class="bg-sunburst-500 py-4">
	<div class="mx-auto my-0 max-w-200">
		<h1 class="mb-4 text-8xl font-bold tracking-tighter text-black">
			Project
		</h1>
	</div>
</header>

<Lanes />

{#if project.type === 'standard'}
	<BreakpointsStandard />
{:else}
	<h1>Fluid Project</h1>
{/if}
