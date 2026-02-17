<script lang="ts">
	import { isAxis, isVariationAxis } from '$lib/types';

	import fonts from '$lib/stores/fonts.svelte';

	import Range from '$lib/components/range.svelte';

	type Props = {
		familyId: string;
		faceId: string;
		showSliders: boolean;
		showValues: boolean;
	};

	let { familyId, faceId, showSliders, showValues }: Props = $props();

	let family = $derived(fonts.families.find((f) => f.id === familyId));
	let face = $derived(family?.faces.find((f) => f.id === faceId));

	let weight = $state<string>('400');
	let axes = $state<Record<string, number>>({});

	$effect(() => {
		if (!family || !face) {
			return;
		}

		if (!isAxis(face.weight)) {
			weight = face.weight;
		} else {
			weight = Math.floor(
				(face.weight.max - face.weight.min) / 2 + face.weight.min
			).toString();
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

	const hasRange = $derived.by(() => {
		if (!face) {
			return;
		}

		if (isAxis(face.weight)) {
			return true;
		}

		for (const variationSetting of face.variationSettings) {
			if (isVariationAxis(variationSetting)) {
				return true;
			}
		}

		return false;
	});
</script>

{#if family && face}
	<li class="w-full border-neutral-300 py-4 not-last:border-b">
		<p
			class="w-full text-4xl"
			style:font-family={family.family}
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

		{#if showValues || showSliders}
			<div class="pt-2">
				{#if showValues}
					<ul
						class="flex flex-row items-center justify-start gap-4 not-last:mb-4"
					>
						<li>
							<h3 class="text-xs">Font Style</h3>
							<p>
								<code
									class="rounded-md border border-neutral-300 bg-neutral-50 px-2 py-1 text-sm"
									>{face.style}</code
								>
							</p>
						</li>
						<li>
							<h3 class="text-xs">Font Weight</h3>
							{#if !isAxis(face.weight)}
								<p>
									<code
										class="rounded-md border border-neutral-300 bg-neutral-50 px-2 py-1 text-sm"
										>{face.weight}</code
									>
								</p>
							{:else}
								<p>
									<code
										class="rounded-md border border-neutral-300 bg-neutral-50 px-2 py-1 text-sm"
										>{face.weight.min}</code
									>
									to
									<code
										class="rounded-md border border-neutral-300 bg-neutral-50 px-2 py-1 text-sm"
										>{face.weight.max}</code
									>
								</p>
							{/if}
						</li>
						<li>
							<h3 class="text-xs">Font Stretch</h3>
							<p>
								<code
									class="rounded-md border border-neutral-300 bg-neutral-50 px-2 py-1 text-sm"
								>
									{typeof face.stretch === 'string'
										? face.stretch
										: `${face.stretch}%`}
								</code>
							</p>
						</li>
						<li>
							<h3 class="text-xs">Font Optical Sizing</h3>
							<p>
								<code
									class="rounded-md border border-neutral-300 bg-neutral-50 px-2 py-1 text-sm"
								>
									{face.opticalSizing}
								</code>
							</p>
						</li>

						{#each face.variationSettings as variationSetting (`${variationSetting.id}-display`)}
							<li>
								<h3 class="text-xs">{variationSetting.name} Axis</h3>
								{#if isVariationAxis(variationSetting)}
									<p>
										<code
											class="rounded-md border border-neutral-300 bg-neutral-50 px-2 py-1 text-sm"
											>{variationSetting.min}</code
										>
										to
										<code
											class="rounded-md border border-neutral-300 bg-neutral-50 px-2 py-1 text-sm"
											>{variationSetting.max}</code
										>
									</p>
								{:else}
									<p>
										<code
											class="rounded-md border border-neutral-300 bg-neutral-50 px-2 py-1 text-sm"
										>
											{variationSetting.value}
										</code>
									</p>
								{/if}
							</li>
						{/each}
					</ul>
				{/if}

				{#if hasRange && showSliders}
					<ul class="flex w-full flex-col items-start justify-start gap-2">
						{#if isAxis(face.weight)}
							<li class="w-full">
								<Range
									label="Font Weight"
									id={`${face.id}-weight`}
									bind:value={weight}
									min={face.weight.min}
									max={face.weight.max}
									step={1}
								/>
							</li>
						{/if}
						{#each face.variationSettings as variationSetting (`${variationSetting.id}-tester`)}
							{#if isVariationAxis(variationSetting)}
								<li class="w-full">
									<Range
										label={`${variationSetting.name}`}
										id={`${variationSetting.id}}`}
										bind:value={axes[variationSetting.name]}
										min={variationSetting.min}
										max={variationSetting.max}
										step={1}
									/>
								</li>
							{/if}
						{/each}
					</ul>
				{/if}
			</div>
		{/if}
	</li>
{/if}
