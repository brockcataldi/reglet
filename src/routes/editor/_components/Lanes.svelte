<script lang="ts">
	import project from '$lib/stores/project.svelte';
	import Lane from './Lane.svelte';
</script>

<section class="w-full border-black bg-white py-8">
	<div class="mx-auto my-0 max-w-200">
		<header class="flex flex-row items-center justify-between">
			<h2 class="mb-4 text-5xl font-bold tracking-tighter text-black">
				Lanes
			</h2>
		</header>
		<ul class="flex w-full flex-col gap-4">
			{#each project.lanes as lane (`lane-${lane.id}`)}
				<li class="w-full">
					<Lane
						{lane}
						onfamilychange={(newFamily) =>
							project.updateLaneFamily(lane.id, newFamily)}
						onweightchange={(newWeight) =>
							project.updateLaneWeight(lane.id, newWeight)}
					/>
				</li>
			{/each}
		</ul>
	</div>
</section>
