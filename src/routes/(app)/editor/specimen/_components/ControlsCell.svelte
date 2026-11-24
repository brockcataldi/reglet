<script lang="ts">
	import { tick } from 'svelte';
	import {
		ChevronDown,
		ChevronUp,
		Link,
		Link2Off,
		SlidersHorizontal,
		Trash,
		X
	} from '@lucide/svelte';

	import type { ControlsGridCell, Lane } from '#lib/types.js';

	import { MODULAR_SCALE_RATIOS } from '#lib/constants.js';
	import { toFontVariationSettings } from '#lib/domain/fonts/to-font-variation-settings.js';
	import { toStyleName } from '#lib/domain/fonts/to-style-name.js';
	import project from '#lib/stores/project.svelte.js';

	import Button from '#lib/ui/button/button.svelte';
	import Checkbox from '#lib/ui/form/checkbox.svelte';

	import LaneScaleFields from './LaneScaleFields.svelte';

	type CellProps = {
		cell: ControlsGridCell;
		lane: Lane;
	};

	let { cell, lane }: CellProps = $props();

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

	const ratioName = (ratio: number) =>
		MODULAR_SCALE_RATIOS.find((entry) => entry.ratio === ratio)?.label;

	// a linked group shares one card across its columns, drawn by its source
	const members = $derived(
		project.lanes.group(lane.id)?.members ?? [lane]
	);
	const grouped = $derived(members.length > 1);
	const canLink = $derived(project.canLink(lane.id));

	// each lane's scale fields stay out of the way until asked for
	let open = $state<Record<string, boolean>>({});

	const fieldsId = (id: string) => `lane-${id}-scale-fields`;
	const scaleButtonId = (id: string) => `lane-${id}-scale-button`;

	// the panel that had focus goes with the lane, so focus lands on the
	// unlinked lane's own Scale button, or the source's after a delete
	const unlink = async (id: string) => {
		project.unlinkLane(id);
		await tick();
		document.getElementById(scaleButtonId(id))?.focus();
	};

	const remove = async (id: string) => {
		project.deleteLane(id);
		await tick();
		document.getElementById(scaleButtonId(lane.id))?.focus();
	};
</script>

{#snippet scaleLine(size: number, ratio: number)}
	{@const name = ratioName(ratio)}
	<b>{size}{project.fontSizeUnit}</b> at ratio <b>{ratio}</b>{name
		? ` (${name})`
		: ''}
{/snippet}

{#snippet scaleButton(target: Lane)}
	{@const isOpen = open[target.id] === true}
	<Button
		id={scaleButtonId(target.id)}
		label={isOpen ? 'Close' : 'Scale'}
		icon={isOpen ? X : SlidersHorizontal}
		aria-label={grouped
			? `${isOpen ? 'Close' : 'Scale'} ${project.lanes.name(target.id)}`
			: undefined}
		aria-expanded={isOpen}
		aria-controls={isOpen ? fieldsId(target.id) : undefined}
		onclick={() => (open[target.id] = !isOpen)}
	/>
{/snippet}

{#snippet linkButton()}
	{#if canLink}
		<Button
			label={grouped ? 'Add Linked Lane' : 'Link Lane'}
			icon={Link}
			onclick={() => project.linkLane(lane.id)}
		/>
	{/if}
{/snippet}

<!-- the step buttons sit under the first column, even when the card spans more -->
{#snippet steps()}
	<div
		class="grid gap-8"
		style:grid-template-columns={`repeat(${members.length}, minmax(0, 1fr))`}
	>
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
	</div>
{/snippet}

{#if cell.value === 'upper'}
	<div class="flex h-full flex-col justify-end gap-2">
		<div class="border border-black bg-white">
			<div
				class={[
					'flex gap-4 p-4',
					grouped ? 'items-center border-b border-black' : 'items-start'
				]}
			>
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
						{#if grouped}
							<p class="mt-1 flex items-center gap-1 text-sm">
								<Link class="size-4" aria-hidden="true" />
								{members.length} linked scales
							</p>
						{/if}
					</div>

					{#if !grouped}
						<p class="text-sm">
							{@render scaleLine(lane.baseSize, lane.ratio)}
						</p>
					{/if}
				</div>

				<div class="flex shrink-0 items-center gap-4">
					{#if grouped}
						<Checkbox
							id={`lane-${lane.id}-match-steps`}
							label="Matching steps"
							checked={lane.matchSteps ?? false}
							onchange={(event) =>
								project.setMatchSteps(
									lane.id,
									event.currentTarget.checked
								)}
						/>
						{@render linkButton()}
					{:else}
						{@render linkButton()}
						{@render scaleButton(lane)}
					{/if}
				</div>
			</div>

			{#if !grouped && open[lane.id]}
				<div id={fieldsId(lane.id)} class="border-t border-black p-4">
					<LaneScaleFields {lane} />
				</div>
			{/if}

			{#if grouped}
				<ul
					class="grid"
					style:grid-template-columns={`repeat(${members.length}, minmax(0, 1fr))`}
				>
					{#each members as member, index (member.id)}
						{@const name = project.lanes.name(member.id)}
						<li class={[index > 0 && 'border-l border-black']}>
							<div class="flex items-center gap-3 p-4">
								<h3
									class="grid size-8 shrink-0 place-items-center border bg-sunburst-500 font-bold"
								>
									<span class="sr-only">Lane </span>{project.lanes.number(
										member.id
									)}
								</h3>
								<p class="min-w-0 flex-1 text-sm">
									{@render scaleLine(member.baseSize, member.ratio)}
								</p>
								{@render scaleButton(member)}
							</div>

							{#if open[member.id]}
								<div
									id={fieldsId(member.id)}
									class="flex flex-col gap-4 border-t border-black p-4"
								>
									<LaneScaleFields lane={member} />
									<!-- unlink keeps the lane, delete drops it and its tags -->
									{#if index > 0}
										<div class="grid grid-cols-2 gap-2">
											<Button
												label="Unlink"
												icon={Link2Off}
												aria-label={`Unlink ${name}`}
												onclick={() => unlink(member.id)}
											/>
											<Button
												label="Delete Lane"
												icon={Trash}
												scheme="destructive"
												aria-label={`Delete ${name}`}
												onclick={() => remove(member.id)}
											/>
										</div>
									{/if}
								</div>
							{/if}
						</li>
					{/each}
				</ul>
			{/if}
		</div>

		{@render steps()}
	</div>
{:else}
	{@render steps()}
{/if}
