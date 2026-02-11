<script lang="ts">
	import {
		isAxis,
		isVariationAxis,
		type Face,
		type WeightValue
	} from '$lib/types';

	import Range from '$lib/components/range.svelte';

	type Props = {
		family: string;
		face: Face;
	};

	let { family, face }: Props = $props();

	let weight = $state<WeightValue>(400);
	let axes = $state<Record<string, number>>({});

	$effect(() => {
		if (!isAxis(face.weight)) {
			weight = face.weight;
		} else {
			weight = Math.floor(
				(face.weight.max - face.weight.min) / 2 + face.weight.min
			);
		}

		axes = face.variationSettings.reduce((a, vs): Record<string, number> => {
			if (isVariationAxis(vs)) {
				a[vs.name] = Math.floor((vs.max - vs.min) / 2 + vs.min);
			}
			return a;
		}, {});
	});

	const variationSettings = $derived.by(() => {
		return Object.entries(axes)
			.map(([name, value]) => `"${name}" ${value}`)
			.join(',');
	});
</script>

<li class="w-full">
	<p
		class="w-full text-4xl"
		style:font-family={family}
		style:font-style={face.style}
		style:font-optical-sizing={face.opticalSizing}
		style:font-stretch={typeof face.stretch === 'string'
			? face.stretch
			: `${face.stretch}%`}
		style:font-weight={weight}
		style:font-variation-settings={variationSettings}
	>
		Lorem Ipsum Sit Dolor
	</p>

	<div class="pt-2">
		<ul class="flex flex-row items-center justify-start gap-4">
			<li>
				<h3 class="text-xs">Font Style</h3>
				<p>{face.style}</p>
			</li>
			<li>
				<h3 class="text-xs">Font Weight</h3>
				{#if !isAxis(face.weight)}
					<p>{face.weight}</p>
				{:else}
					<p>{face.weight.min} to {face.weight.max}</p>
				{/if}
			</li>
			<li>
				<h3 class="text-xs">Font Stretch</h3>
				<p>
					{typeof face.stretch === 'string' ? face.stretch : `${face.stretch}%`}
				</p>
			</li>
			<li>
				<h3 class="text-xs">Font Optical Sizing</h3>
				<p>{face.opticalSizing}</p>
			</li>

			{#each face.variationSettings as variationSetting (variationSetting.id)}
				<li>
					<h3 class="text-xs">{variationSetting.name} Axis</h3>
					{#if isVariationAxis(variationSetting)}
						<p>{variationSetting.min} to {variationSetting.max}</p>
					{:else}
						<p>{variationSetting.value}</p>
					{/if}
				</li>
			{:else}
				<li>
					<h3 class="text-xs">Extra Axes</h3>
					<p>None</p>
				</li>
			{/each}
		</ul>

		{#if isAxis(face.weight)}
			<Range
				label="Font Weight"
				id={`${face.id}-weight`}
				bind:value={weight}
				min={face.weight.min}
				max={face.weight.max}
				step={1}
			/>
		{/if}

		{#each face.variationSettings as variationSetting (variationSetting.id)}
			{#if isVariationAxis(variationSetting)}
				<Range
					label={`${variationSetting.name}`}
					id={`${variationSetting.id}}`}
					bind:value={axes[variationSetting.name]}
					min={variationSetting.min}
					max={variationSetting.max}
					step={1}
				/>
			{/if}
		{/each}
	</div>
</li>
