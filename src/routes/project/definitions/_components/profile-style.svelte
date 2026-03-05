<script lang="ts">
	import { resolve } from '$app/paths';

	import {
		consolidateVariationSettings,
		type VariationAxisValue
	} from '$lib/types';

	import {
		coerceString,
		coerceVariationSettings,
		coerceWeight
	} from '../functions';

	import { uniques } from '$lib/functions/utilities';

	import fonts from '$lib/stores/fonts.svelte';
	import profiles from '$lib/stores/profiles.svelte';

	import Select from '$lib/components/select.svelte';
	import Button from '$lib/components/button.svelte';
	import LinkButton from '$lib/components/link-button.svelte';
	import AdjustmentsVertical from '$lib/icons/adjustments-vertical.svelte';
	import Trash from '$lib/icons/trash.svelte';
	import TextStyleWeight from './profile-style-weight.svelte';
	import TextStyleVariationSetting from './profile-style-variation-setting.svelte';

	type Props = {
		id: string;
		deletable: boolean;
	};

	let { id, deletable }: Props = $props();

	let profile = $derived.by(() => {
		if (id === profiles.host.id) {
			return profiles.host;
		}

		return profiles.guests.find((g) => g.id === id);
	});

	let selected = $derived.by(() => {
		const family = profile ? fonts.getFamily(profile.ref) : undefined;
		const styles = uniques(family?.faces, (f) => f.style);
		const faces = family?.faces.filter(
			(f) => f.style === profile?.styles.style
		);

		return {
			family: family?.family,
			styles,
			stretches: uniques(faces, (f) => f.stretch),
			opticalSizings: uniques(faces, (f) => f.opticalSizing),
			weights: uniques(faces, (f) => f.weight),
			variationSettings: consolidateVariationSettings(faces)
		};
	});

	const variationValues = $derived.by(() => {
		if (!profile || !profile.styles.variationSettings) {
			return;
		}

		return Object.fromEntries(
			profile.styles.variationSettings.map((v) => [v.name, v])
		) as Record<string, VariationAxisValue>;
	});

	const fontVariationSettings = $derived.by(() => {
		if (!profile) {
			return '';
		}

		return profile.styles.variationSettings
			.map(({ name, value }) => `"${name}" ${value}`)
			.join(',');
	});

	const coerce = () => {
		if (!profile) {
			return;
		}

		profiles.updateStyles(id, {
			stretch: coerceString(profile.styles.stretch, selected.stretches),
			opticalSizing: coerceString(
				profile.styles.opticalSizing,
				selected.opticalSizings
			),
			weight: coerceWeight(profile.styles.weight, selected.weights),
			variationSettings: coerceVariationSettings(
				profile.styles.variationSettings,
				selected.variationSettings
			)
		});
	};

	const onchangeFamily = (event: Event) => {
		if (!profile) {
			return;
		}

		const target = event.target as HTMLSelectElement;

		profiles.updateRef(id, target.value);
		profiles.updateStyles(id, {
			family: selected.family,
			style: coerceString(profile.styles.style, selected.styles)
		});

		coerce();
	};

	const onchangeStyle = (event: Event) => {
		const target = event.target as HTMLSelectElement;
		profiles.updateStyles(id, { style: target.value });
		coerce();
	};

	const onchangeStretch = (event: Event) => {
		const target = event.target as HTMLSelectElement;
		profiles.updateStyles(id, { stretch: target.value });
	};

	const onchangeOpticalSizing = (event: Event) => {
		const target = event.target as HTMLSelectElement;
		profiles.updateStyles(id, { opticalSizing: target.value });
	};

	const onchangeTransform = (event: Event) => {
		const target = event.target as HTMLSelectElement;
		const transform = target.value;
		profiles.updateStyles(id, { transform });

		if (transform === 'uppercase') {
			profiles.updateCasing(id, 'uppercase-dominant');
			return;
		}

		if (transform === 'lowercase' || transform === 'capitalize') {
			profiles.updateCasing(id, 'lowercase-dominant');
			return;
		}
	};

	const onclickDelete = () => {
		profiles.deleteGuest(id);
	};
</script>

{#if profile}
	<div class="w-full rounded-md border border-neutral-300 p-4">
		<div>
			<p
				class="text-5xl"
				style:font-family={profile.styles.family}
				style:font-style={profile.styles.style}
				style:font-stretch={profile.styles.stretch}
				style:font-optical-sizing={profile.styles.opticalSizing}
				style:font-weight={profile.styles.weight}
				style:text-transform={profile.styles.transform}
				style:font-variation-settings={fontVariationSettings}
			>
				Lorem Ipsum sit Dolor
			</p>
		</div>

		<hr class="my-4 border-neutral-300" />

		<div class="grid grid-cols-2 gap-2">
			<Select
				id={`${id}-family`}
				label="Family"
				value={profile.ref}
				onchange={onchangeFamily}
			>
				<option disabled value="">Select a font family</option>
				{#each fonts.families as family (family.id)}
					<option value={family.id}>{family.family}</option>
				{/each}
			</Select>

			<Select
				id={`${id}-styles`}
				label="Styles"
				value={profile.styles.style}
				onchange={onchangeStyle}
				disabled={!selected.styles || selected.styles?.length === 1}
			>
				{#if selected.styles}
					<option disabled>Select a font style</option>
					{#each selected.styles as selectedStyle (`${id}-style-${selectedStyle}`)}
						<option value={selectedStyle}>{selectedStyle}</option>
					{/each}
				{/if}
			</Select>

			<TextStyleWeight
				{id}
				value={profile.styles.weight}
				options={selected.weights}
			/>

			<Select
				id={`${id}-transform`}
				label="Transform"
				value={profile.styles.transform}
				onchange={onchangeTransform}
			>
				<option value="none">None</option>
				<option value="capitalize">Capitalize</option>
				<option value="uppercase">Uppercase</option>
				<option value="lowercase">Lowercase</option>
			</Select>

			<Select
				id={`${id}-stretch`}
				label="Stretch"
				value={profile.styles.stretch}
				onchange={onchangeStretch}
				disabled={!selected.stretches || selected.stretches.length === 1}
			>
				{#if selected.stretches}
					<option disabled>Select a font stretch</option>
					{#each selected.stretches as selectedFontStretch (`${id}-stretch-${selectedFontStretch}`)}
						<option value={selectedFontStretch}>{selectedFontStretch}</option>
					{/each}
				{/if}
			</Select>

			<Select
				id={`${id}-optical-sizing`}
				label="Optical Sizing"
				value={profile.styles.opticalSizing}
				onchange={onchangeOpticalSizing}
				disabled={!selected.opticalSizings ||
					selected.opticalSizings.length === 1}
			>
				{#if selected.opticalSizings}
					<option disabled>Select a family</option>
					{#each selected.opticalSizings as selectedFontOpticalSizing (`${id}-optical-sizing-${selectedFontOpticalSizing}`)}
						<option value={selectedFontOpticalSizing}
							>{selectedFontOpticalSizing}</option
						>
					{/each}
				{/if}
			</Select>

			{#if variationValues !== undefined}
				{#each selected.variationSettings as variationSetting (`${id}-variation-setting-${variationSetting.id}`)}
					<TextStyleVariationSetting
						{id}
						value={variationValues[variationSetting.name]}
						options={variationSetting}
					/>
				{/each}
			{/if}
		</div>

		{#if deletable || profile.styles.family !== ''}
			<hr class="my-4 border-neutral-300" />

			<div class="flex items-end justify-between">
				<div class="grid grid-cols-2 items-end gap-2">
					{#if profile.styles.family !== ''}
						<Select
							label="Dominant Casing"
							id={`${id}-casing`}
							value={profile.casing}
						>
							<option value="lowercase-dominant">Lowercase</option>
							<option value="uppercase-dominant">Uppercase</option>
						</Select>

						<LinkButton
							icon={AdjustmentsVertical}
							href={resolve(`/project/definitions/${id}`)}>Measure</LinkButton
						>
					{/if}
				</div>
				{#if deletable}
					<Button icon={Trash} color="destructive" onclick={onclickDelete}>
						Delete
					</Button>
				{/if}
			</div>
		{/if}
	</div>
{/if}
