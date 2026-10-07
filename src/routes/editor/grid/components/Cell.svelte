<script lang="ts">
	import type { GridCell } from '#lib/types.js';
	import project from '#lib/stores/project.svelte.js';

	import Input from '#lib/ui/form/input.svelte';
	import Separator from '#lib/ui/display/separator.svelte';
	import InputUnit from '#lib/ui/form/input-unit.svelte';
	import Button from '#lib/ui/button/button.svelte';

	type CellProps = {
		cell: GridCell;
	};

	let { cell }: CellProps = $props();
</script>

<li class="col-span-1 border border-black">
	<div class="block overflow-hidden border-b border-black p-4">
		<p
			style:line-height={cell.lineHeight}
			style:font-family={cell.family}
			style:font-size={`${cell.fontSize.toFixed(3)}${project.unit}`}
			style:font-weight={cell.weight}
			style:font-style={cell.style}
		>
			Lorem ipsum dolor sit amet consectetur adipisicing elit.
		</p>
	</div>

	<ul class="grid grid-cols-3 gap-4 p-4">
		<li>
			<Separator
				as="label"
				for={`input-line-height-${cell.laneId}-${cell.step}`}
				description={cell.lineHeightOverridden ? 'Unlinked' : ''}
				>Line Height
			</Separator>
			<Input
				id={`input-line-heigh-${cell.laneId}-${cell.step}`}
				class="mt-1"
				type="number"
				min={0}
				step={0.05}
				value={cell.lineHeight}
			/>

			{#if cell.lineHeightOverridden}
				<Button label="Relink" class="mt-4" />
			{/if}
		</li>
		<li>
			<Separator
				as="label"
				for={`input-font-size-${cell.laneId}-${cell.step}`}
				description={cell.fontSizeOverridden ? 'Unlinked' : ''}
				>Font Size
			</Separator>
			<InputUnit
				id={`input-font-size-${cell.laneId}-${cell.step}`}
				value={cell.fontSize}
				min={0}
				step={0.05}
				unit={project.unit}
			/>

			{#if cell.fontSizeOverridden}
				<Button label="Relink" class="mt-4" />
			{/if}
		</li>
	</ul>
</li>
