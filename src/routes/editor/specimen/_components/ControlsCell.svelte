<script lang="ts">
	import { cva } from 'class-variance-authority';
	import { ChevronDown, ChevronUp } from '@lucide/svelte';

	import type { ControlsGridCell, Lane } from '#lib/types.js';

	import project from '#lib/stores/project.svelte.js';

	import Button from '#lib/ui/button/button.svelte';

	type CellProps = {
		cell: ControlsGridCell;
		lane: Lane;
	};

	let { cell, lane }: CellProps = $props();

	let target: 'maxStep' | 'minStep' = $derived(
		cell.value === 'upper' ? 'maxStep' : 'minStep'
	);

	let controlsCellVariants = cva(
		'flex justify-start gap-4 h-full w-full',
		{
			variants: {
				variant: {
					upper: 'items-end',
					lower: 'items-start'
				}
			},
			defaultVariants: {
				variant: 'upper'
			}
		}
	);

	const actions = $derived(
		{
			upper: {
				top: {
					label: `Add row ${cell.step}`,
					destructive: false,
					action: () => project.lanes.increment(cell.laneId, target)
				},
				bottom: {
					label: `Remove row ${cell.step - 1}`,
					destructive: true,
					action: () => project.lanes.decrement(cell.laneId, target)
				}
			},
			lower: {
				// raising the minimum removes the lowest row
				top: {
					label: `Remove row ${cell.step + 1}`,
					destructive: true,
					action: () => project.lanes.increment(cell.laneId, target)
				},
				bottom: {
					label: `Add row ${cell.step}`,
					destructive: false,
					action: () => project.lanes.decrement(cell.laneId, target)
				}
			}
		}[cell.value]
	);
</script>

<div class={controlsCellVariants({ variant: cell.value })}>
	<div
		class="box-border flex h-fit w-full border border-black bg-white p-2"
	>
		<div class="flex items-start justify-start gap-1">
			<!-- <p class="size-17 grid place-items-center border font-bold text-2xl bg-sunburst-500">{columnIndex}</p> -->
			<ul
				class="grid grid-cols-[max-content] grid-rows-[repeat(2,32px)] items-start justify-start gap-1"
			>
				<li>
					{#if !(actions.top.destructive === true && cell.delete === false)}
						<Button
							label={actions.top.label}
							size="sm"
							class="w-full whitespace-nowrap"
							icon={ChevronUp}
							onclick={actions.top.action}
							scheme={actions.top.destructive ? 'destructive' : 'primary'}
						/>
					{/if}
				</li>
				<li>
					{#if !(actions.bottom.destructive === true && cell.delete === false)}
						<Button
							label={actions.bottom.label}
							size="sm"
							class="w-full whitespace-nowrap"
							icon={ChevronDown}
							onclick={actions.bottom.action}
							scheme={actions.bottom.destructive
								? 'destructive'
								: 'primary'}
						/>
					{/if}
				</li>
			</ul>
		</div>

		{#if cell.value === 'upper'}
			<ul
				class="ml-4 flex w-full flex-row items-center justify-start gap-4"
			>
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
