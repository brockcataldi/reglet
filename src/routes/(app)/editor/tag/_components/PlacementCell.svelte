<script lang="ts">
	import { X } from '@lucide/svelte';

	import type { Breakpoint, Lane, Tag } from '#lib/types.js';

	import { toFontVariationSettings } from '#lib/domain/fonts/to-font-variation-settings.js';
	import { adjustNumberPrecision } from '#lib/domain/project/adjust-number-precision.js';
	import { toSpecimen } from '#lib/domain/project/to-specimen.js';
	import { fluidLineHeightChanges } from '#lib/domain/tags/fluid-placement.js';
	import { resolvePlacement } from '#lib/domain/tags/resolve-placement.js';
	import project from '#lib/stores/project.svelte.js';
	import { cn } from '#lib/utilities.js';

	import Button from '#lib/ui/button/button.svelte';
	import Separator from '#lib/ui/display/separator.svelte';
	import Select from '#lib/ui/form/select.svelte';

	type PlacementCellProps = {
		tag: Tag;
		breakpoint: Breakpoint;
		// name the breakpoint in labels; off when there's only one column
		named: boolean;
		onChange: (message: string) => void;
	};

	let { tag, breakpoint, named, onChange }: PlacementCellProps = $props();

	const SEPARATOR = '|';

	const selectId = $derived(`placement-${tag.id}-${breakpoint.id}`);
	const where = $derived(
		named ? `${tag.name} at ${breakpoint.name}` : tag.name
	);

	// the header row with min widths is hidden from screen readers
	const labelWhere = $derived(
		named
			? project.type === 'fluid'
				? `${where}, at ${breakpoint.width}px`
				: `${where}, ${breakpoint.width}px and up`
			: where
	);

	const breakpoints = $derived(project.breakpoints.breakpoints);
	const own = $derived(tag.placements[breakpoint.id]);

	// what applies here, own or carried up from below
	const resolved = $derived(
		resolvePlacement(tag, breakpoints, breakpoint.id)
	);

	// what applies here if this breakpoint had no placement of its own
	const below = $derived.by(() => {
		const index = breakpoints.findIndex((bp) => bp.id === breakpoint.id);
		const lower = breakpoints[index - 1];

		return lower
			? resolvePlacement(tag, breakpoints, lower.id)
			: undefined;
	});

	const lane = $derived(
		resolved ? project.lanes.get(resolved.laneId) : undefined
	);

	const specimen = $derived(
		lane && resolved
			? toSpecimen(lane, resolved.step, project.precision)
			: undefined
	);

	// overrides skip toSpecimen's rounding, so round for display here
	const fontSize = $derived(
		specimen
			? adjustNumberPrecision(specimen.fontSize, project.precision)
			: undefined
	);

	const inheritedFrom = $derived(
		resolved && !own
			? project.breakpoints.get(resolved.breakpointId)
			: undefined
	);

	// "Lane 1 / Step 3"
	const describe = (laneId: string, step: number) =>
		`${project.lanes.name(laneId)} / Step ${step}`;

	const fluid = $derived(project.type === 'fluid');
	const isMax = $derived(fluid && breakpoint.id === breakpoints[1]?.id);

	// a fluid max slides from the min, so there's nothing to pick until then
	const needsMin = $derived(
		isMax && !(breakpoints[0]?.id in tag.placements)
	);

	const optionError = (laneId: string, step: number) =>
		project.placementError(tag.id, breakpoint.id, { laneId, step });

	// unitless line heights can't go in a clamp(), so say when it'll change
	const lineHeightChanges = $derived.by(() => {
		if (!isMax || !own) {
			return false;
		}

		const end = (laneId: string, step: number) => {
			const target = project.lanes.get(laneId);
			return target ? { lane: target, step } : undefined;
		};
		const min = tag.placements[breakpoints[0].id];

		return fluidLineHeightChanges(
			min && end(min.laneId, min.step),
			end(own.laneId, own.step),
			project.precision
		);
	});

	// a placement that was fine can break later, ex. after the lane's scale
	// or font changes, so the cell says so rather than hiding it
	const currentError = $derived(
		own ? optionError(own.laneId, own.step) : undefined
	);

	const steps = (target: Lane) =>
		Array.from(
			{ length: target.maxStep - target.minStep + 1 },
			(_, i) => target.maxStep - i
		);

	const value = $derived(
		own ? `${own.laneId}${SEPARATOR}${own.step}` : ''
	);

	// an empty value drops this breakpoint's own placement
	const emptyLabel = $derived(
		needsMin
			? 'Place it at min first'
			: below
				? `Inherit (${describe(below.laneId, below.step)})`
				: 'None'
	);

	const change = (next: string) => {
		if (next === '') {
			const max = breakpoints[1];
			// removing a fluid min takes its max with it
			const alsoMax =
				fluid && !isMax && max !== undefined && max.id in tag.placements;

			project.unassignTag(tag.id, breakpoint.id);
			onChange(
				below
					? `${where} now inherits ${describe(below.laneId, below.step)}.`
					: alsoMax
						? `Removed the specimen from ${where}, and from ${max.name} with it.`
						: `Removed the specimen from ${where}.`
			);
			return;
		}

		const [laneId, step] = next.split(SEPARATOR);

		if (
			project.assignTag(tag.id, breakpoint.id, {
				laneId,
				step: Number(step)
			})
		) {
			onChange(`Attached ${describe(laneId, Number(step))} to ${where}.`);
		}
	};
</script>

<div
	class={cn(
		'bg-white',
		own ? 'border border-black' : 'border border-dashed border-neutral-400'
	)}
>
	<div class="overflow-hidden border-b border-inherit p-4">
		{#if lane && specimen && resolved}
			<p
				class={cn(
					'overflow-hidden whitespace-nowrap',
					!own && 'text-neutral-500'
				)}
				style:font-family={lane.family}
				style:font-weight={lane.weight}
				style:font-style={lane.style}
				style:font-variation-settings={toFontVariationSettings(
					lane.variationSettings
				)}
				style:line-height={specimen.lineHeight}
				style:font-size={`${fontSize}${project.fontSizeUnit}`}
				style:letter-spacing={`${specimen.letterSpacing}${project.letterSpacingUnit}`}
			>
				Lorem ipsum dolor sit amet consectetur adipisicing elit.
			</p>
			<p class="mt-2 text-xs text-neutral-600">
				{fontSize}{project.fontSizeUnit} / {specimen.lineHeight}
				{#if inheritedFrom}
					(inherited from {inheritedFrom.name})
				{/if}
			</p>
		{:else}
			<p class="text-sm text-neutral-600">No specimen attached.</p>
		{/if}
	</div>

	<div class="p-4">
		<Separator as="label" for={selectId}>
			Specimen<span class="sr-only"> for {labelWhere}</span>
			{#snippet action()}
				{#if own}
					<Button
						label="Clear"
						icon={X}
						size="sm"
						scheme="destructive"
						class="-my-0.5"
						aria-label={below
							? `Clear ${where} so it inherits again`
							: `Remove the specimen from ${where}`}
						onclick={() => change('')}
					/>
				{/if}
			{/snippet}
		</Separator>
		<Select
			id={selectId}
			{value}
			disabled={needsMin}
			variant={needsMin ? 'disabled' : 'default'}
			onchange={(event) => change(event.currentTarget.value)}
		>
			<option value="">{emptyLabel}</option>
			{#each project.lanes.lanes as option (option.id)}
				<optgroup label={project.lanes.label(option.id)}>
					{#each steps(option) as step (step)}
						{@const error = optionError(option.id, step)}
						<!-- the current pick stays selectable so a broken one still shows -->
						<option
							value={`${option.id}${SEPARATOR}${step}`}
							disabled={error !== undefined &&
								value !== `${option.id}${SEPARATOR}${step}`}
						>
							{describe(option.id, step)}{error
								? ` (${error.replace(/\.$/, '')})`
								: ''}
						</option>
					{/each}
				</optgroup>
			{/each}
		</Select>
		{#if currentError}
			<p class="mt-2 text-sm text-red-800">{currentError}</p>
		{:else if lineHeightChanges}
			<p class="mt-2 text-sm text-neutral-600">
				Line height changes between min and max, so it'll export as a fluid
				length instead of unitless.
			</p>
		{/if}
	</div>
</div>
