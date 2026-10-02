<script lang="ts">
	import type { Breakpoint as TBreakpoint } from '$lib/types';
	import project from '$lib/stores/project.svelte';

	import Breakpoint from './Breakpoint.svelte';
	import BreakpointCreator from './BreakpointCreator.svelte';
	import Button from '$lib/ui/button/button.svelte';
	import Dialog from '$lib/ui/display/dialog.svelte';

	let showCreator = $state(false);

	const openCreator = () => {
		showCreator = true;
	};

	const closeCreator = () => {
		showCreator = false;
	};

	const handleCreate = (newBreakpoint: Omit<TBreakpoint, 'id'>) => {
		project.breakpoints.create(newBreakpoint);
		showCreator = false;
	};
</script>

<section class="w-full border-y border-black py-8">
	<div class="mx-auto my-0 max-w-200">
		<header class="flex flex-row items-center justify-between">
			<h2 class="mb-4 text-6xl font-bold tracking-tighter text-black">
				Breakpoints
			</h2>

			<Button
				label="Add Breakpoint"
				variant="primary"
				onclick={openCreator}
			/>
		</header>

		<Dialog showModal={showCreator} onClose={closeCreator}>
			<BreakpointCreator onCreate={handleCreate} onCancel={closeCreator} />
		</Dialog>

		<ul class="flex w-full flex-col gap-4">
			{#each project.breakpoints.sorted as breakpoint (`breakpoint-${breakpoint.id}`)}
				<li class="w-full">
					<Breakpoint
						{breakpoint}
						canDelete={project.breakpoints.sorted.length > 1}
						onLabelChange={(newLabel) =>
							project.breakpoints.updateValue(
								breakpoint.id,
								'label',
								newLabel
							)}
						onWidthChange={(newWidth) =>
							project.breakpoints.updateValue(
								breakpoint.id,
								'width',
								newWidth
							)}
						onDelete={() => project.breakpoints.delete(breakpoint.id)}
						onDuplicate={() =>
							project.breakpoints.duplicate(breakpoint.id)}
					/>
				</li>
			{/each}
		</ul>
	</div>
</section>
