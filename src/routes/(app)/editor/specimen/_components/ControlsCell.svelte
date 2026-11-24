<script lang="ts">
	import {
		ChevronDown,
		ChevronUp,
		SlidersHorizontal,
		X
	} from '@lucide/svelte';

	import type { ControlsGridCell, Lane } from '#lib/types.js';

	import { MODULAR_SCALE_RATIOS } from '#lib/constants.js';
	import { toFontVariationSettings } from '#lib/domain/fonts/to-font-variation-settings.js';
	import { toStyleName } from '#lib/domain/fonts/to-style-name.js';
	import project from '#lib/stores/project.svelte.js';

	import Button from '#lib/ui/button/button.svelte';

	import LaneScaleFields from './LaneScaleFields.svelte';

	type CellProps = {
		cell: ControlsGridCell;
		lane: Lane;
	};

	let { cell, lane }: CellProps = $props();

	// the scale fields stay out of the way until asked for
	let open = $state(false);

	const target = $derived(cell.value === 'upper' ? 'maxStep' : 'minStep');

	// the upper cell sits one past the lane's top step, the lower one past its
	// bottom, so adding moves that end outwards and removing pulls it in
	const actions = $derived(
		{
			upper: {
				add: {
					label: `Add step ${cell.step}`,
					icon: ChevronUp,
					action: () => project.stepLane(cell.laneId, target, 'increment')
				},
				remove: {
					label: `Remove step ${cell.step - 1}`,
					icon: ChevronDown,
					action: () => project.stepLane(cell.laneId, target, 'decrement')
				}
			},
			lower: {
				add: {
					label: `Add step ${cell.step}`,
					icon: ChevronDown,
					action: () => project.stepLane(cell.laneId, target, 'decrement')
				},
				remove: {
					label: `Remove step ${cell.step + 1}`,
					icon: ChevronUp,
					action: () => project.stepLane(cell.laneId, target, 'increment')
				}
			}
		}[cell.value]
	);

	const axes = $derived(
		Object.entries(lane.variationSettings ?? {})
			.map(([tag, value]) => `${tag} ${value}`)
			.join(', ')
	);

	const maxRatio = $derived(
		lane.fluid?.linkRatio
			? lane.ratio
			: (lane.fluid?.maxRatio ?? lane.ratio)
	);

	const ratioName = (ratio: number) =>
		MODULAR_SCALE_RATIOS.find((entry) => entry.ratio === ratio)?.label;

	const fieldsId = $derived(`lane-${lane.id}-scale-fields`);
</script>

{#snippet scaleLine(size: number, ratio: number)}
	{@const name = ratioName(ratio)}
	<b>{size}{project.fontSizeUnit}</b> at ratio <b>{ratio}</b>{name
		? ` (${name})`
		: ''}
{/snippet}

{#snippet steps()}
	<div class="grid grid-cols-2 gap-2">
		<Button
			label={actions.add.label}
			icon={actions.add.icon}
			onclick={actions.add.action}
		/>
		<!-- a lane keeps at least one step -->
		{#if cell.delete}
			<Button
				label={actions.remove.label}
				icon={actions.remove.icon}
				scheme="destructive"
				onclick={actions.remove.action}
			/>
		{/if}
	</div>
{/snippet}

{#if cell.value === 'upper'}
	<div class="flex h-full flex-col justify-end gap-2">
		<div class="border border-black bg-white">
			<div class="flex items-start gap-4 p-4">
				<!-- numbered like the step markers down the side -->
				<h2
					class="grid size-11 shrink-0 place-items-center border bg-sunburst-500 text-2xl font-bold"
				>
					<span class="sr-only">Lane </span>{project.lanes.number(lane.id)}
				</h2>

				<div class="flex min-w-0 flex-1 flex-col gap-3">
					<div>
						<!-- set in the lane's own font, so the name previews it -->
						<p
							class="truncate text-2xl leading-tight"
							style:font-family={lane.family}
							style:font-weight={lane.weight}
							style:font-style={lane.style}
							style:font-variation-settings={toFontVariationSettings(
								lane.variationSettings
							)}
						>
							{lane.family}
							{toStyleName(lane)}
						</p>
						{#if axes}
							<p class="text-sm">{axes}</p>
						{/if}
					</div>

					{#if lane.fluid}
						<dl
							class="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-2 gap-y-1 text-sm"
						>
							<dt class="text-xs">Min</dt>
							<dd>{@render scaleLine(lane.baseSize, lane.ratio)}</dd>
							<dt class="text-xs">Max</dt>
							<dd>
								{@render scaleLine(lane.fluid.maxBaseSize, maxRatio)}
							</dd>
						</dl>
					{:else}
						<p class="text-sm">
							{@render scaleLine(lane.baseSize, lane.ratio)}
						</p>
					{/if}
				</div>

				<Button
					label={open ? 'Close' : 'Scale'}
					icon={open ? X : SlidersHorizontal}
					aria-expanded={open}
					aria-controls={open ? fieldsId : undefined}
					onclick={() => (open = !open)}
				/>
			</div>

			{#if open}
				<div id={fieldsId} class="border-t border-black p-4">
					<LaneScaleFields {lane} />
				</div>
			{/if}
		</div>

		{@render steps()}
	</div>
{:else}
	{@render steps()}
{/if}
