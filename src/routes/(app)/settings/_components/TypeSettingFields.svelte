<script lang="ts">
	import type { TypeSetting } from '#lib/types.js';
	import type { AxisRange } from '#lib/domain/fonts/types.js';
	import { fitTypeSetting } from '#lib/domain/fonts/fit-type-setting.js';

	import project from '#lib/stores/project.svelte.js';

	import Separator from '#lib/ui/display/separator.svelte';
	import Combobox from '#lib/ui/form/combobox.svelte';
	import Input from '#lib/ui/form/input.svelte';
	import Select from '#lib/ui/form/select.svelte';

	type Style = TypeSetting['style'];

	type TypeSettingFieldsProps = {
		idPrefix: string;
		setting: TypeSetting;
		onChange: (patch: Partial<TypeSetting>) => void;
		errors?: Partial<Record<'family' | 'weight' | 'style', string>>;
	};

	let {
		idPrefix,
		setting,
		onChange,
		errors = {}
	}: TypeSettingFieldsProps = $props();

	const ALL_STYLES: Style[] = ['normal', 'italic', 'oblique'];

	const AXIS_LABELS: Record<string, string> = {
		opsz: 'Optical Size',
		wdth: 'Width',
		slnt: 'Slant',
		GRAD: 'Grade'
	};

	// where the slider rests while the axis is unset (the font's own default)
	const AXIS_DEFAULTS: Record<string, number> = {
		wdth: 100,
		slnt: 0,
		GRAD: 0
	};

	const family = $derived(project.fonts.find(setting.family));
	const familyNames = $derived(
		project.fonts.available.map((entry) => entry.family)
	);

	// weights depend on the style: a family may have 700 but not 700 italic
	const weights = $derived(family?.weights[setting.style] ?? []);
	const isVariableWeight = $derived(
		weights.some(({ min, max }) => min !== max)
	);
	const weightBounds = $derived<AxisRange | undefined>(
		weights.length > 0
			? {
					min: Math.min(...weights.map(({ min }) => min)),
					max: Math.max(...weights.map(({ max }) => max))
				}
			: undefined
	);
	const discreteWeights = $derived.by(() => {
		const values = weights.map(({ min }) => String(min));
		const current = String(setting.weight);
		return values.includes(current) ? values : [...values, current];
	});

	const styles = $derived.by(() => {
		const available = family?.styles.length ? family.styles : ALL_STYLES;
		return available.includes(setting.style)
			? available
			: [...available, setting.style];
	});

	const axes = $derived(Object.entries(family?.axes ?? {}));

	const clamp = (value: number, { min, max }: AxisRange) =>
		Math.min(Math.max(value, min), max);

	const axisStep = ({ min, max }: AxisRange) => {
		const span = max - min;
		return span <= 2 ? 0.01 : span <= 20 ? 0.1 : 1;
	};

	const onFamilyChange = (value: string) => {
		const match = project.fonts.find(value);
		onChange(fitTypeSetting({ ...setting, family: value }, match));
	};

	const setAxis = (tag: string, value: number | undefined) => {
		const next = { ...setting.variationSettings };

		if (value === undefined) {
			delete next[tag];
		} else {
			next[tag] = value;
		}

		onChange({ variationSettings: next });
	};
</script>

<div class="grid w-full grid-cols-3 gap-4">
	<div>
		<Separator as="label" for={`${idPrefix}-family`}>Font Family</Separator
		>
		<Combobox
			id={`${idPrefix}-family`}
			placeholder="ex. Times"
			class="w-full text-2xl font-bold"
			variant={errors.family ? 'error' : 'default'}
			value={setting.family}
			options={familyNames}
			onValueChange={onFamilyChange}
		>
			{#snippet option(name)}
				<span style:font-family={`"${name}"`}>{name}</span>
			{/snippet}
		</Combobox>
		{#if errors.family}
			<p class="text-red-800">{errors.family}</p>
		{/if}
	</div>

	<div>
		<Separator
			as="label"
			for={`${idPrefix}-weight`}
			description={isVariableWeight && weightBounds
				? `${weightBounds.min}–${weightBounds.max}`
				: undefined}
		>
			Font Weight
		</Separator>
		{#if !family || weights.length === 0}
			<Input
				id={`${idPrefix}-weight`}
				placeholder="ex. 400"
				class="w-full text-2xl font-bold"
				variant={errors.weight ? 'error' : 'default'}
				value={setting.weight}
				oninput={(event) =>
					onChange({ weight: event.currentTarget.value })}
			/>
		{:else if isVariableWeight && weightBounds}
			<Input
				id={`${idPrefix}-weight`}
				type="number"
				step="1"
				min={weightBounds.min}
				max={weightBounds.max}
				class="w-full text-2xl font-bold"
				variant={errors.weight ? 'error' : 'default'}
				value={setting.weight}
				oninput={(event) =>
					onChange({ weight: event.currentTarget.value })}
				onchange={() =>
					onChange({ weight: fitTypeSetting(setting, family).weight })}
			/>
		{:else}
			<Select
				id={`${idPrefix}-weight`}
				class="w-full text-2xl font-bold"
				variant={errors.weight ? 'error' : 'default'}
				value={String(setting.weight)}
				onchange={(event) =>
					onChange({ weight: event.currentTarget.value })}
			>
				{#each discreteWeights as weight (weight)}
					<option value={weight}>{weight}</option>
				{/each}
			</Select>
		{/if}
		{#if errors.weight}
			<p class="text-red-800">{errors.weight}</p>
		{/if}
	</div>

	<div>
		<Separator as="label" for={`${idPrefix}-style`}>Font Style</Separator>
		<Select
			id={`${idPrefix}-style`}
			class="w-full text-2xl font-bold"
			variant={errors.style ? 'error' : 'default'}
			value={setting.style}
			onchange={(event) =>
				onChange(
					fitTypeSetting(
						{ ...setting, style: event.currentTarget.value as Style },
						family
					)
				)}
		>
			{#each styles as style (style)}
				<option value={style}>{style}</option>
			{/each}
		</Select>
		{#if errors.style}
			<p class="text-red-800">{errors.style}</p>
		{/if}
	</div>

	{#each axes as [tag, range] (tag)}
		{@const value = setting.variationSettings?.[tag]}
		<div>
			<Separator as="label" for={`${idPrefix}-axis-${tag}`}>
				{AXIS_LABELS[tag] ?? tag}
				{#snippet action()}
					{#if value === undefined}
						<p class="text-xs text-neutral-400 uppercase">Default</p>
					{:else}
						<button
							type="button"
							class="font-mono text-xs text-cobalt-500 uppercase hover:underline"
							onclick={() => setAxis(tag, undefined)}
						>
							{value} · Reset
						</button>
					{/if}
				{/snippet}
			</Separator>
			<input
				id={`${idPrefix}-axis-${tag}`}
				type="range"
				class="w-full accent-cobalt-500"
				min={range.min}
				max={range.max}
				step={axisStep(range)}
				value={value ?? clamp(AXIS_DEFAULTS[tag] ?? range.min, range)}
				oninput={(event) =>
					setAxis(tag, Number(event.currentTarget.value))}
			/>
		</div>
	{/each}
</div>
