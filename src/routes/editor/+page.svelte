<script lang="ts">
	import settings from '$lib/stores/settings.svelte';

	import Lanes from './_components/Lanes.svelte';
	import Standard from './_components/Standard.svelte';
</script>

<svelte:head>
	<title>Project - Reglet</title>
</svelte:head>
<main>
	<header class="bg-sunburst-500 py-4">
		<div class="mx-auto my-0 max-w-200">
			<h1 class="mb-4 text-7xl font-bold tracking-tighter text-black">
				Project
			</h1>
		</div>
	</header>

	{#if settings.type === 'standard'}
		<Standard />
	{:else}
		<h1>Fluid Project</h1>
	{/if}

	<Lanes />
</main>
