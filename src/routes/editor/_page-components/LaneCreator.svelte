<script lang="ts">
	import type { Lane } from '$lib/types';

	import Button from '$lib/ui/button/button.svelte';
	import Input from '$lib/ui/form/input.svelte';
	import Select from '$lib/ui/form/select.svelte';

	let lane = $state<Omit<Lane, 'id'>>({
		family: 'Arial',
		weight: '400',
		style: 'normal'
	});

	type LaneProps = {
		oncreate: (newLane: Omit<Lane, 'id'>) => void;
		oncancel: () => void;
	};

	let { oncreate, oncancel }: LaneProps = $props();
</script>

<div class="w-full border border-black bg-white">
	<div class="block">
		<header class="w-full overflow-hidden border-b p-4">
			<p
				class="w-full overflow-hidden text-5xl whitespace-nowrap"
				style:font-family={lane.family}
				style:font-weight={lane.weight}
				style:font-style={lane.style}
			>
				Lorem ipsum dolor sit amet consectetur adipisicing elit.
			</p>
		</header>
		<div class="grid grid-cols-[1fr_135px] gap-4 p-4">
			<div class="grid w-full grid-cols-3 gap-4">
				<div>
					<Input
						id="lane-family-creator"
						placeholder="ex. Mobile"
						class="w-full text-2xl font-bold"
						value={lane.family}
						oninput={(event) => (lane.family = event.currentTarget.value)}
					/>
					<label
						class="font-mono text-sm text-neutral-600 uppercase"
						for="lane-family-creator"
					>
						Font Family
					</label>
				</div>
				<div>
					<Input
						id="lane-weight-creator"
						placeholder="ex. Mobile"
						class="w-full text-2xl font-bold"
						value={lane.weight}
						oninput={(event) => (lane.weight = event.currentTarget.value)}
					/>
					<label
						class="font-mono text-sm text-neutral-600 uppercase"
						for="lane-weight-creator"
					>
						Font Weight
					</label>
				</div>
				<div>
					<Select
						class="w-full text-2xl font-bold"
						value={lane.style}
						onchange={(event) =>
							(lane.style = event.currentTarget.value as
								| 'normal'
								| 'italic'
								| 'oblique')}
					>
						<option value="normal">normal</option>
						<option value="italic">italic</option>
						<option value="oblique">oblique</option>
					</Select>
					<label
						class="font-mono text-sm text-neutral-600 uppercase"
						for="lane-weight-creator"
					>
						Font Style
					</label>
				</div>
			</div>
			<div>
				<ul class="flex flex-col items-start justify-start gap-2">
					<li class="w-full">
						<Button
							class="w-full py-2"
							label="Create"
							onclick={() => oncreate(lane)}
						/>
					</li>
					<li class="w-full">
						<Button
							class="w-full py-2"
							variant="destructive"
							label="Cancel"
							onclick={() => oncancel()}
						/>
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>
