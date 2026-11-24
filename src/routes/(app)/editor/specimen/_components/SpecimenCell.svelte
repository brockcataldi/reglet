<script lang="ts">
	import { Link, Pencil, PencilLine, X } from '@lucide/svelte';

	import type {
		Lane,
		SpecimenGridCell,
		SpecimenOverride
	} from '#lib/types.js';

	import { toFontVariationSettings } from '#lib/domain/fonts/to-font-variation-settings.js';
	import { adjustNumberPrecision } from '#lib/domain/project/adjust-number-precision.js';
	import project from '#lib/stores/project.svelte.js';

	import Button from '#lib/ui/button/button.svelte';
	import InlineField, {
		inlineControlClass
	} from '#lib/ui/form/inline-field.svelte';

	import CellTags from './CellTags.svelte';

	type CellProps = {
		cell: SpecimenGridCell;
		lane: Lane;
	};

	let { cell, lane }: CellProps = $props();

	type Field = keyof SpecimenOverride;

	// the fields stay out of the way until asked for
	let open = $state(false);

	const id = (field: string) =>
		`input-${field}-${cell.laneId}-${cell.step}`;
	const fieldsId = $derived(id('fields'));

	// overrides skip toSpecimen's rounding, so round for display here
	const fontSize = $derived(
		adjustNumberPrecision(cell.value.fontSize, project.precision)
	);

	const fields = $derived([
		{
			field: 'fontSize' as const,
			label: 'Font Size',
			slug: 'font-size',
			value: fontSize,
			unit: project.fontSizeUnit,
			custom: cell.value.fontSizeOverridden,
			min: 0,
			step: 0.05
		},
		{
			field: 'lineHeight' as const,
			label: 'Line Height',
			slug: 'line-height',
			value: cell.value.lineHeight,
			unit: undefined,
			custom: cell.value.lineHeightOverridden,
			min: 0,
			step: 0.05
		},
		{
			field: 'letterSpacing' as const,
			label: 'Letter Spacing',
			slug: 'letter-spacing',
			value: cell.value.letterSpacing,
			unit: project.letterSpacingUnit,
			custom: cell.value.letterSpacingOverridden,
			min: undefined,
			step: 0.01
		}
	]);

	// half-typed or cleared inputs aren't values, so they leave the step alone
	const update = (field: Field, value: string) => {
		const number = Number(value);

		if (value !== '' && Number.isFinite(number)) {
			project.lanes.updateOverrideValue(
				cell.laneId,
				`${cell.step}`,
				field,
				number
			);
		}
	};

	// the Relink button goes away with the override, so focus moves to the
	// field it was beside
	const relink = (field: Field, slug: string) => {
		project.lanes.updateOverrideValue(
			cell.laneId,
			`${cell.step}`,
			field,
			undefined
		);
		document.getElementById(id(slug))?.focus();
	};
</script>

<div class="col-span-1 border border-black bg-white">
	<CellTags {cell} />

	<!-- one line is enough to judge the size; the rest fades out -->
	<p
		class="overflow-hidden mask-[linear-gradient(to_right,black_85%,transparent)] p-4 whitespace-nowrap"
		style:font-family={lane.family}
		style:font-weight={lane.weight}
		style:font-style={lane.style}
		style:font-variation-settings={toFontVariationSettings(
			lane.variationSettings
		)}
		style:line-height={cell.value.lineHeight}
		style:font-size={`${fontSize}${project.fontSizeUnit}`}
		style:letter-spacing={`${cell.value.letterSpacing}${project.letterSpacingUnit}`}
	>
		Lorem ipsum dolor sit amet consectetur adipisicing elit.
	</p>

	<div class="flex items-start gap-4 border-t border-black px-4 py-3">
		<!-- fixed columns keep the values lined up from card to card -->
		<dl class="grid flex-1 grid-cols-3 gap-x-4">
			{#each fields as { field, label, value, unit, custom } (field)}
				<div class="flex flex-col gap-0.5">
					<dt class="text-xs">
						{label}{#if custom}<span class="sr-only"> (custom)</span>{/if}
					</dt>
					<!-- custom values are italic and carry a pencil, not just colour -->
					<dd class="flex items-center gap-2 whitespace-nowrap">
						<b class={[custom && 'italic']}>{value}{unit ?? ''}</b>
						{#if custom}
							<span
								class="grid size-5 shrink-0 place-items-center border border-black bg-sunburst-500"
								title="Custom value"
							>
								<PencilLine
									class="size-3.5"
									strokeWidth={2}
									aria-hidden="true"
								/>
							</span>
						{/if}
					</dd>
				</div>
			{/each}
		</dl>

		<Button
			label={open ? 'Close' : 'Adjust'}
			icon={open ? X : Pencil}
			aria-label={`${open ? 'Close' : 'Adjust'} step ${cell.step} of ${project.lanes.name(cell.laneId)}`}
			aria-expanded={open}
			aria-controls={open ? fieldsId : undefined}
			onclick={() => (open = !open)}
		/>
	</div>

	{#if open}
		<ul
			id={fieldsId}
			class="flex flex-col gap-2 border-t border-black p-4"
		>
			{#each fields as { field, label, slug, value, unit, custom, min, step } (field)}
				<li class="flex items-center gap-2">
					<InlineField for={id(slug)} {label} suffix={unit} class="flex-1">
						<input
							id={id(slug)}
							type="number"
							class={[
								inlineControlClass,
								'text-right',
								custom && 'italic'
							]}
							{min}
							{step}
							{value}
							oninput={(event) => update(field, event.currentTarget.value)}
						/>
					</InlineField>
					<!-- the slot holds its width so the rows line up -->
					<span class="w-24 shrink-0">
						{#if custom}
							<Button
								label="Relink"
								icon={Link}
								size="sm"
								aria-label={`Relink ${label.toLowerCase()} to the lane value`}
								onclick={() => relink(field, slug)}
							/>
						{/if}
					</span>
				</li>
			{/each}
		</ul>
	{/if}
</div>
