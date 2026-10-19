<script lang="ts">
	import { cva } from 'class-variance-authority';

	import type { ControlsGridCell } from '#lib/types.js';
    import { toOrdinal } from '#lib/utilities.js';

    import project from '#lib/stores/project.svelte.js';

	import Button from '#lib/ui/button/button.svelte';

	type CellProps = {
		cell: ControlsGridCell;
	};

	let { cell }: CellProps = $props();

	let target: 'maxStep' | 'minStep' = $derived(
		cell.value === 'upper' ? 'maxStep' : 'minStep'
	);

    let controlsCellVariants = cva('flex justify-start gap-4 h-full w-full', {
        variants: {
            variant: {
                upper: 'items-end',
                lower: 'items-start'
            }
        },
        defaultVariants:{
            variant: 'upper'
        }
    })
</script>

<div class={controlsCellVariants({ variant: cell.value })}>
    <div class="w-full h-fit bg-white box-border p-2 border border-black">
        <Button
            label={`Add the ${toOrdinal(cell.step)} Row`}
            onclick={() => {
                if (cell.value === 'upper') {
                    project.lanes.increment(cell.laneId, target);
                } else {
                    project.lanes.decrement(cell.laneId, target);
                }
            }}
        />

        {#if cell.delete}
            <Button
                label={`Delete the ${toOrdinal(cell.value === 'upper' ? cell.step - 1 : cell.step + 1)} Row`}
                variant="destructive"
                onclick={() => {
                    if (cell.value === 'upper') {
                        project.lanes.decrement(cell.laneId, target);
                    } else {
                        project.lanes.increment(cell.laneId, target);
                    }
                }}
            />
       {/if}
    </div>
</div>
