<script lang="ts">
	import { tick } from 'svelte';

	import type { Lane } from '#lib/types.js';

	import { MODULAR_SCALE_RATIOS } from '#lib/constants.js';
	import project from '#lib/stores/project.svelte.js';

	import InlineField, {
		inlineControlClass,
		inlineSegmentClass
	} from '#lib/ui/form/inline-field.svelte';

	type LaneScaleFieldsProps = {
		lane: Lane;
	};

	let { lane }: LaneScaleFieldsProps = $props();

	const CUSTOM = 'custom';

	const baseId = $derived(`lane-scale-${lane.id}-base`);
	const ratioId = $derived(`lane-scale-${lane.id}-ratio`);

	// a typed ratio that isn't a named interval shows as custom
	const presetOf = (ratio: number) =>
		MODULAR_SCALE_RATIOS.find(
			(entry) => entry.ratio === ratio
		)?.ratio.toString() ?? CUSTOM;

	// switched to Custom by hand, so a typed value that happens to match a
	// named interval keeps its input open instead of snapping back
	let pickedCustom = $state(false);

	const custom = $derived(pickedCustom || presetOf(lane.ratio) === CUSTOM);

	// half-typed or cleared inputs aren't sizes, so they leave the lane alone
	const update = (key: 'baseSize' | 'ratio', value: string) => {
		const number = Number(value);

		if (value !== '' && Number.isFinite(number) && number > 0) {
			project.lanes.update(lane.id, { [key]: number });
		}
	};

	const choosePreset = async (value: string) => {
		if (value === CUSTOM) {
			pickedCustom = true;
			await tick();
			document.getElementById(`${ratioId}-value`)?.focus();
			return;
		}

		pickedCustom = false;
		update('ratio', value);
	};
</script>

<ul class="flex flex-col gap-2">
	<li>
		<InlineField
			for={baseId}
			label="Base Size"
			suffix={project.fontSizeUnit}
		>
			<input
				id={baseId}
				class={[inlineControlClass, 'text-right']}
				type="number"
				value={lane.baseSize}
				min={0.001}
				step={0.05}
				oninput={(event) => update('baseSize', event.currentTarget.value)}
			/>
		</InlineField>
	</li>
	<li>
		<InlineField for={`${ratioId}-preset`} label="Ratio">
			<select
				id={`${ratioId}-preset`}
				class={[inlineControlClass, 'pr-8']}
				value={custom ? CUSTOM : presetOf(lane.ratio)}
				onchange={(event) => choosePreset(event.currentTarget.value)}
			>
				<option value={CUSTOM}>Custom</option>
				<optgroup label="Intervals">
					{#each MODULAR_SCALE_RATIOS as entry (entry.ratio)}
						<option value={entry.ratio.toString()}
							>{entry.label} ({entry.ratio})</option
						>
					{/each}
				</optgroup>
			</select>
			{#if custom}
				<input
					id={`${ratioId}-value`}
					aria-label="Ratio value"
					class={[inlineControlClass, inlineSegmentClass, 'text-right']}
					type="number"
					min={0.001}
					step={0.001}
					value={lane.ratio}
					oninput={(event) => update('ratio', event.currentTarget.value)}
				/>
			{/if}
		</InlineField>
	</li>
</ul>
