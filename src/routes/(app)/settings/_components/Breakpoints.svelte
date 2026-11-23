<script lang="ts">
	import { Plus } from '@lucide/svelte';

	import type { Breakpoint } from '#lib/types.js';

	import project from '#lib/stores/project.svelte.js';

	import Button from '#lib/ui/button/button.svelte';
	import Dialog from '#lib/ui/display/dialog.svelte';

	import BreakpointCreator from './BreakpointCreator.svelte';
	import BreakpointRow from './BreakpointRow.svelte';

	let showCreator = $state(false);
	let announcement = $state('');

	const closeCreator = () => {
		showCreator = false;
	};

	const handleCreate = (created: Breakpoint) => {
		announcement = `Added ${created.name} at ${created.width}px.`;
		showCreator = false;
	};

	const remove = (id: string, removedName: string) => {
		project.removeBreakpoint(id);
		announcement = `Removed ${removedName} and the tag placements on it.`;
		// the row that had focus is gone
		document.getElementById('add-breakpoint')?.focus();
	};
</script>

<section class="w-full border-black bg-white py-8">
	<div class="mx-auto my-0 max-w-200">
		<header class="mb-4 flex flex-row items-center justify-between">
			<h2 class="mb-1 text-6xl font-bold tracking-tighter text-black">
				Breakpoints
			</h2>

			{#if project.type === 'standard'}
				<Button
					id="add-breakpoint"
					label="Add Breakpoint"
					icon={Plus}
					scheme="primary"
					onclick={() => (showCreator = true)}
				/>

				<Dialog showModal={showCreator} onClose={closeCreator}>
					{#if showCreator}
						<BreakpointCreator
							onCreate={handleCreate}
							onCancel={closeCreator}
						/>
					{/if}
				</Dialog>
			{/if}
		</header>

		<ol class="flex w-full flex-col gap-4">
			{#each project.breakpoints.breakpoints as breakpoint, index (breakpoint.id)}
				<li class="w-full border border-black bg-white p-4">
					<BreakpointRow
						{breakpoint}
						root={index === 0}
						onRemove={() => remove(breakpoint.id, breakpoint.name)}
					/>
				</li>
			{/each}
		</ol>

		<p class="sr-only" aria-live="polite">{announcement}</p>
	</div>
</section>
