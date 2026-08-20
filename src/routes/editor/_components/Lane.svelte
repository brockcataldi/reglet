<script lang="ts">
	import type { Lane } from '$lib/types';
	import Input from '$lib/ui/form/input.svelte';

	type LaneProps = {
		lane: Lane;
		onfamilychange: (newFamily: string) => void;
		onweightchange: (newWeight: string) => void;
	};

	let { lane, onfamilychange, onweightchange }: LaneProps = $props();
</script>

<div class="w-full border border-black bg-white">
	<div class="block p-4">
		<p style:font-family={lane.family} style:font-weight={lane.weight}>
			Lorem ipsum dolor sit amet consectetur adipisicing elit.
		</p>
		<div>
			<div>
				<Input
					id={`lane-family-${lane.id}`}
					placeholder="ex. Mobile"
					class="w-full text-4xl font-bold"
					value={lane.family}
					oninput={(event) => onfamilychange(event.currentTarget.value)}
				/>
				<label
					class="font-mono text-sm text-neutral-600 uppercase"
					for={`lane-family-${lane.id}`}
				>
					Font Family
				</label>
			</div>
			<div>
				<Input
					id={`lane-weight-${lane.id}`}
					placeholder="ex. Mobile"
					class="w-full text-4xl font-bold"
					value={lane.weight}
					oninput={(event) => onweightchange(event.currentTarget.value)}
				/>
				<label
					class="font-mono text-sm text-neutral-600 uppercase"
					for={`lane-weight-${lane.id}`}
				>
					Font Weight
				</label>
			</div>
		</div>
	</div>
</div>
