<script lang="ts">
	import type { Lane, TypeSetting } from '#lib/types.js';
	import { toFontVariationSettings } from '#lib/domain/fonts/to-font-variation-settings.js';
	import project from '#lib/stores/project.svelte.js';
	import { Copy, Trash } from '@lucide/svelte';

	import Button from '#lib/ui/button/button.svelte';

	import TypeSettingFields from './TypeSettingFields.svelte';

	type LaneProps = {
		lane: Lane;
		onChange: (patch: Partial<TypeSetting>) => void;
		onDuplicate: () => void;
		onDelete: () => void;
	};

	let { lane, onChange, onDuplicate, onDelete }: LaneProps = $props();

	const number = $derived(project.lanes.number(lane.id));
	const name = $derived(project.lanes.name(lane.id));
</script>

<div class="w-full border border-black bg-white">
	<!-- a strip above the preview, like the tag strip on each specimen -->
	<div
		class="flex flex-row items-center justify-between gap-4 border-b border-black p-4"
	>
		<h3
			class="grid size-11 place-items-center border border-black bg-sunburst-500 text-2xl font-bold"
		>
			<span class="sr-only">Lane </span>{number}
		</h3>
		<ul class="flex flex-row items-center gap-4">
			<li>
				<Button
					label="Duplicate"
					aria-label={`Duplicate ${name}`}
					icon={Copy}
					onclick={() => onDuplicate()}
				/>
			</li>
			<li>
				<Button
					scheme="destructive"
					label="Delete"
					aria-label={`Delete ${name}`}
					icon={Trash}
					onclick={() => onDelete()}
				/>
			</li>
		</ul>
	</div>
	<header class="w-full overflow-hidden border-b p-4">
		<p
			class="w-full overflow-hidden text-5xl whitespace-nowrap"
			style:font-family={lane.family}
			style:font-weight={lane.weight}
			style:font-style={lane.style}
			style:font-variation-settings={toFontVariationSettings(
				lane.variationSettings
			)}
		>
			Lorem ipsum dolor sit amet consectetur adipisicing elit.
		</p>
	</header>
	<div class="p-4">
		<TypeSettingFields
			idPrefix={`lane-${lane.id}`}
			setting={lane}
			{onChange}
		/>
	</div>
</div>
