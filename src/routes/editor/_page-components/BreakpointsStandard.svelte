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
		project.createBreakpoint(newBreakpoint);
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

		<Dialog showModal={showCreator} onclose={closeCreator}>
			<BreakpointCreator oncreate={handleCreate} oncancel={closeCreator} />
		</Dialog>

		<ul class="flex w-full flex-col gap-4">
			{#each project.sortedBreakpoints as breakpoint (`breakpoint-${breakpoint.id}`)}
				<li class="w-full">
					<Breakpoint
						{breakpoint}
						canDelete={project.sortedBreakpoints.length > 1}
						onnamechange={(newName) =>
							project.updateBreakpointName(breakpoint.id, newName)}
						onwidthchange={(newWidth) =>
							project.updateBreakpointWidth(breakpoint.id, newWidth)}
						ondelete={() => project.deleteBreakpoint(breakpoint.id)}
						onduplicate={() => project.duplicateBreakpoint(breakpoint.id)}
					/>
				</li>
			{/each}
		</ul>
	</div>
</section>
