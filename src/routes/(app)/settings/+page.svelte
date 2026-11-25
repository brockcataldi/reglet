<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	import project from '#lib/stores/project.svelte.js';
	import { RotateCcw } from '@lucide/svelte';

	import Button from '#lib/ui/button/button.svelte';

	import Breakpoints from './_components/Breakpoints.svelte';
	import Lanes from './_components/Lanes.svelte';
	import Stylesheets from './_components/Stylesheets.svelte';
	import Tags from './_components/Tags.svelte';
	import Units from './_components/Units.svelte';

	const handleDeleteClick = () => {
		project.create();
		localStorage.clear();
		goto(resolve('/'));
	};
</script>

<svelte:head>
	<title>Project - Reglet</title>
</svelte:head>

<header class="bg-sunburst-500 py-4">
	<div class="mx-auto my-0 max-w-200">
		<h1 class="mb-4 text-8xl font-bold tracking-tighter text-black">
			Settings
		</h1>
	</div>
</header>

{#if project.type !== 'static'}
	<Breakpoints />
{/if}

<Lanes />

<Tags />

<Units />

<Stylesheets />

<section class="w-full border-black bg-white py-8">
	<div class="mx-auto my-0 max-w-200">
		<header class="flex flex-row items-center justify-between">
			<h2 class="mb-4 text-6xl font-bold tracking-tighter">Settings</h2>
		</header>

		<article class="flex flex-row items-center justify-between">
			<h3 class="text-4xl font-bold text-red-800">Clear Project</h3>
			<Button
				scheme="destructive"
				label="Start Over"
				icon={RotateCcw}
				onclick={handleDeleteClick}
			/>
		</article>
	</div>
</section>
