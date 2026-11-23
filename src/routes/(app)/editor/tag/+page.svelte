<script lang="ts">
	import { resolve } from '$app/paths';

	import type { Lane } from '#lib/types.js';

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

	const columnsCSS = $derived(`200px repeat(${columns.length}, 420px)`);

	const laneLabel = (lane: Lane) => project.lanes.label(lane.id);
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
	<table style:--columns={columnsCSS} class="block w-fit">
		<caption class="sr-only">
			Specimens attached to each tag{named ? ' at each breakpoint' : ''}
		</caption>
		<thead class="sticky top-9 z-[5] block bg-white">
			<tr class="grid grid-cols-(--columns) border-b border-black">
				<th scope="col" class="p-4 text-left">
					<span class="sr-only">Tag</span>
				</th>
				{#each columns as breakpoint (breakpoint.id)}
					<th scope="col" class="p-4 text-left">
						<span class="block text-2xl font-bold">{breakpoint.name}</span>
						<span class="block text-xs font-normal text-neutral-600">
							{#if project.type === 'standard'}
								{breakpoint.width}px and up
							{:else if project.type === 'fluid'}
								Every width
							{:else}
								No breakpoints
							{/if}
						</span>
					</th>
				{/each}
			</tr>
		</thead>
		<tbody class="block">
			{#each project.tags.tags as tag (tag.id)}
				<tr class="grid grid-cols-(--columns) items-start">
					<th scope="row" class="p-4 text-left align-top">
						<span
							class="grid min-h-17 w-fit place-items-center border bg-sunburst-500 px-3 text-2xl font-bold"
						>
							{tag.name}
						</span>
					</th>
					{#each columns as breakpoint (breakpoint.id)}
						<td class="p-4">
							<PlacementCell
								{tag}
								{breakpoint}
								{named}
								{laneLabel}
								onChange={(message) => (announcement = message)}
							/>
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
{/if}

<p class="sr-only" aria-live="polite">{announcement}</p>
