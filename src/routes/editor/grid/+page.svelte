<script lang="ts">
	import { isControlsGridCell, isSpecimenGridCell } from '#lib/types.js';

	import { toGrid } from '#lib/domain/project/to-grid.js';
	import project from '#lib/stores/project.svelte.js';
	import ControlsCell from './components/ControlsCell.svelte';
	import SpecimenCell from './components/SpecimenCell.svelte';

	let { cells, columns, maxBuffer, rows } = $derived(
		toGrid(project.lanes.lanes, project.precision)
	);

	let columnsCSS = $derived(`88px repeat(${columns}, 650px)`);
</script>

<svelte:head>
	<title>Grid View - Reglet</title>
</svelte:head>

<ul style:--columns={columnsCSS}>
	{#each cells.reverse() as row, rowIndex (rowIndex)}
		<li class="odd:bg-neutral-100">
			<ul class="grid grid-cols-(--columns)">
				<li class="p-2 py-2 pl-4 pr-2">
					{#if rowIndex !== 0 && rowIndex !== rows - 1}
						<p class="size-16 grid place-items-center border font-mono font-bold text-2xl bg-sunburst-500">{maxBuffer - rowIndex}</p>
					{/if}
				</li>

				{#each row as cell, columnIndex (columnIndex)}
					<li class="p-2">
						{#if isSpecimenGridCell(cell)}
							<SpecimenCell {cell} />
						{:else if isControlsGridCell(cell)}
							<ControlsCell {cell} />
						{/if}
					</li>
				{/each}
			</ul>
		</li>
	{/each}
</ul>
