<script lang="ts">
	import type { Tag } from '#lib/types.js';

	import project from '#lib/stores/project.svelte.js';

	import Button from '#lib/ui/button/button.svelte';
	import Input from '#lib/ui/form/input.svelte';

	import TagRow from './TagRow.svelte';

	let name = $state('');
	let error = $state<string>();
	let announcement = $state('');

	// fluid and static projects only place on the root, so skip its name
	const prefixed = $derived(
		project.type === 'standard' &&
			project.breakpoints.breakpoints.length > 1
	);

	const describe = (tag: Tag) =>
		project.breakpoints.breakpoints.flatMap((breakpoint) => {
			const placement = tag.placements[breakpoint.id];

			if (!placement) {
				return [];
			}

			const lane = project.lanes.get(placement.laneId);
			const where = `step ${placement.step} · ${lane ? `${lane.family} ${lane.weight}` : 'deleted lane'}`;

			return [
				prefixed ? `${breakpoint.name.toLowerCase()}: ${where}` : where
			];
		});

	const add = (event: SubmitEvent) => {
		event.preventDefault();

		const root = project.breakpoints.root;
		error = project.tags.nameError(name);

		if (error !== undefined || !root) {
			return;
		}

		const tag = project.tags.create(name, root.id);

		if (tag) {
			announcement = `Added ${tag.name}. Place it from the Specimen View.`;
			name = '';
		}
	};
</script>

<section class="w-full border-black bg-white py-8">
	<div class="mx-auto my-0 max-w-200">
		<header>
			<h2 class="mb-4 text-6xl font-bold tracking-tighter text-black">
				Tags
			</h2>
		</header>

		{#if project.tags.tags.length === 0}
			<p class="mb-4 font-mono text-sm text-neutral-600">No tags yet.</p>
		{:else}
			<ul class="mb-6 flex w-full flex-col gap-4">
				{#each project.tags.tags as tag (tag.id)}
					<li class="w-full">
						<TagRow {tag} placements={describe(tag)} />
					</li>
				{/each}
			</ul>
		{/if}

		<form class="flex flex-row items-start gap-4" onsubmit={add}>
			<div class="w-64">
				<label
					for="new-tag-name"
					class="font-mono text-xs text-neutral-600 uppercase"
					>New tag</label
				>
				<Input
					id="new-tag-name"
					placeholder="ex. caption"
					variant={error ? 'error' : 'default'}
					aria-invalid={error !== undefined}
					aria-describedby={error ? 'new-tag-error' : undefined}
					bind:value={name}
					oninput={() => (error = undefined)}
				/>
				{#if error}
					<p
						id="new-tag-error"
						class="mt-1 font-mono text-xs text-red-800"
					>
						{error}
					</p>
				{/if}
			</div>
			<Button type="submit" label="Add Tag" class="mt-4" />
		</form>

		<p class="sr-only" aria-live="polite">{announcement}</p>
	</div>
</section>
