<script lang="ts">
	import type { SpecimenGridCell, Lane } from '#lib/types.js';

	import project from '#lib/stores/project.svelte.js';

	import Input from '#lib/ui/form/input.svelte';
	import Separator from '#lib/ui/display/separator.svelte';
	import InputUnit from '#lib/ui/form/input-unit.svelte';
	import Button from '#lib/ui/button/button.svelte';

	type CellProps = {
		cell: SpecimenGridCell;
		lane: Lane;
	};

	let { cell, lane }: CellProps = $props();
</script>

<div class="col-span-1 border border-black bg-white">
	<div class="block overflow-hidden border-b border-black p-4">
		<p
			style:font-family={lane.family}
			style:font-weight={lane.weight}
			style:font-style={lane.style}

			style:line-height={cell.value.lineHeight}
			style:font-size={`${cell.value.fontSize.toFixed(3)}${project.unit}`}
		>
			Lorem ipsum dolor sit amet consectetur adipisicing elit.
		</p>
	</div>

	<ul class="grid grid-cols-3 gap-4 p-4">
		<li>
			<Separator
				as="label"
				for={`input-line-height-${cell.laneId}-${cell.step}`}
				description={cell.value.lineHeightOverridden ? 'Unlinked' : ''}
				>Line Height
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

			{#if cell.value.lineHeightOverridden}
				<Button
					label="Relink"
					class="mt-4"
					onclick={() =>
						project.lanes.updateOverrideValue(
							cell.laneId,
							`${cell.step}`,
							'lineHeight',
							undefined
						)}
				/>
			{/if}
		</li>

		<li>
			<Separator
				as="label"
				for={`input-font-size-${cell.laneId}-${cell.step}`}
				description={cell.value.fontSizeOverridden ? 'Unlinked' : ''}
				>Font Size
			</Separator>
			<InputUnit
				id={`input-font-size-${cell.laneId}-${cell.step}`}
				value={cell.value.fontSize}
				min={0}
				step={0.05}
				unit={project.unit}
				oninput={(event) =>
					project.lanes.updateOverrideValue(
						cell.laneId,
						`${cell.step}`,
						'fontSize',
						Number(event.currentTarget.value)
					)}
			/>

			{#if cell.value.fontSizeOverridden}
				<Button
					label="Relink"
					class="mt-4"
					onclick={() =>
						project.lanes.updateOverrideValue(
							cell.laneId,
							`${cell.step}`,
							'fontSize',
							undefined
						)}
				/>
			{/if}
		</li>
	</ul>
</div>

