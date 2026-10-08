<script lang="ts">
	import { toGrid } from '#lib/domain/project/to-grid.js';
	import project from '#lib/stores/project.svelte.js';
	import Cell from './components/Cell.svelte';

	let { cells, columns } = $derived(
		toGrid(project.lanes.lanes, project.precision)
	);

	let columnsCSS = $derived(`repeat(${columns}, 650px)`);
</script>

<svelte:head>
	<title>Grid View - Reglet</title>
</svelte:head>

<ul class="grid gap-4 p-4" style:--columns={columnsCSS}>
	{#each cells.reverse() as column, columnIndex (columnIndex)}
		<li>
			<ul class="grid grid-cols-(--columns) gap-4">
				{#each column as cell, cellIndex (cellIndex)}
					{#if cell !== null}
						<Cell {cell} />
					{:else}
						<li></li>
					{/if}
				{/each}
			</ul>
		</li>
	{/each}
</ul>
