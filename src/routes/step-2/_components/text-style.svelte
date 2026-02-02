<script lang="ts">
	import {
		type Face,
		type Family,
		type OpticalSize,
		type Stretch,
		type Style,
		type TextStyle,
		type Weight
	} from '$lib/types';

	import fonts from '$lib/stores/fonts.svelte';

	import { swapWeight } from '../_functions/swap-weight';

	import Select from '$lib/components/select.svelte';
	import FontStyle from './fields/font-style.svelte';
	import FontWeight from './fields/font-weight.svelte';
	import FontStretch from './fields/font-stretch.svelte';
	import FontOpticalSize from './fields/font-optical-size.svelte';

	type Props = {
		style: TextStyle;
	};

	let { style = $bindable() }: Props = $props();

	let id = $state<string>(style.family);
	let selectedFamily = $derived<Family | null>(fonts.families.find((f) => f.id === id) ?? null);

	let selectedStyles = $derived(
		selectedFamily?.faces
			.map((f) => f.style)
			.filter((style, index, self) => self.indexOf(style) === index) ??
			([] as Style[])
	);

	let selectedFaces = $derived(
		selectedFamily?.faces.filter((f) => f.style === style.style) ?? ([] as Face[])
	);

	type SelectedAggregate = {
		weight: Weight[];
		stretch: Stretch[];
		opticalSize: OpticalSize[];
	}

	type Selected = {
		weight: Weight | Weight[];
		stretch: Stretch | Stretch[];
		opticalSize: OpticalSize | OpticalSize[];
	}

	let selectedWeights = $derived.by<Weight | Weight[]>(() => {
		const weights = selectedFaces
			.map((f) => f.weight)
			.filter((weight, index, self) => self.indexOf(weight) === index);

		if (weights.length === 1) {
			return weights[0];
		}

		return weights;
	});

	let selectedStretches = $derived.by<Stretch | Stretch[]>(() => {
		const stretches = selectedFaces
			.map((f) => f.stretch)
			.filter((stretch, index, self) => self.indexOf(stretch) === index);

		if (stretches.length === 1) {
			return stretches[0];
		}

		return stretches;
	});

	let selectedOpticalSizes = $derived.by<OpticalSize | OpticalSize[]>(() => {
		const opticalSizes = selectedFaces
			.map((f) => f.opticalSize)
			.filter((opticalSize, index, self) => self.indexOf(opticalSize) === index);

		if (opticalSizes.length === 1) {
			return opticalSizes[0];
		}

		return opticalSizes;
	});

	function handleFamilyChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		const value = target.value;

		id = value;
		style.family = value;

		if(selectedStyles instanceof Array) {
			if (selectedStyles.length > 0 && !selectedStyles.includes(style.style)) {
				style.style = selectedStyles[0];
			}
		} else {
				style.style = selectedStyles;
		}

		style.weight = swapWeight(style.weight, selectedWeights);

		if(selectedOpticalSizes instanceof Array) {
			if (selectedOpticalSizes.length > 0 && !selectedOpticalSizes.includes(style.opticalSize)) {
				style.opticalSize = selectedOpticalSizes[0];
			}
		} else {
				style.opticalSize = selectedOpticalSizes;
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
		<div class="grid grid-cols-2 gap-4">
			<Select
				id="family"
				label="Family"
				bind:value={id}
				onchange={handleFamilyChange}
			>
				<option value="" disabled>Select a family</option>
				{#each fonts.families as family (family.id)}
					<option value={family.id}>{family.family}</option>
				{/each}
			</Select>
			{#if id !== ''}
				<FontStyle bind:style={style.style} {selectedStyles} />
				<FontWeight bind:weight={style.weight} {selectedWeights} />
				<FontStretch bind:stretch={style.stretch} {selectedStretches} />
				<FontOpticalSize bind:opticalSize={style.opticalSize} {selectedOpticalSizes} />
			{/if}
		</div>
	</div>
</div>
<pre>{JSON.stringify(style, null, 2)}</pre>
<pre>{JSON.stringify(selectedFaces, null, 2)}</pre>
