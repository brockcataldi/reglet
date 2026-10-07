<script lang="ts">
	import { toGrid } from '#lib/domain/project/to-grid.js';
	import project from '#lib/stores/project.svelte.js';
	import Cell from './components/Cell.svelte';

	let { cells, columns, rows } = $derived(
		toGrid(project.lanes.lanes, project.precision)
	);

	let columnsCSS = $derived(`repeat(${columns}, 1fr)`);
	let rowsCSS = $derived(`repeat(${columns}, 1fr)`);
</script>

<svelte:head>
	<title>Grid View - Reglet</title>
</svelte:head>

<ul
	class="grid grid-cols-(--columns) grid-rows-(--rows) gap-4"
	style:--columns={columnsCSS}
	style:--rows={rowsCSS}
	style:--row-span={rows}
>
	{#each cells as column, columnIndex (columnIndex)}
		<li
			class="col-span-1 row-span-(--row-span) grid grid-cols-1 grid-rows-subgrid"
		>
			<ul class="row-span-(--row-span) grid grid-cols-1 grid-rows-subgrid">
				{#each column.reverse() as cell, cellIndex (cellIndex)}
					<li>
						{#if cell !== null}
							<Cell {cell} />
						{/if}
					</li>
				{/each}
			</ul>
		</li>
	{/each}
</ul>

<!-- <aside
    class="fixed top-9 left-0 box-border h-screen w-64 border-r border-black bg-white p-4"
>
    <div class="flex flex-col items-start justify-start gap-4">
        
    </div>
</aside>

<article class="ml-64">

</article> -->
