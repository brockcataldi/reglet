<script lang="ts">
	import type { GridCell } from '$lib/types';

	import settings from '$lib/stores/settings.svelte';

	import Separator from '$lib/ui/display/separator.svelte';
	import Input from '$lib/ui/form/input.svelte';
	import InputUnit from '$lib/ui/form/input-unit.svelte';

	type CellProps = {
		cell: GridCell;
	};

	let { cell }: CellProps = $props();
</script>

<li class="col-span-1 border border-black">
	<div class="border-b border-black p-4">
		<p
			style:line-height={cell.lineHeight}
			style:font-family={cell.family}
			style:font-size={`${cell.fontSize.toFixed(3)}${settings.unit}`}
			style:font-weight={cell.weight}
		>
			Lorem ipsum dolor sit amet consectetur adipisicing elit.
		</p>
	</div>

	<ul class="grid grid-cols-2 gap-2 p-4">
		<li>
			<Separator
				as="label"
				for={`input-line-height-${cell.step}-${cell.laneId}`}
				>Line Height</Separator
			>
			<Input
				id={`input-line-height-${cell.step}-${cell.laneId}`}
				class="mt-1"
				type="number"
				value={cell.lineHeight}
			/>
		</li>
		<li>
			<Separator
				as="label"
				for={`input-font-size-${cell.step}-${cell.laneId}`}
				>Font Size</Separator
			>
			<InputUnit
				id={`input-font-size-${cell.step}-${cell.laneId}`}
				value={cell.fontSize}
				unit={settings.unit}
			/>
		</li>
	</ul>
</li>
