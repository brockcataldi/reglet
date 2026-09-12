<script lang="ts">
	import type { Lane } from '$lib/types';
	import Button from '$lib/ui/button/button.svelte';
	import Input from '$lib/ui/form/input.svelte';
	import Select from '$lib/ui/form/select.svelte';

	type LaneProps = {
		lane: Lane;
		onFamilyChange: (newFamily: string) => void;
		onWeightChange: (newWeight: string) => void;
		onStyleChange: (newStyle: 'normal' | 'italic' | 'oblique') => void;
		onDuplicate: () => void;
		onDelete: () => void;
	};

	let {
		lane,
		onFamilyChange,
		onWeightChange,
		onStyleChange,
		onDuplicate,
		onDelete
	}: LaneProps = $props();
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
						id={`lane-family-${lane.id}`}
						placeholder="ex. Mobile"
						class="w-full text-2xl font-bold"
						value={lane.family}
						oninput={(event) => onFamilyChange(event.currentTarget.value)}
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
						class="w-full text-2xl font-bold"
						value={lane.weight}
						oninput={(event) => onWeightChange(event.currentTarget.value)}
					/>
					<label
						class="font-mono text-sm text-neutral-600 uppercase"
						for={`lane-weight-${lane.id}`}
					>
						Font Weight
					</label>
				</div>
				<div>
					<Select
						class="w-full text-2xl font-bold"
						value={lane.style}
						onchange={(event) =>
							onStyleChange(
								event.currentTarget.value as
									'normal' | 'italic' | 'oblique'
							)}
					>
						<option value="normal">normal</option>
						<option value="italic">italic</option>
						<option value="oblique">oblique</option>
					</Select>
					<label
						class="font-mono text-sm text-neutral-600 uppercase"
						for={`lane-weight-${lane.id}`}
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
							label="Duplicate"
							onclick={() => onDuplicate()}
						/>
					</li>
					<li class="w-full">
						<Button
							class="w-full py-2"
							variant="destructive"
							label="Delete"
							onclick={() => onDelete()}
						/>
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>
