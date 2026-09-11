<script lang="ts">
	import { type Lane as TLane } from '$lib/types';

	import project from '$lib/stores/project.svelte';

	import Button from '$lib/ui/button/button.svelte';
	import Dialog from '$lib/ui/display/dialog.svelte';

	import Lane from './Lane.svelte';
	import LaneCreator from './LaneCreator.svelte';

	let showCreator = $state(false);

	const openCreator = () => {
		showCreator = true;
	};

	const closeCreator = () => {
		showCreator = false;
	};

	const handleCreate = (newLane: Omit<TLane, 'id'>) => {
		project.createLane(newLane);
		showCreator = false;
	};
</script>

<section class="w-full border-black bg-white py-8">
	<div class="mx-auto my-0 max-w-200">
		<header class="flex flex-row items-center justify-between">
			<h2 class="mb-4 text-6xl font-bold tracking-tighter text-black">
				Lanes
			</h2>

			<Button label="Add Lane" variant="primary" onclick={openCreator} />

			<Dialog showModal={showCreator} onclose={closeCreator}>
				<LaneCreator oncreate={handleCreate} oncancel={closeCreator} />
			</Dialog>
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
						onstylechange={(newStyle) =>
							project.updateLaneStyle(lane.id, newStyle)}
						ondelete={() => project.deleteLane(lane.id)}
						onduplicate={() => project.duplicateLane(lane.id)}
					/>
				</li>
			{/each}
		</ul>
	</div>
</section>
