<script lang="ts">
	import { X } from '@lucide/svelte';

	import type {
		Breakpoint,
		Lane,
		SpecimenGridCell,
		Tag
	} from '#lib/types.js';

	import {
		formatTagLabel,
		matchesTagQuery,
		parseTagQuery,
		TAG_SEPARATOR
	} from '#lib/domain/tags/parse-tag-query.js';
	import { placementsAtCell } from '#lib/domain/tags/placements-at-cell.js';
	import { resolvePlacement } from '#lib/domain/tags/resolve-placement.js';
	import project from '#lib/stores/project.svelte.js';

	import TagPicker, { type TagOption } from './TagPicker.svelte';

	type CellTagsProps = {
		cell: SpecimenGridCell;
	};

	let { cell }: CellTagsProps = $props();

	let picker = $state<TagPicker>();
	let announcement = $state('');

	const breakpoints = $derived(project.breakpoints.breakpoints);

	// fluid and static projects only place tags on the root, so naming the
	// breakpoint would be noise
	const prefixed = $derived(
		project.type === 'standard' && breakpoints.length > 1
	);

	const labelOf = (breakpoint: Breakpoint, tag: Tag) =>
		prefixed ? formatTagLabel(breakpoint.name, tag.name) : tag.name;

	const placements = $derived(
		placementsAtCell(
			project.tags.tags,
			breakpoints,
			cell.laneId,
			cell.step
		)
	);

	const laneLabel = (lane: Lane | undefined) =>
		lane ? `${lane.family} ${lane.weight}` : 'Deleted lane';

	// steps repeat across lanes, so name the lane when there's more than one
	const where = $derived(
		project.lanes.lanes.length > 1
			? `step ${cell.step} of ${laneLabel(project.lanes.get(cell.laneId))}`
			: `step ${cell.step}`
	);

	// where a tag sits at a breakpoint right now
	const describe = (tag: Tag, breakpoint: Breakpoint) => {
		const resolved = resolvePlacement(tag, breakpoints, breakpoint.id);

		if (!resolved) {
			return 'Unplaced';
		}

		const where = `Step ${resolved.step} · ${laneLabel(project.lanes.get(resolved.laneId))}`;
		const from = project.breakpoints.get(resolved.breakpointId);

		return resolved.breakpointId === breakpoint.id || !from
			? where
			: `${where} via ${from.name.toLowerCase()}`;
	};

	// every breakpoint × tag pair not already placed here
	const choices = $derived(
		(prefixed ? breakpoints : breakpoints.slice(0, 1)).flatMap(
			(breakpoint) =>
				project.tags.tags
					.filter(
						(tag) =>
							!placements.some(
								(entry) =>
									entry.tag.id === tag.id &&
									entry.breakpoint.id === breakpoint.id
							)
					)
					.map((tag) => ({
						id: `${breakpoint.id}:${tag.id}`,
						tag,
						breakpoint
					}))
		)
	);

	const options = $derived(
		choices.map(({ id, tag, breakpoint }): TagOption => ({
			id,
			label: labelOf(breakpoint, tag),
			detail: describe(tag, breakpoint)
		}))
	);

	const assign = (tag: Tag, breakpoint: Breakpoint) => {
		project.tags.assign(
			tag.id,
			breakpoint.id,
			{ laneId: cell.laneId, step: cell.step },
			project.breakpointOrder
		);
		announcement = `Tagged ${where} as ${labelOf(breakpoint, tag)}.`;
	};

	const match = (option: TagOption, query: string) => {
		const choice = choices.find((entry) => entry.id === option.id);

		if (!choice) {
			return false;
		}

		return prefixed
			? matchesTagQuery(query, choice.breakpoint.name, choice.tag.name)
			: choice.tag.name.toLowerCase().includes(query.trim().toLowerCase());
	};

	const select = (id: string) => {
		const choice = choices.find((entry) => entry.id === id);

		if (choice) {
			assign(choice.tag, choice.breakpoint);
		}
	};

	// a query that would make a new tag, ex. "desktop/display"
	const parseNew = (query: string) => {
		// without breakpoints to choose from, a slash can't name one
		if (!prefixed && query.includes(TAG_SEPARATOR)) {
			return undefined;
		}

		const { breakpoint, name } = parseTagQuery(query, breakpoints);

		if (!breakpoint || !project.tags.canUseName(name)) {
			return undefined;
		}

		return { breakpoint, name };
	};

	const createLabel = (query: string) => {
		const parsed = parseNew(query);

		if (!parsed) {
			return undefined;
		}

		return prefixed
			? formatTagLabel(parsed.breakpoint.name, parsed.name)
			: parsed.name;
	};

	const create = (query: string) => {
		const parsed = parseNew(query);
		const tag =
			parsed && project.tags.create(parsed.name, parsed.breakpoint.id);

		if (parsed && tag) {
			assign(tag, parsed.breakpoint);
		}
	};

	const remove = (tag: Tag, breakpoint: Breakpoint) => {
		project.tags.unassign(tag.id, breakpoint.id, project.breakpointOrder);
		announcement = `Removed ${labelOf(breakpoint, tag)} from ${where}.`;
		// the button that had focus is gone
		picker?.focus();
	};
</script>

<div
	class="flex flex-row flex-wrap items-center gap-2 border-b border-black p-2"
>
	{#if placements.length > 0}
		<ul
			class="flex flex-row flex-wrap gap-2"
			aria-label={`Tags on ${where}`}
		>
			{#each placements as { tag, breakpoint } (`${breakpoint.id}:${tag.id}`)}
				<li
					class="inline-flex items-center border border-black bg-black pl-2 font-mono text-sm text-white"
				>
					{labelOf(breakpoint, tag)}
					<button
						type="button"
						class="ml-1 inline-flex size-6 items-center justify-center hover:bg-red-700 focus-visible:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-red-700 [&>svg]:size-4"
						aria-label={`Remove ${labelOf(breakpoint, tag)} from ${where}`}
						onclick={() => remove(tag, breakpoint)}
					>
						<X strokeWidth={1.5} />
					</button>
				</li>
			{/each}
		</ul>
	{/if}

	<TagPicker
		bind:this={picker}
		id={`tag-picker-${cell.laneId}-${cell.step}`}
		label={`Add a tag to ${where}`}
		{options}
		{match}
		{createLabel}
		onSelect={select}
		onCreate={create}
	/>

	<p class="sr-only" aria-live="polite">{announcement}</p>
</div>
