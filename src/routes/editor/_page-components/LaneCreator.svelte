<script lang="ts">
	import Button from '$lib/ui/button/button.svelte';
	import Separator from '$lib/ui/display/separator.svelte';
	import Input from '$lib/ui/form/input.svelte';
	import Select from '$lib/ui/form/select.svelte';

	import {
		type CreateLaneErrors,
		createLaneValidator,
		type CreateLaneData,
		type OnCreateLaneData
	} from './create-lane';

	let lane = $state<CreateLaneData>({
		family: 'Arial',
		weight: '400',
		style: 'normal'
	});

	let errors = $state<CreateLaneErrors>({});

	type LaneProps = {
		oncreate: (newLane: OnCreateLaneData) => void;
		oncancel: () => void;
	};

	let { oncreate, oncancel }: LaneProps = $props();

	const onclickcreate = () => {
		const [_data, _errors] = createLaneValidator(lane);

		errors = _errors;

		if (!_data) {
			return;
		}

		oncreate(lane);

		lane = {
			family: 'Arial',
			weight: '400',
			style: 'normal'
		};

		return;
	};
</script>

<div class="w-full border border-black bg-white">
	<div class="block">
		<header class="w-full overflow-hidden border-b p-4">
			<p
				class="w-full overflow-hidden text-2xl whitespace-nowrap"
				style:font-family={lane.family}
				style:font-weight={lane.weight}
				style:font-style={lane.style}
			>
				Lorem ipsum dolor sit amet consectetur adipisicing elit.
			</p>
		</header>
		<ul class="grid grid-cols-3 gap-4 p-4">
			<li>
				<Separator as="label" for="lane-creator-family"
					>Font Family</Separator
				>
				<Input
					id="lane-creator-family"
					placeholder="ex. Times"
					class="w-full text-2xl font-bold"
					variant={errors.family ? 'error' : 'default'}
					value={lane.family}
					oninput={(event) => (lane.family = event.currentTarget.value)}
				/>

				{#if errors.family}
					<p class="text-red-800">
						{errors.family}
					</p>
				{/if}
			</li>
			<li>
				<Separator as="label" for="lane-creator-weight"
					>Font Weight</Separator
				>
				<Input
					id="lane-creator-weight"
					placeholder="ex. 400"
					class="w-full text-2xl font-bold"
					variant={errors.family ? 'error' : 'default'}
					value={lane.weight}
					oninput={(event) => (lane.weight = event.currentTarget.value)}
				/>
				{#if errors.weight}
					<p class="text-red-800">
						{errors.weight}
					</p>
				{/if}
			</li>
			<li>
				<Separator as="label" for="lane-creator-style"
					>Font Style</Separator
				>
				<Select
					id="lane-creator-style"
					class="w-full text-2xl font-bold"
					value={lane.style}
					variant={errors.family ? 'error' : 'default'}
					onchange={(event) =>
						(lane.style = event.currentTarget.value as
							'normal' | 'italic' | 'oblique')}
				>
					<option value="normal">normal</option>
					<option value="italic">italic</option>
					<option value="oblique">oblique</option>
				</Select>
				{#if errors.style}
					<p class="text-red-800">
						{errors.style}
					</p>
				{/if}
			</li>
			<li></li>
			<li>
				<Button
					class="w-full py-2"
					label="Create"
					onclick={onclickcreate}
				/>
			</li>
			<li>
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
