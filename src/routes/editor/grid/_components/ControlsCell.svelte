<script lang="ts">
	import { cva } from 'class-variance-authority';
	import { ChevronDown, ChevronUp } from '@lucide/svelte';

	import type { ControlsGridCell, Lane } from '#lib/types.js';
    import { toOrdinal } from '#lib/utilities.js';

    import project from '#lib/stores/project.svelte.js';

	import IconButton from '#lib/ui/button/icon-button.svelte';

	type CellProps = {
		cell: ControlsGridCell;
        lane: Lane;
	};

	let { cell, lane }: CellProps = $props();

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

    const actions = $derived({
        'upper': {
            top: {
                label: `Add the ${toOrdinal(cell.step)} Row`,
                destructive: false,
                action: () => project.lanes.increment(cell.laneId, target)
            },
            bottom: {
                label: `Delete the ${toOrdinal(cell.step - 1)} Row`,
                destructive: true,
                action: () => project.lanes.decrement(cell.laneId, target)
            }
        },
        'lower': {
            top: {
                label: `Add the ${toOrdinal(cell.step)} Row`,
                destructive: true,
                action: () => project.lanes.increment(cell.laneId, target)
            },
            bottom: {
                label: `Delete the ${toOrdinal(cell.step + 1)} Row`,
                destructive: false,
                action: () => project.lanes.decrement(cell.laneId, target)
            }
        }
    }[cell.value])
</script>

<div class={controlsCellVariants({ variant: cell.value })}>
    <div class="w-full h-fit bg-white box-border p-2 border border-black flex">
        <div class="flex items-start justify-start gap-1">
            <!-- <p class="size-17 grid place-items-center border font-bold text-2xl bg-sunburst-500">{columnIndex}</p> -->
            <ul class="grid grid-cols-1 grid-rows-[repeat(2,32px)] gap-1 items-start justify-start">
                <li>
                    {#if !(actions.top.destructive === true && cell.delete === false)}
                        <IconButton
                            label={actions.top.label}
                            icon={ChevronUp}
                            onclick={actions.top.action}
                            scheme={actions.top.destructive ? 'destructive' : 'primary'}
                        />
                    {/if}
                </li>
                <li>
                     {#if !(actions.bottom.destructive === true && cell.delete === false)}
                        <IconButton
                            label={actions.bottom.label}
                            icon={ChevronDown}
                            onclick={actions.bottom.action}
                            scheme={actions.bottom.destructive ? 'destructive' : 'primary'}
                        />
                    {/if}
                </li>
            </ul>
        </div>

        {#if cell.value === "upper"}
            <ul class="flex items-center justify-start flex-row gap-4 ml-4 w-full">
                <li>
                    <p class="text-xs">Family</p>
                    <p class="text-xl font-bold">{lane.family}</p>
                </li>
                <li class="p-1">
                    <p class="text-xs">Weight</p>
                    <p class="text-xl font-bold">{lane.weight}</p>
                </li>
                <li class="p-1">
                    <p class="text-xs">Style</p>
                    <p class="text-xl font-bold">{lane.style}</p>
                </li>
            </ul>
        {/if}
    </div>
</div>
