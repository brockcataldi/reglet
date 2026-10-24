<script lang="ts">
	import { type Lane as TLane } from '#lib/types.js';

	import project from '#lib/stores/project.svelte.js';

	import Button from '#lib/ui/button/button.svelte';
	import Dialog from '#lib/ui/display/dialog.svelte';

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
		project.lanes.create(newLane);
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

			<Dialog showModal={showCreator} onClose={closeCreator}>
				<LaneCreator onCreate={handleCreate} onCancel={closeCreator} />
			</Dialog>
		</header>
		<ul class="flex w-full flex-col gap-4">
			{#each project.lanes.lanes as lane (`lane-${lane.id}`)}
				<li class="w-full">
					<Lane
						{lane}
						onFamilyChange={(newFamily) =>
							project.lanes.updateValue(lane.id, 'family', newFamily)}
						onWeightChange={(newWeight) =>
							project.lanes.updateValue(lane.id, 'weight', newWeight)}
						onStyleChange={(newStyle) =>
							project.lanes.updateValue(lane.id, 'style', newStyle)}
						onDelete={() => project.lanes.delete(lane.id)}
						onDuplicate={() => project.lanes.duplicate(lane.id)}
					/>
				</li>
			{/each}
		</ul>
	</div>
</section>
