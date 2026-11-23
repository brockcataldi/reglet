<script lang="ts">
	import type { FluidScale, Lane } from '#lib/types.js';

	import { MODULAR_SCALE_RATIOS } from '#lib/constants.js';
	import project from '#lib/stores/project.svelte.js';

	import Separator from '#lib/ui/display/separator.svelte';
	import Checkbox from '#lib/ui/form/checkbox.svelte';
	import Input from '#lib/ui/form/input.svelte';
	import InputUnit from '#lib/ui/form/input-unit.svelte';
	import Select from '#lib/ui/form/select.svelte';

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

{#snippet ratioFields(
	id: string,
	label: string,
	ratio: number,
	disabled: boolean,
	onRatio: (value: string) => void
)}
	<li>
		<Separator as="label" for={`${id}-preset`}>{label}</Separator>
		<div class="mt-1 grid grid-cols-[1fr_80px] gap-2">
			<Select
				id={`${id}-preset`}
				value={presetOf(ratio)}
				{disabled}
				variant={disabled ? 'disabled' : 'default'}
				onchange={(event) => {
					if (event.currentTarget.value !== CUSTOM) {
						onRatio(event.currentTarget.value);
					}
				}}
			>
				{#each MODULAR_SCALE_RATIOS as entry (entry.ratio)}
					<option value={entry.ratio.toString()}>{entry.label}</option>
				{/each}
				<option value={CUSTOM} disabled>Custom</option>
			</Select>
			<Input
				id={`${id}-value`}
				aria-label={`${label} value`}
				class="text-right"
				type="number"
				min={0.001}
				step={0.001}
				value={ratio}
				{disabled}
				variant={disabled ? 'disabled' : 'default'}
				oninput={(event) => onRatio(event.currentTarget.value)}
			/>
		</div>
	</li>
{/snippet}

{#snippet baseField(
	id: string,
	label: string,
	value: number,
	onBase: (value: string) => void
)}
	<li class="col-start-1">
		<Separator as="label" for={id}>{label}</Separator>
		<InputUnit
			{id}
			containerClass="mt-1"
			{value}
			min={0.001}
			step={0.05}
			unit={project.fontSizeUnit}
			oninput={(event) => onBase(event.currentTarget.value)}
		/>
	</li>
{/snippet}

<ul class="grid grid-cols-[180px_1fr] gap-4">
	{@render baseField(
		`${idPrefix}-base`,
		lane.fluid ? 'Min Base Size' : 'Base Size',
		lane.baseSize,
		(value) => update('baseSize', value)
	)}
	{@render ratioFields(
		`${idPrefix}-ratio`,
		lane.fluid ? 'Min Ratio' : 'Ratio',
		lane.ratio,
		false,
		(value) => update('ratio', value)
	)}

	{#if lane.fluid}
		{@const fluid = lane.fluid}
		{@render baseField(
			`${idPrefix}-max-base`,
			'Max Base Size',
			fluid.maxBaseSize,
			(value) => updateFluidNumber('maxBaseSize', value)
		)}
		{@render ratioFields(
			`${idPrefix}-max-ratio`,
			'Max Ratio',
			fluid.linkRatio ? lane.ratio : fluid.maxRatio,
			fluid.linkRatio,
			(value) => updateFluidNumber('maxRatio', value)
		)}
		<li class="col-start-2">
			<Checkbox
				id={`${idPrefix}-link-ratio`}
				label="Use min ratio at max"
				checked={fluid.linkRatio}
				onchange={(event) =>
					updateFluid({ linkRatio: event.currentTarget.checked })}
			/>
		</li>
	{/if}
</ul>
