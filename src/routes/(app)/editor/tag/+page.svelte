<script lang="ts">
	import { resolve } from '$app/paths';

	import project from '#lib/stores/project.svelte.js';

	import PlacementCell from './_components/PlacementCell.svelte';

	let announcement = $state('');

	// fluid and static projects only place tags on the root
	const columns = $derived(
		project.type === 'standard'
			? project.breakpoints.breakpoints
			: project.breakpoints.breakpoints.slice(0, 1)
	);

	const named = $derived(columns.length > 1);

	// the first column fits the longest tag name; rows share it via subgrid
	const columnsCSS = $derived(
		`max-content repeat(${columns.length}, 420px)`
	);
</script>

<svelte:head>
	<title>Tag View - Reglet</title>
</svelte:head>

{#if project.tags.tags.length === 0}
	<div class="mx-auto max-w-200 py-8">
		<h1 class="text-6xl font-bold tracking-tighter">No tags yet</h1>
		<p class="mt-4 text-sm text-neutral-600">
			Add tags in
			<a
				class="font-mono underline hover:text-cobalt-500 focus-visible:text-cobalt-500"
				href={resolve('/(app)/settings')}>Settings</a
			>, then attach specimens to them here.
		</p>
	</div>
{:else}
	<h1 class="sr-only">Tag View</h1>
	<div
		style:--columns={columnsCSS}
		class="grid w-fit grid-cols-(--columns)"
	>
		<!-- each cell's label names its breakpoint, so this row is visual -->
		<ul
			class="sticky top-9 z-[5] col-span-full grid grid-cols-subgrid"
			aria-hidden="true"
		>
			<li></li>
			{#each columns as breakpoint (breakpoint.id)}
				<li class="p-4">
					<ul
						class="flex flex-row flex-wrap items-center justify-start gap-4 border border-black bg-white p-4"
					>
						<!-- badged like the lane numbers on the specimen view -->
						<li>
							<p
								class="grid h-11 place-items-center border bg-sunburst-500 px-3 text-2xl font-bold"
							>
								{breakpoint.name}
							</p>
						</li>
						{#if project.type === 'standard'}
							<li>
								<p class="text-xs">Min Width</p>
								<p class="text-xl font-bold">{breakpoint.width}px</p>
							</li>
						{/if}
					</ul>
				</li>
			{/each}
		</ul>

		<ul aria-label="Tags" class="col-span-full grid grid-cols-subgrid">
			{#each project.tags.tags as tag (tag.id)}
				<li class="col-span-full grid grid-cols-subgrid">
					<ul class="col-span-full grid grid-cols-subgrid items-start">
						<li class="p-4">
							<h2
								class="w-fit border bg-sunburst-500 px-5 py-3 text-2xl font-bold"
							>
								{tag.name}
							</h2>
						</li>
						{#each columns as breakpoint (breakpoint.id)}
							<li class="p-4">
								<PlacementCell
									{tag}
									{breakpoint}
									{named}
									onChange={(message) => (announcement = message)}
								/>
							</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ul>
	</div>
{/if}

<p class="sr-only" aria-live="polite">{announcement}</p>
