<script lang="ts">
	import project from '$lib/stores/project.svelte';

	import Breakpoint from './Breakpoint.svelte';
	import BreakpointCreator from './BreakpointCreator.svelte';
	import Button from '$lib/ui/button/button.svelte';

	let creatorVisible = $state(false);

	const openAdd = () => (creatorVisible = true);
	const hideAdd = () => (creatorVisible = false);
</script>

<section class="w-full border-y border-black py-8">
	<div class="mx-auto my-0 max-w-200">
		<header class="flex flex-row items-center justify-between">
			<h2 class="mb-4 text-6xl font-bold tracking-tighter text-black">
				Breakpoints
			</h2>

			{#if creatorVisible === false}
				<Button
					label="Add Breakpoint"
					variant="primary"
					onclick={openAdd}
				/>
			{/if}
		</header>

		{#if creatorVisible}
			<BreakpointCreator
				oncreate={(newBreakpoint) => {
					project.createBreakpoint(newBreakpoint);
					creatorVisible = false;
				}}
				oncancel={hideAdd}
			/>
			<hr class="my-4" />
		{/if}

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
