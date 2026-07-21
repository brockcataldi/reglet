<script lang="ts">
	import type { Breakpoint } from '$lib/types';

	import project from '$lib/stores/project.svelte';
	import settings from '$lib/stores/settings.svelte';

	import { toGrid } from '$lib/project/to-grid';

	import Cell from './Cell.svelte';

	type BreakpointProps = {
		breakpoint: Breakpoint;
	};

	let { breakpoint }: BreakpointProps = $props();

	let grid = $derived(
		toGrid(breakpoint, project.lanes, settings.precision).reverse()
	);

	let gridColumnsRepeat = $derived(`repeat(${project.lanes.length + 1}, 600px)`);
</script>
<ul class="grid grid-cols-1 gap-8 py-8 w-fit" 
	style:--columns={gridColumnsRepeat}>
	{#each grid as row, rowIndex (`grid-${rowIndex}`)}
		<li
			class="grid grid-cols-[64px_1fr] gap-8 px-8 w-fit"
		>
			<p
				class="m-0 grid h-15 w-15 place-items-center border border-black p-0 text-3xl font-bold"
			>
				{breakpoint.defaultScale.maxStep - rowIndex}
			</p>

			<ul class="grid grid-cols-(--columns) gap-8">
				{#each row as cell, cellIndex (`cell-${rowIndex}-${cellIndex}`)}
					<Cell {cell} />
				{/each}
				{#each row as cell, cellIndex (`cell-${rowIndex}-${cellIndex}`)}
					<Cell {cell} />
				{/each}
			</ul>
			
		</li>
	{/each}
</ul>
