<script lang="ts">
	import {
		type Face,
		type Family,
		type OpticalSize,
		type Stretch,
		type Style,
		type TextStyle,
		type VariationSetting,
		type Weight,
		uniqueOpticalSizes,
		uniqueStretches,
		uniqueVariationSettings,
		uniqueWeights
	} from '$lib/types';

	import fonts from '$lib/stores/fonts.svelte';

	import { swapWeight } from '../_functions/swap-weight';

	import Select from '$lib/components/select.svelte';
	import FontStyle from './fields/font-style.svelte';
	import FontWeight from './fields/font-weight.svelte';
	import FontStretch from './fields/font-stretch.svelte';
	import FontOpticalSize from './fields/font-optical-size.svelte';

	type Props = {
		id: string;
		style: TextStyle;
	};

	let { id, style = $bindable() }: Props = $props();

	let selectedId = $state<string>(style.family);

	let selectedFamily = $derived<Family | null>(
		fonts.families.find((f) => f.id === selectedId) ?? null
	);

	let selectedStyles = $derived(
		selectedFamily?.faces
			.map((f) => f.style)
			.filter((style, index, self) => self.indexOf(style) === index) ??
			([] as Style[])
	);

	let selectedFaces = $derived(
		selectedFamily?.faces.filter((f) => f.style === style.style) ??
			([] as Face[])
	);

	type Selected = {
		weight: Weight[];
		stretch: Stretch[];
		opticalSize: OpticalSize[];
		variationSettings: VariationSetting[];
	};

	let selected = $derived.by(() => {
		const aggregated = selectedFaces.reduce(
			(acc: Selected, face: Face) => {
				acc.weight.push(face.weight);
				acc.stretch.push(face.stretch);
				acc.opticalSize.push(face.opticalSize);
				acc.variationSettings.push(...face.variationSettings);
				return acc;
			},
			{
				weight: [],
				stretch: [],
				opticalSize: [],
				variationSettings: []
			}
		);

		return {
			weight: uniqueWeights(aggregated.weight),
			stretch: uniqueStretches(aggregated.stretch),
			opticalSize: uniqueOpticalSizes(aggregated.opticalSize),
			variationSettings: uniqueVariationSettings(aggregated.variationSettings)
		};
	});

	function handleFamilyChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		const value = target.value;

		selectedId = value;
		style.family = value;

		if (selectedStyles.length > 0 && !selectedStyles.includes(style.style)) {
			style.style = selectedStyles[0];
		}

		style.weight = swapWeight(style.weight, selected.weight);

		if (
			selected.opticalSize.length > 0 &&
			!selected.opticalSize.includes(style.opticalSize)
		) {
			style.opticalSize = selected.opticalSize[0];
		}
	}
</script>

<div>
	<p
		class="mb-4 text-6xl"
		style:font-family={`"${selectedFamily?.family}"`}
		style:font-style={style.style}
		style:font-weight={style.weight}
	>
		Lorem Ipsum dolor
	</p>
	<div>
		<div class="grid grid-cols-3 gap-4">
			<Select
				id="family"
				label="Family"
				bind:value={selectedId}
				onchange={handleFamilyChange}
			>
				<option value="" disabled>Select a family</option>
				{#each fonts.families as family (family.id)}
					<option value={family.id}>{family.family}</option>
				{/each}
			</Select>

			{#if selectedId !== ''}
				<FontStyle {id} bind:style={style.style} {selectedStyles} />
				<FontWeight {id} bind:weight={style.weight} weights={selected.weight} />

				{#if selected.stretch.length > 1}
					<FontStretch
						{id}
						bind:stretch={style.stretch}
						stretches={selected.stretch}
					/>
				{/if}

				{#if selected.opticalSize.length > 1}
					<FontOpticalSize
						{id}
						bind:opticalSize={style.opticalSize}
						opticalSizes={selected.opticalSize}
					/>
				{/if}
			{/if}
		</div>
	</div>
</div>
<pre>{JSON.stringify(style, null, 2)}</pre>
<pre>{JSON.stringify(selected, null, 2)}</pre>
