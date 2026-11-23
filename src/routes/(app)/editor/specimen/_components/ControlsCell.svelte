<script lang="ts">
	import { cva } from 'class-variance-authority';
	import { ChevronDown, ChevronUp } from '@lucide/svelte';

	import type { ControlsGridCell, Lane } from '#lib/types.js';

	import project from '#lib/stores/project.svelte.js';

	import Button from '#lib/ui/button/button.svelte';

	import LaneScaleFields from './LaneScaleFields.svelte';

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

{#snippet bounds()}
	<ul
		class="grid grid-cols-1 grid-rows-[repeat(2,32px)] items-start justify-start gap-1"
	>
		<li>
			{#if !(actions.top.destructive === true && cell.delete === false)}
				<Button
					label={actions.top.label}
					iconOnly
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
					iconOnly
					icon={ChevronDown}
					onclick={actions.bottom.action}
					scheme={actions.bottom.destructive ? 'destructive' : 'primary'}
				/>
			{/if}
		</li>
	</ul>
{/snippet}

<div class={controlsCellVariants({ variant: cell.value })}>
	{#if cell.value === 'upper'}
		<div class="flex w-full flex-col gap-2">
			<ul
				class="flex flex-row flex-wrap items-center justify-start gap-4 border border-black bg-white p-4"
			>
				<!-- numbered like the step markers down the side -->
				<li>
					<h2
						class="grid size-11 place-items-center border bg-sunburst-500 text-2xl font-bold"
					>
						<span class="sr-only">Lane </span>{project.lanes.number(
							lane.id
						)}
					</h2>
				</li>
				<li>
					<p class="text-xs">Family</p>
					<p class="text-xl font-bold">{lane.family}</p>
				</li>
				<li>
					<p class="text-xs">Weight</p>
					<p class="text-xl font-bold">{lane.weight}</p>
				</li>
				<li>
					<p class="text-xs">Style</p>
					<p class="text-xl font-bold">{lane.style}</p>
				</li>
				{#each Object.entries(lane.variationSettings ?? {}) as [tag, value] (tag)}
					<li>
						<p class="text-xs">{tag}</p>
						<p class="text-xl font-bold">{value}</p>
					</li>
				{/each}
			</ul>

			<!-- gap + the box's padding keep the buttons 2rem clear of the scale -->
			<div class="flex flex-row items-start gap-4">
				{@render bounds()}
				<div class="flex-1 border border-black bg-white p-4">
					<LaneScaleFields {lane} />
				</div>
			</div>
		</div>
	{:else}
		{@render bounds()}
	{/if}
</div>
