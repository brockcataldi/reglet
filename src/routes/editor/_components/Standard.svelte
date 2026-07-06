<script lang="ts">
	import project from '$lib/stores/project.svelte';

	import Breakpoint from './Breakpoint.svelte';
	import StandardBreakpointGraph from './StandardBreakpointGraph.svelte';
</script>

<main>
	<section class="w-full border-b border-black bg-sunburst-500 py-8">
		<div class="mx-auto my-0 max-w-250">
			<h1 class="mb-4 text-7xl font-bold tracking-tighter text-black">
				Breakpoints
			</h1>

			<ul class="grid w-full grid-cols-2 gap-4">
				{#each project.sortedBreakpoints as breakpoint (`breakpoint-${breakpoint.id}`)}
					<li class="w-full">
						<Breakpoint {breakpoint} />
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
			<StandardBreakpointGraph />
		</div>
	</section>
</main>
