<script lang="ts">
	import profiles from '$lib/stores/profiles.svelte';

	import MeasureLine from './measure-line.svelte';

	type Props = {
		id: string;
	};

	let { id }: Props = $props();

	const profile = $derived(profiles.getProfile(id));

	const fontVariationSettings = $derived.by(() => {
		if (!profile) {
			return '';
		}

		return profile.styles.variationSettings
			.map(({ name, value }) => `"${name}" ${value}`)
			.join(',');
	});

	// let metrics = $derived({
	// 	ascender: (baseline - ascender) / 96,
	// 	capHeight: (baseline - capHeight) / 96,
	// 	xHeight: (baseline - xHeight) / 96,
	// 	descender: (descender - baseline) / 96
	// });
</script>

{#if profile}
	<section class="relative w-full border-t border-b border-green-700">
		<div class="relative w-full">
			<p
				style:font-family={profile.styles.family}
				style:font-style={profile.styles.style}
				style:font-stretch={profile.styles.stretch}
				style:font-optical-sizing={profile.styles.opticalSizing}
				style:font-weight={profile.styles.weight}
				style:text-transform={profile.styles.transform}
				style:font-variation-settings={fontVariationSettings}
				class="pointer-events-none m-0 border-t border-b border-dotted border-black text-center text-[200px] leading-none select-none"
			>
				Hxpd
			</p>
			<MeasureLine
				label="Descender"
				position={profile.measurements.descender}
				align="left"
				color="#FF0000"
				onchange={(n) => profiles.updateMeasurement(id, { descender: n })}
			/>

			<MeasureLine
				label="Ascender"
				position={profile.measurements.ascender}
				align="right"
				color="#008080"
				onchange={(n) => profiles.updateMeasurement(id, { ascender: n })}
			/>
			{#if profile.casing === 'lowercase-dominant'}
				<MeasureLine
					label="Cap Height"
					position={profile.measurements.capHeight}
					align="left"
					color="#800080"
					onchange={(n) => profiles.updateMeasurement(id, { capHeight: n })}
				/>
				<MeasureLine
					label="X-Height"
					position={profile.measurements.xHeight}
					align="left"
					color="#008000"
					onchange={(n) => profiles.updateMeasurement(id, { xHeight: n })}
				/>
				<MeasureLine
					label="Baseline"
					position={profile.measurements.baseline}
					align="right"
					color="#FF00FF"
					onchange={(n) => profiles.updateMeasurement(id, { baseline: n })}
				/>
			{/if}
		</div>
	</section>
{/if}
