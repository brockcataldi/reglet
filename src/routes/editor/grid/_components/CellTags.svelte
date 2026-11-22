<script lang="ts">
	import { X } from '@lucide/svelte';

	import type { Lane, SpecimenGridCell } from '#lib/types.js';

	import { resolvePlacement } from '#lib/domain/tags/resolve-placement.js';
	import { tagsAtCell } from '#lib/domain/tags/tags-at-cell.js';
	import project from '#lib/stores/project.svelte.js';
	import { cn } from '#lib/utilities.js';

	import TagPicker, { type TagOption } from './TagPicker.svelte';

	type CellTagsProps = {
		cell: SpecimenGridCell;
		breakpointId: string;
		// only worth saying which breakpoint when there's more than one
		showBreakpoint: boolean;
	};

	let { cell, breakpointId, showBreakpoint }: CellTagsProps = $props();

	let picker = $state<TagPicker>();
	let announcement = $state('');

	const breakpoints = $derived(project.breakpoints.breakpoints);
	const breakpoint = $derived(project.breakpoints.get(breakpointId));

	const where = $derived(
		`step ${cell.step}${showBreakpoint && breakpoint ? ` at ${breakpoint.name}` : ''}`
	);

	const cellTags = $derived(
		tagsAtCell(
			project.tags.tags,
			breakpoints,
			breakpointId,
			cell.laneId,
			cell.step
		)
	);

	const laneLabel = (lane: Lane | undefined) =>
		lane ? `${lane.family} ${lane.weight}` : 'Deleted lane';

	const options = $derived(
		project.tags.tags
			.filter((tag) => !cellTags.some((entry) => entry.tag.id === tag.id))
			.map((tag): TagOption => {
				const resolved = resolvePlacement(tag, breakpoints, breakpointId);

				if (resolved) {
					return {
						id: tag.id,
						name: tag.name,
						detail: `Step ${resolved.step} · ${laneLabel(project.lanes.get(resolved.laneId))}`
					};
				}

				const start = project.breakpoints.get(tag.startsAt);
				const placed = Object.keys(tag.placements).length > 0;

				return {
					id: tag.id,
					name: tag.name,
					detail: placed && start ? `From ${start.name}` : 'Unplaced'
				};
			})
	);

	const assign = (id: string) => {
		const tag = project.tags.get(id);

		if (!tag) {
			return;
		}

		project.tags.assign(
			id,
			breakpointId,
			{ laneId: cell.laneId, step: cell.step },
			project.breakpointOrder
		);
		announcement = `Tagged ${where} as ${tag.name}.`;
	};

	const create = (name: string) => {
		const tag = project.tags.create(name, breakpointId);

		if (tag) {
			assign(tag.id);
		}
	};

	const remove = (id: string, name: string) => {
		project.tags.unassign(id, breakpointId, project.breakpointOrder);
		announcement = `Removed ${name} from ${where}.`;
		// the button that had focus is gone
		picker?.focus();
	};
</script>

<div
	class="flex flex-row flex-wrap items-center gap-2 border-b border-black p-2"
>
	{#if cellTags.length > 0}
		<ul
			class="flex flex-row flex-wrap gap-2"
			aria-label={`Tags on ${where}`}
		>
			{#each cellTags as { tag, inherited, from } (tag.id)}
				<li
					class={cn(
						'inline-flex items-center border font-mono text-sm',
						inherited
							? 'border-dashed border-neutral-500 px-2 text-neutral-600'
							: 'border-black bg-black pl-2 text-white'
					)}
					title={inherited ? `Inherited from ${from.name}` : undefined}
				>
					{tag.name}
					{#if inherited}
						<span class="sr-only">(inherited from {from.name})</span>
					{:else}
						<button
							type="button"
							class="ml-1 inline-flex size-6 items-center justify-center hover:bg-cobalt-500 focus-visible:bg-cobalt-500 focus-visible:outline-none [&>svg]:size-4"
							aria-label={`Remove ${tag.name} from ${where}`}
							onclick={() => remove(tag.id, tag.name)}
						>
							<X strokeWidth={1.5} />
						</button>
					{/if}
				</li>
			{/each}
		</ul>
	{/if}

	<TagPicker
		bind:this={picker}
		id={`tag-picker-${cell.laneId}-${cell.step}`}
		label={`Add a tag to ${where}`}
		{options}
		canCreate={(name) => !project.tags.isNameTaken(name)}
		onSelect={assign}
		onCreate={create}
	/>

	<p class="sr-only" aria-live="polite">{announcement}</p>
</div>
