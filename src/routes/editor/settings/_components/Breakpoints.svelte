<script lang="ts">
	import { Plus } from '@lucide/svelte';

	import project from '#lib/stores/project.svelte.js';

	import Button from '#lib/ui/button/button.svelte';
	import Separator from '#lib/ui/display/separator.svelte';
	import Input from '#lib/ui/form/input.svelte';

	import BreakpointRow from './BreakpointRow.svelte';

	let nameInput = $state<HTMLInputElement>();
	let name = $state('');
	let width = $state<number | null>(null);
	let error = $state<string>();
	let announcement = $state('');

	const remove = (id: string, removedName: string) => {
		project.removeBreakpoint(id);
		announcement = `Removed ${removedName} and the tag placements on it.`;
		// the row that had focus is gone
		nameInput?.focus();
	};

	const add = (event: SubmitEvent) => {
		event.preventDefault();

		if (width === null || !Number.isFinite(width)) {
			error = 'Breakpoints need a width.';
			return;
		}

		error = project.breakpointError({ add: { name: name.trim(), width } });

		if (error !== undefined) {
			return;
		}

		const created = project.addBreakpoint(name, width);

		if (created) {
			announcement = `Added ${created.name} at ${created.width}px.`;
			name = '';
			width = null;
		}
	};
</script>

<section class="w-full border-black bg-white py-8">
	<div class="mx-auto my-0 max-w-200">
		<header>
			<h2 class="mb-1 text-6xl font-bold tracking-tighter text-black">
				Breakpoints
			</h2>
			<p class="mb-4 text-sm text-neutral-600">
				{#if project.type === 'fluid'}
					Sizes interpolate between the min and max widths.
				{:else}
					Mobile first. Removing a breakpoint also removes the tag
					placements on it; the tags themselves stay.
				{/if}
			</p>
		</header>

		<ol class="mb-6 flex w-full flex-col gap-4">
			{#each project.breakpoints.breakpoints as breakpoint, index (breakpoint.id)}
				<li class="w-full">
					<BreakpointRow
						{breakpoint}
						root={index === 0}
						onRemove={() => remove(breakpoint.id, breakpoint.name)}
					/>
				</li>
			{/each}
		</ol>

		{#if project.type === 'standard'}
			<form class="flex flex-row items-end gap-4" onsubmit={add}>
				<div class="flex-1">
					<Separator as="label" for="new-breakpoint-name"
						>New breakpoint</Separator
					>
					<Input
						bind:ref={nameInput}
						id="new-breakpoint-name"
						placeholder="ex. Wide"
						variant={error ? 'error' : 'default'}
						aria-invalid={error !== undefined}
						aria-describedby={error ? 'new-breakpoint-error' : undefined}
						bind:value={name}
						oninput={() => (error = undefined)}
					/>
				</div>
				<div class="w-32">
					<Separator as="label" for="new-breakpoint-width"
						>Width (px)</Separator
					>
					<Input
						id="new-breakpoint-width"
						type="number"
						min="0"
						step="1"
						placeholder="ex. 1600"
						variant={error ? 'error' : 'default'}
						aria-invalid={error !== undefined}
						aria-describedby={error ? 'new-breakpoint-error' : undefined}
						bind:value={width}
						oninput={() => (error = undefined)}
					/>
				</div>
				<Button type="submit" label="Add Breakpoint" icon={Plus} />
			</form>
			{#if error}
				<p id="new-breakpoint-error" class="mt-1 text-xs text-red-800">
					{error}
				</p>
			{/if}
		{/if}

		<p class="sr-only" aria-live="polite">{announcement}</p>
	</div>
</section>
