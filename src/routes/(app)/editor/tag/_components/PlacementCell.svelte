<script lang="ts">
	import { X } from '@lucide/svelte';

	import type { Breakpoint, Lane, Tag } from '#lib/types.js';

	import { toFontVariationSettings } from '#lib/domain/fonts/to-font-variation-settings.js';
	import { adjustNumberPrecision } from '#lib/domain/project/adjust-number-precision.js';
	import { toSpecimen } from '#lib/domain/project/to-specimen.js';
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
		laneLabel: (lane: Lane) => string;
		onChange: (message: string) => void;
	};

	let { tag, breakpoint, named, laneLabel, onChange }: PlacementCellProps =
		$props();

	const SEPARATOR = '|';

	const selectId = $derived(`placement-${tag.id}-${breakpoint.id}`);
	const where = $derived(
		named ? `${tag.name} at ${breakpoint.name}` : tag.name
	);

	// the header row with min widths is hidden from screen readers
	const labelWhere = $derived(
		named ? `${where}, ${breakpoint.width}px and up` : where
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
		below ? `Inherit (${describe(below.laneId, below.step)})` : 'None'
	);

	const change = (next: string) => {
		if (next === '') {
			project.tags.unassign(
				tag.id,
				breakpoint.id,
				project.breakpointOrder
			);
			onChange(
				below
					? `${where} now inherits ${describe(below.laneId, below.step)}.`
					: `Removed the specimen from ${where}.`
			);
			return;
		}

		const [laneId, step] = next.split(SEPARATOR);

		project.tags.assign(
			tag.id,
			breakpoint.id,
			{ laneId, step: Number(step) },
			project.breakpointOrder
		);
		onChange(`Attached ${describe(laneId, Number(step))} to ${where}.`);
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
			onchange={(event) => change(event.currentTarget.value)}
		>
			<option value="">{emptyLabel}</option>
			{#each project.lanes.lanes as option (option.id)}
				<optgroup label={laneLabel(option)}>
					{#each steps(option) as step (step)}
						<option value={`${option.id}${SEPARATOR}${step}`}>
							{describe(option.id, step)}
						</option>
					{/each}
				</optgroup>
			{/each}
		</Select>
	</div>
</div>
