<script lang="ts">
	import { Minus, Plus } from '@lucide/svelte';

	import type { Breakpoint } from '$lib/types';

	import project from '$lib/stores/project.svelte';
	import settings from '$lib/stores/settings.svelte';

	import { toGrid } from '$lib/project/to-grid';

	import IconButton from '$lib/ui/button/icon-button.svelte';

	import Cell from './Cell.svelte';

	type BreakpointProps = {
		breakpoint: Breakpoint;
	};

	let { breakpoint }: BreakpointProps = $props();

	let grid = $derived(
		toGrid(breakpoint, project.lanes, settings.precision).reverse()
	);

	let gridColumnsRepeat = $derived(
		`repeat(${project.lanes.length}, 600px)`
	);
</script>

<ul
	class="grid w-fit grid-cols-1 gap-8 py-8"
	style:--columns={gridColumnsRepeat}
>
	<li class="grid w-fit grid-cols-[64px_1fr] gap-8 px-8">
		<div></div>
		<ul class="grid grid-cols-(--columns) gap-8">
			{#each project.lanes as lane, laneIndex (`lane-${laneIndex}`)}
				<li>
					<div class="border border-black p-4">
						<h2 class="text-4xl font-bold">
							{lane.family}
						</h2>

						<ul>
							<li>
								font-weight: {lane.weight}
							</li>
							<li>
								font-style: {lane.style}
							</li>
						</ul>
					</div>
				</li>
			{/each}
		</ul>
	</li>
	{#each grid as row, rowIndex (`grid-${rowIndex}`)}
		<li class="grid w-fit grid-cols-[64px_1fr] gap-8 px-8">
			<div class="grid grid-rows-[repeat(3,60px)] grid-cols-1 gap-2">
				{#if rowIndex === 0}
					<IconButton icon={Plus} label="Add row above {breakpoint.maxStep - rowIndex}" onclick={() => project.updateBreakpointMaxStep(breakpoint.id, breakpoint.maxStep + 1)}/>
				{/if}

				{#if rowIndex === grid.length - 1}
					<IconButton icon={Minus} label="Remove row {breakpoint.maxStep - rowIndex}" onclick={() => project.updateBreakpointMinStep(breakpoint.id, breakpoint.minStep + 1)}/>
				{/if}

                <p 
					class="m-0 grid h-15 w-15 place-items-center border border-black bg-sunburst-500 p-0 text-3xl font-bold"
				>
					{breakpoint.maxStep - rowIndex}
				</p>
				{#if rowIndex === 0}
					<IconButton icon={Minus} label="Remove row {breakpoint.maxStep - rowIndex}" onclick={() => project.updateBreakpointMaxStep(breakpoint.id, breakpoint.maxStep - 1)} />
				{/if}
				{#if rowIndex === grid.length - 1}
					<IconButton icon={Plus} label="Add row below {breakpoint.maxStep - rowIndex}" onclick={() => project.updateBreakpointMinStep(breakpoint.id, breakpoint.minStep - 1)}/>
				{/if}
			</div>

			<ul class="grid grid-cols-(--columns) gap-8">
				{#each row as cell, cellIndex (`cell-${rowIndex}-${cellIndex}`)}
					<Cell breakpointId={breakpoint.id} {cell} />
				{/each}
			</ul>
		</li>
	{/each}
</ul>
