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

	// every breakpoint × tag pair not already on this specimen, inherited or not
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

	const BREAKPOINT_OPTION = 'breakpoint:';

	// with several breakpoints, the list starts at the breakpoints and choosing
	// one narrows it to that breakpoint's tags, rather than every pair at once
	const breakpointOptions = $derived(
		prefixed
			? breakpoints.map((breakpoint): TagOption => {
					const count = choices.filter(
						(choice) => choice.breakpoint.id === breakpoint.id
					).length;

					return {
						id: `${BREAKPOINT_OPTION}${breakpoint.id}`,
						label: `${breakpoint.name.toLowerCase()}${TAG_SEPARATOR}`,
						detail: `${count} ${count === 1 ? 'tag' : 'tags'}`,
						complete: `${breakpoint.name.toLowerCase()}${TAG_SEPARATOR}`
					};
				})
			: []
	);

	const options = $derived([
		...breakpointOptions,
		...choices.map(({ id, tag, breakpoint }): TagOption => ({
			id,
			label: labelOf(breakpoint, tag),
			detail: describe(tag, breakpoint)
		}))
	]);

	// still typing a breakpoint, ex. "tab" on the way to "tablet/"
	const namesBreakpoint = (query: string) => {
		const normalized = query.trim().toLowerCase();

		return (
			!normalized.includes(TAG_SEPARATOR) &&
			breakpoints.some((breakpoint) =>
				breakpoint.name.toLowerCase().startsWith(normalized)
			)
		);
	};

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
		if (option.id.startsWith(BREAKPOINT_OPTION)) {
			return namesBreakpoint(query);
		}

		// a bare tag name that isn't a breakpoint skips straight to tags
		if (prefixed && namesBreakpoint(query)) {
			return false;
		}

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
		if (prefixed && namesBreakpoint(query)) {
			return undefined;
		}

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

	const chipId = (breakpoint: Breakpoint, tag: Tag) =>
		`tag-chip-${cell.laneId}-${cell.step}-${breakpoint.id}-${tag.id}`;

	// briefly marks the chip an inherited chip jumped to, so mouse users can
	// see where focus landed
	let highlighted = $state<string>();
	let highlightTimer: ReturnType<typeof setTimeout> | undefined;

	// an inherited chip's source is the same tag placed directly at a lower
	// breakpoint, which always sits on this specimen too
	const jumpToSource = (tag: Tag, from: Breakpoint) => {
		const id = chipId(from, tag);
		document.getElementById(id)?.focus();

		clearTimeout(highlightTimer);
		highlighted = id;
		highlightTimer = setTimeout(() => (highlighted = undefined), 1200);
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
			{#each placements as { tag, breakpoint, inherited, from } (`${breakpoint.id}:${tag.id}`)}
				{#if inherited}
					<li class="inline-flex">
						<button
							type="button"
							class="inline-flex min-h-[26px] cursor-pointer items-center border border-dashed border-neutral-400 px-2 font-mono text-sm text-neutral-500 hover:border-cobalt-500 hover:text-cobalt-500 focus-visible:border-cobalt-500 focus-visible:text-cobalt-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt-500"
							title={`Inherited from ${formatTagLabel(from.name, tag.name)}`}
							aria-label={`${labelOf(breakpoint, tag)}, inherited from ${formatTagLabel(from.name, tag.name)}. Go to ${formatTagLabel(from.name, tag.name)}`}
							onclick={() => jumpToSource(tag, from)}
						>
							{labelOf(breakpoint, tag)}
						</button>
					</li>
				{:else}
					<li class="inline-flex">
						<button
							id={chipId(breakpoint, tag)}
							type="button"
							class:ring-2={highlighted === chipId(breakpoint, tag)}
							class:ring-cobalt-500={highlighted ===
								chipId(breakpoint, tag)}
							class:ring-offset-2={highlighted === chipId(breakpoint, tag)}
							class="inline-flex min-h-[26px] cursor-pointer items-center gap-1 border border-black bg-black pr-1 pl-2 font-mono text-sm text-white hover:border-red-700 hover:bg-red-700 focus-visible:border-red-700 focus-visible:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 [&>svg]:size-4 [&>svg]:shrink-0"
							aria-label={`Remove ${labelOf(breakpoint, tag)} from ${where}`}
							onclick={() => remove(tag, breakpoint)}
						>
							{labelOf(breakpoint, tag)}
							<X strokeWidth={1.5} aria-hidden="true" />
						</button>
					</li>
				{/if}
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
