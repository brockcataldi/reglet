<script lang="ts">
	import { toFontVariationSettings } from '#lib/domain/fonts/to-font-variation-settings.js';
	import { Check, X } from '@lucide/svelte';

	import Button from '#lib/ui/button/button.svelte';

	import TypeSettingFields from './TypeSettingFields.svelte';
	import {
		type CreateLaneErrors,
		createLaneValidator,
		type CreateLaneData,
		type OnCreateLaneData
	} from './LaneCreator';

	const initialLane = (): CreateLaneData => ({
		family: 'Arial',
		weight: '400',
		style: 'normal'
	});

	let lane = $state<CreateLaneData>(initialLane());

	let errors = $state<CreateLaneErrors>({});

	type LaneProps = {
		onCreate: (newLane: OnCreateLaneData) => void;
		onCancel: () => void;
	};

	let { onCreate, onCancel }: LaneProps = $props();

	const onClickCreate = () => {
		const [_data, _errors] = createLaneValidator(lane);

		errors = _errors;

		if (!_data) {
			return;
		}

		onCreate({
			...$state.snapshot(lane),
			overrides: {},
			baseSize: 1,
			ratio: 1.2,
			minStep: -1,
			maxStep: 6
		});

		lane = initialLane();
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
				style:font-variation-settings={toFontVariationSettings(
					lane.variationSettings
				)}
			>
				Lorem ipsum dolor sit amet consectetur adipisicing elit.
			</p>
		</header>
		<div class="flex flex-col gap-4 p-4">
			<TypeSettingFields
				idPrefix="lane-creator"
				setting={lane}
				{errors}
				onChange={(patch) => Object.assign(lane, patch)}
			/>
			<ul class="grid grid-cols-3 gap-4">
				<li></li>
				<li>
					<Button
						class="w-full py-2"
						label="Create"
						icon={Check}
						onclick={onClickCreate}
					/>
				</li>
				<li>
					<Button
						class="w-full py-2"
						scheme="destructive"
						label="Cancel"
						icon={X}
						onclick={() => onCancel()}
					/>
				</li>
			</ul>
		</div>
	</div>
</div>
