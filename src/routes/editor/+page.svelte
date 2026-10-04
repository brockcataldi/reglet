<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';


	import project from '#lib/stores/project.svelte.js';
	import Button from '#lib/ui/button/button.svelte';

	import BreakpointsStandard from './_page-components/BreakpointsStandard.svelte';
	import Lanes from './_page-components/Lanes.svelte';

	const handleDeleteClick = () => {
		project.create();
		localStorage.clear();
		goto(resolve("/"));
	}
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

{#if project.type === 'fluid'}
	<h1>Fluid Project</h1>
{:else if project.type === 'standard'}
	<BreakpointsStandard />
{:else}
	<h1>Static Project</h1>
{/if}

<section class="w-full border-black bg-white py-8">
	<div class="mx-auto my-0 max-w-200">
		<header class="flex flex-row items-center justify-between">
			<h2 class="mb-4 text-6xl font-bold tracking-tighter">
				Settings
			</h2>
		</header>

		<article class="flex flex-row items-center justify-between">
			<h3 class="text-4xl">Clear Project</h3>
			<Button variant="destructive" label="Start Over" onclick={handleDeleteClick} />
		</article>
	</div>
</section>
