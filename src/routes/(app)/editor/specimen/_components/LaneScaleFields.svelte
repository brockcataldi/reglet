<script lang="ts">
	import { tick } from 'svelte';

	import type { FluidScale, Lane } from '#lib/types.js';

	import { MODULAR_SCALE_RATIOS } from '#lib/constants.js';
	import project from '#lib/stores/project.svelte.js';

	import Checkbox from '#lib/ui/form/checkbox.svelte';
	import InlineField, {
		inlineControlClass,
		inlineSegmentClass
	} from '#lib/ui/form/inline-field.svelte';

	type LaneScaleFieldsProps = {
		lane: Lane;
	};

	let { lane }: LaneScaleFieldsProps = $props();

	const CUSTOM = 'custom';

	const idPrefix = $derived(`lane-scale-${lane.id}`);

	// a typed ratio that isn't a named interval shows as custom
	const presetOf = (ratio: number) =>
		MODULAR_SCALE_RATIOS.find(
			(entry) => entry.ratio === ratio
		)?.ratio.toString() ?? CUSTOM;

	// ratio fields switched to Custom by hand, so a typed value that happens to
	// match a named interval keeps its input open instead of snapping back
	let customFields = $state<Record<string, boolean>>({});

	const isCustom = (id: string, ratio: number) =>
		customFields[id] === true || presetOf(ratio) === CUSTOM;

	const choosePreset = async (
		id: string,
		value: string,
		onRatio: (value: string) => void
	) => {
		if (value === CUSTOM) {
			customFields[id] = true;
			await tick();
			document.getElementById(`${id}-value`)?.focus();
			return;
		}

		customFields[id] = false;
		onRatio(value);
	};

	// half-typed or cleared inputs aren't sizes, so they leave the lane alone
	const toPositive = (value: string) => {
		const number = Number(value);

		return value !== '' && Number.isFinite(number) && number > 0
			? number
			: undefined;
	};

	const update = (key: 'baseSize' | 'ratio', value: string) => {
		const number = toPositive(value);

		if (number !== undefined) {
			project.lanes.update(lane.id, { [key]: number });
		}
	};

	const updateFluid = (patch: Partial<FluidScale>) => {
		if (lane.fluid) {
			project.lanes.update(lane.id, {
				fluid: { ...lane.fluid, ...patch }
			});
		}
	};

	const updateFluidNumber = (
		key: 'maxBaseSize' | 'maxRatio',
		value: string
	) => {
		const number = toPositive(value);

		if (number !== undefined) {
			updateFluid({ [key]: number });
		}
	};
</script>

<!-- compact fields sit in the fluid min and max columns: a short label, and a
     custom ratio's typed value on its own row since the column is narrow -->
{#snippet ratioField(
	id: string,
	label: string,
	ratio: number,
	disabled: boolean,
	onRatio: (value: string) => void,
	compact: boolean = false,
	name: string = label
)}
	{@const custom = isCustom(id, ratio)}
	{@const variant = disabled ? 'disabled' : 'default'}
	{@const labelClass = compact ? 'w-14' : undefined}
	{#snippet valueInput()}
		<input
			id={`${id}-value`}
			aria-label={`${name} value`}
			class={[
				inlineControlClass,
				!compact && inlineSegmentClass,
				'text-right'
			]}
			type="number"
			min={0.001}
			step={0.001}
			value={ratio}
			{disabled}
			oninput={(event) => onRatio(event.currentTarget.value)}
		/>
	{/snippet}
	<li>
		<InlineField for={`${id}-preset`} {label} {labelClass} {variant}>
			<select
				id={`${id}-preset`}
				aria-label={compact ? name : undefined}
				class={[inlineControlClass, 'pr-8']}
				value={custom ? CUSTOM : presetOf(ratio)}
				{disabled}
				onchange={(event) =>
					choosePreset(id, event.currentTarget.value, onRatio)}
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
			{#if custom && !compact}
				{@render valueInput()}
			{/if}
		</InlineField>
	</li>
	{#if custom && compact}
		<li>
			<InlineField
				for={`${id}-value`}
				label="Value"
				{labelClass}
				{variant}
			>
				{@render valueInput()}
			</InlineField>
		</li>
	{/if}
{/snippet}

{#snippet baseField(
	id: string,
	label: string,
	value: number,
	onBase: (value: string) => void,
	compact: boolean = false,
	name: string = label
)}
	<li>
		<InlineField
			for={id}
			{label}
			labelClass={compact ? 'w-14' : undefined}
			suffix={project.fontSizeUnit}
		>
			<input
				{id}
				aria-label={compact ? name : undefined}
				class={[inlineControlClass, 'text-right']}
				type="number"
				{value}
				min={0.001}
				step={0.05}
				oninput={(event) => onBase(event.currentTarget.value)}
			/>
		</InlineField>
	</li>
{/snippet}

{#if lane.fluid}
	{@const fluid = lane.fluid}
	<!-- min and max side by side, each a self-contained column -->
	<div class="grid grid-cols-2 gap-6">
		<section
			class="flex min-w-0 flex-col gap-2"
			aria-labelledby={`${idPrefix}-min`}
		>
			<h3
				id={`${idPrefix}-min`}
				class="px-1 font-mono text-xs text-neutral-600 uppercase"
			>
				Min
			</h3>
			<ul class="flex flex-col gap-2">
				{@render baseField(
					`${idPrefix}-base`,
					'Size',
					lane.baseSize,
					(value) => update('baseSize', value),
					true,
					'Min base size'
				)}
				{@render ratioField(
					`${idPrefix}-ratio`,
					'Ratio',
					lane.ratio,
					false,
					(value) => update('ratio', value),
					true,
					'Min ratio'
				)}
			</ul>
		</section>

		<section
			class="flex min-w-0 flex-col gap-2"
			aria-labelledby={`${idPrefix}-max`}
		>
			<h3
				id={`${idPrefix}-max`}
				class="px-1 font-mono text-xs text-neutral-600 uppercase"
			>
				Max
			</h3>
			<ul class="flex flex-col gap-2">
				{@render baseField(
					`${idPrefix}-max-base`,
					'Size',
					fluid.maxBaseSize,
					(value) => updateFluidNumber('maxBaseSize', value),
					true,
					'Max base size'
				)}
				{@render ratioField(
					`${idPrefix}-max-ratio`,
					'Ratio',
					fluid.linkRatio ? lane.ratio : fluid.maxRatio,
					fluid.linkRatio,
					(value) => updateFluidNumber('maxRatio', value),
					true,
					'Max ratio'
				)}
				<li class="pt-1 pl-1">
					<Checkbox
						id={`${idPrefix}-link-ratio`}
						label="Use min ratio at max"
						checked={fluid.linkRatio}
						onchange={(event) =>
							updateFluid({ linkRatio: event.currentTarget.checked })}
					/>
				</li>
			</ul>
		</section>
	</div>
{:else}
	<ul class="flex flex-col gap-2">
		{@render baseField(
			`${idPrefix}-base`,
			'Base Size',
			lane.baseSize,
			(value) => update('baseSize', value)
		)}
		{@render ratioField(
			`${idPrefix}-ratio`,
			'Ratio',
			lane.ratio,
			false,
			(value) => update('ratio', value)
		)}
	</ul>
{/if}
