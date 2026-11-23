<script lang="ts">
	import type { SpecimenGridCell, Lane } from '#lib/types.js';

	import project from '#lib/stores/project.svelte.js';
	import { toFontVariationSettings } from '#lib/domain/fonts/to-font-variation-settings.js';

	import Input from '#lib/ui/form/input.svelte';
	import Separator from '#lib/ui/display/separator.svelte';
	import InputUnit from '#lib/ui/form/input-unit.svelte';
	import { Link } from '@lucide/svelte';

	import Button from '#lib/ui/button/button.svelte';

	import CellTags from './CellTags.svelte';

	type CellProps = {
		cell: SpecimenGridCell;
		lane: Lane;
	};

	let { cell, lane }: CellProps = $props();
</script>

<div class="col-span-1 border border-black bg-white">
	<CellTags {cell} />
	<div class="block overflow-hidden border-b border-black p-4">
		<p
			style:font-family={lane.family}
			style:font-weight={lane.weight}
			style:font-style={lane.style}
			style:font-variation-settings={toFontVariationSettings(
				lane.variationSettings
			)}
			style:line-height={cell.value.lineHeight}
			style:font-size={`${cell.value.fontSize.toFixed(3)}${project.fontSizeUnit}`}
			style:letter-spacing={`${cell.value.letterSpacing}${project.letterSpacingUnit}`}
		>
			Lorem ipsum dolor sit amet consectetur adipisicing elit.
		</p>
	</div>

	<ul class="grid grid-cols-3 gap-4 p-4">
		<li>
			<Separator
				as="label"
				for={`input-line-height-${cell.laneId}-${cell.step}`}
			>
				Line Height
				{#snippet action()}
					{#if cell.value.lineHeightOverridden}
						<Button
							label="Relink"
							icon={Link}
							aria-label="Relink line height to lane value"
							size="sm"
							class="-my-0.5"
							onclick={() =>
								project.lanes.updateOverrideValue(
									cell.laneId,
									`${cell.step}`,
									'lineHeight',
									undefined
								)}
						/>
					{/if}
				{/snippet}
			</Separator>
			<Input
				id={`input-line-height-${cell.laneId}-${cell.step}`}
				class="mt-1"
				type="number"
				min={0}
				step={0.05}
				value={cell.value.lineHeight}
				oninput={(event) =>
					project.lanes.updateOverrideValue(
						cell.laneId,
						`${cell.step}`,
						'lineHeight',
						Number(event.currentTarget.value)
					)}
			/>
		</li>

		<li>
			<Separator
				as="label"
				for={`input-font-size-${cell.laneId}-${cell.step}`}
			>
				Font Size
				{#snippet action()}
					{#if cell.value.fontSizeOverridden}
						<Button
							label="Relink"
							icon={Link}
							aria-label="Relink font size to lane value"
							size="sm"
							class="-my-0.5"
							onclick={() =>
								project.lanes.updateOverrideValue(
									cell.laneId,
									`${cell.step}`,
									'fontSize',
									undefined
								)}
						/>
					{/if}
				{/snippet}
			</Separator>
			<InputUnit
				id={`input-font-size-${cell.laneId}-${cell.step}`}
				value={cell.value.fontSize}
				min={0}
				step={0.05}
				unit={project.fontSizeUnit}
				oninput={(event) =>
					project.lanes.updateOverrideValue(
						cell.laneId,
						`${cell.step}`,
						'fontSize',
						Number(event.currentTarget.value)
					)}
			/>
		</li>

		<li>
			<Separator
				as="label"
				for={`input-letter-spacing-${cell.laneId}-${cell.step}`}
			>
				Letter Spacing
				{#snippet action()}
					{#if cell.value.letterSpacingOverridden}
						<Button
							label="Relink"
							icon={Link}
							aria-label="Relink letter spacing to lane value"
							size="sm"
							class="-my-0.5"
							onclick={() =>
								project.lanes.updateOverrideValue(
									cell.laneId,
									`${cell.step}`,
									'letterSpacing',
									undefined
								)}
						/>
					{/if}
				{/snippet}
			</Separator>
			<InputUnit
				id={`input-letter-spacing-${cell.laneId}-${cell.step}`}
				value={cell.value.letterSpacing}
				step={0.01}
				unit={project.letterSpacingUnit}
				oninput={(event) =>
					project.lanes.updateOverrideValue(
						cell.laneId,
						`${cell.step}`,
						'letterSpacing',
						Number(event.currentTarget.value)
					)}
			/>
		</li>
	</ul>
</div>
