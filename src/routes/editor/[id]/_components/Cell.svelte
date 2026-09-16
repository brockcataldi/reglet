<script lang="ts">
	import type { GridCell } from '$lib/types';

	import settings from '$lib/stores/settings.svelte';

	import Separator from '$lib/ui/display/separator.svelte';
	import Input from '$lib/ui/form/input.svelte';
	import InputUnit from '$lib/ui/form/input-unit.svelte';
	import project from '$lib/stores/project.svelte';
	import Button from '$lib/ui/button/button.svelte';

	type CellProps = {
		breakpointId: string;
		cell: GridCell;
	};

	let { breakpointId, cell }: CellProps = $props();
</script>

<li class="col-span-1 border border-black">
	<div class="border-b border-black p-4">
		<p
			style:line-height={cell.lineHeight}
			style:font-family={cell.family}
			style:font-size={`${cell.fontSize.toFixed(3)}${settings.unit}`}
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
				for={`input-line-height-${cell.id}`}
				description={cell.lineHeightOverridden ? 'Unlinked' : ''}
				>Line Height
			</Separator>
			<Input
				id={`input-line-height-${cell.id}`}
				class="mt-1"
				type="number"
				min={0}
				step={0.05}
				value={cell.lineHeight}
				oninput={(event) =>
					project.updateBreakpointOverrideLineHeight(
						breakpointId,
						cell.id,
						Number(event.currentTarget.value)
					)}
			/>

			{#if cell.lineHeightOverridden}
				<Button
					label="Relink"
					class="mt-4"
					onclick={() =>
						project.updateBreakpointOverrideLineHeight(
							breakpointId,
							cell.id,
							undefined
						)}
				/>
			{/if}
		</li>
		<li>
			<Separator
				as="label"
				for={`input-font-size-${cell.id}`}
				description={cell.fontSizeOverridden ? 'Unlinked' : ''}
				>Font Size
			</Separator>
			<InputUnit
				id={`input-font-size-${cell.id}`}
				value={cell.fontSize}
				min={0}
				step={0.05}
				unit={settings.unit}
				oninput={(event) =>
					project.updateBreakpointOverrideFontSize(
						breakpointId,
						cell.id,
						Number(event.currentTarget.value)
					)}
			/>

			{#if cell.fontSizeOverridden}
				<Button
					label="Relink"
					class="mt-4"
					onclick={() =>
						project.updateBreakpointOverrideFontSize(
							breakpointId,
							cell.id,
							undefined
						)}
				/>
			{/if}
		</li>
	</ul>
</li>
