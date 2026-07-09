<script lang="ts">
	import project from '$lib/stores/project.svelte';

	import Breakpoint from './Breakpoint.svelte';
	import AddBreakpoint from './AddBreakpoint.svelte';
	import Button from '$lib/ui/button/button.svelte';
	import BreakpointGraph from './BreakpointGraph.svelte';

	let showAdd = $state(false);
</script>

<div>
	<section class="w-full border-b border-black bg-sunburst-500 py-8">
		<div class="mx-auto my-0 max-w-200">
			<header class="flex flex-row items-center justify-between">
				<h1 class="mb-4 text-7xl font-bold tracking-tighter text-black">
					Breakpoints
				</h1>

				{#if showAdd === false}
					<Button
						label="Add Breakpoint"
						variant="primary"
						onclick={() => {
							showAdd = !showAdd;
						}}
					/>
				{/if}
			</header>

			{#if showAdd}
				<AddBreakpoint
					onadd={(newBreakpoint) => {
						project.addBreakpoint(newBreakpoint);
						showAdd = false;
					}}
					oncancel={() => {
						showAdd = false;
					}}
				/>
				<hr class="my-4" />
			{/if}

			<ul class="flex w-full flex-col gap-4">
				{#each project.sortedBreakpoints as breakpoint (`breakpoint-${breakpoint.id}`)}
					<li class="w-full">
						<Breakpoint
							{breakpoint}
							onnamechange={(newName) =>
								project.updateBreakpointName(breakpoint.id, newName)}
							onwidthchange={(newWidth) =>
								project.updateBreakpointWidth(breakpoint.id, newWidth)}
							ondelete={() => project.deleteBreakpoint(breakpoint.id)}
							onduplicate={() =>
								project.duplicateBreakpoint(breakpoint.id)}
						/>
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<section class="w-full py-8">
		<div class="mx-auto my-0 max-w-200">
			<h2 class="text-6xl font-bold tracking-tighter text-black">
				Visualizer
			</h2>
			<BreakpointGraph />
		</div>
	</section>
</div>
