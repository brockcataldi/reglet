<script lang="ts">
	import { resolve } from '$app/paths';

	import { formatBreakpointLabel } from '$lib/utilities';

	import project from '$lib/stores/project.svelte';
	import settings from '$lib/stores/settings.svelte';

	import Button from '$lib/ui/button/button.svelte';
	import StandardBreakpointGraph from './StandardBreakpointGraph.svelte';
</script>

<main class="pt-8">
	<div class="mx-auto my-0 max-w-200">
        <StandardBreakpointGraph />

		<section class="w-full py-4">
			<ul class="grid w-full grid-cols-3 gap-4">
				{#each project.sortedBreakpoints as breakpoint (`breakpoint-${breakpoint.id}`)}
					<li class="w-full border border-black">
						<a
							class="group block p-4
                            hover:bg-cobalt-500 hover:text-white
                            focus-visible:bg-cobalt-500 focus-visible:text-white"
							href={resolve(`/editor/${breakpoint.id}`)}
						>
							<h2 class="font-mono text-3xl font-bold">
								{formatBreakpointLabel(breakpoint.width)}
							</h2>

							<ul>
								{#each breakpoint.lanes as lane (`breakpoint-${breakpoint.id}-lane-${lane.id}`)}
									<li>
										<p class="font-mono">
											{lane.font.family} //
											<span
												class="text-cobalt-500 group-focus-within:text-white group-hover:text-white"
											>
												{lane.scale.baseSize}{settings.unit} @ {lane.scale
													.ratio}
											</span>
										</p>
									</li>
								{/each}
							</ul>
						</a>
						<div class="grid grid-cols-2">
							<Button label="Edit" class="border-b-0 border-l-0" />
							<Button
								variant="destructive"
								label="Delete"
								class="border-x-0 border-b-0"
								onclick={() => project.deleteBreakpoint(breakpoint.id)}
							/>
						</div>
					</li>
				{/each}
			</ul>
		</section>
	</div>
</main>
