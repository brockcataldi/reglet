<script lang="ts">
	import { isControlsGridCell, isSpecimenGridCell } from '#lib/types.js';

	import { toGrid } from '#lib/domain/project/to-grid.js';
	import project from '#lib/stores/project.svelte.js';

	import Radio from '#lib/ui/form/radio.svelte';

	import ControlsCell from './_components/ControlsCell.svelte';
	import SpecimenCell from './_components/SpecimenCell.svelte';

	let { cells, columns, max, rows } = $derived(
		toGrid(project.lanes.lanes, project.precision)
	);

	let columnsCSS = $derived(`88px repeat(${columns}, 650px)`);

	// fluid and static projects only place tags on the root
	const switchable = $derived(
		project.type === 'standard' &&
			project.breakpoints.breakpoints.length > 1
	);

	let selectedBreakpointId = $state(project.breakpoints.root?.id);

	// falls back to the root if the selection is gone or never made
	const breakpointId = $derived(
		switchable &&
			selectedBreakpointId &&
			project.breakpoints.get(selectedBreakpointId)
			? selectedBreakpointId
			: project.breakpoints.root?.id
	);
</script>

<svelte:head>
	<title>Grid View - Reglet</title>
</svelte:head>

{#if switchable}
	<fieldset
		class="sticky top-9 left-0 z-[5] flex w-dvw flex-row flex-wrap items-center gap-x-6 gap-y-2 border-b border-black bg-white px-4 py-2"
	>
		<legend
			class="float-left mr-2 font-mono text-sm text-neutral-600 uppercase"
		>
			Breakpoint
		</legend>
		{#each project.breakpoints.breakpoints as bp (bp.id)}
			<Radio
				id={`breakpoint-${bp.id}`}
				name="breakpoint"
				value={bp.id}
				label={bp.width === 0 ? bp.name : `${bp.name} (${bp.width}px)`}
				bind:group={selectedBreakpointId}
			/>
		{/each}
	</fieldset>
{/if}

<ul style:--columns={columnsCSS} class="w-fit">
	{#each cells.reverse() as row, rowIndex (rowIndex)}
		<li>
			<ul class="grid grid-cols-(--columns)">
				<li class="p-2 py-2 pr-2 pl-4">
					{#if rowIndex !== 0 && rowIndex !== rows - 1}
						<p
							class="grid size-17 place-items-center border bg-sunburst-500 text-2xl font-bold"
						>
							{max + 1 - rowIndex}
						</p>
					{/if}
				</li>

				{#each row as cell, columnIndex (columnIndex)}
					{@const lane = project.lanes.lanes[columnIndex]}

					<li class="p-2">
						{#if isSpecimenGridCell(cell)}
							<SpecimenCell
								{cell}
								{lane}
								{breakpointId}
								showBreakpoint={switchable}
							/>
						{:else if isControlsGridCell(cell)}
							<ControlsCell {cell} {lane} />
						{/if}
					</li>
				{/each}
			</ul>
		</li>
	{/each}
</ul>
