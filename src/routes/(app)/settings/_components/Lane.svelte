<script lang="ts">
	import type { Lane, TypeSetting } from '#lib/types.js';
	import { toFontVariationSettings } from '#lib/domain/fonts/to-font-variation-settings.js';
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
</script>

<div class="w-full border border-black bg-white">
	<div class="block">
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
		<div class="grid grid-cols-[1fr_135px] gap-4 p-4">
			<TypeSettingFields
				idPrefix={`lane-${lane.id}`}
				setting={lane}
				{onChange}
			/>
			<div>
				<ul class="flex flex-col items-start justify-start gap-2">
					<li class="w-full">
						<Button
							class="w-full py-2"
							label="Duplicate"
							icon={Copy}
							onclick={() => onDuplicate()}
						/>
					</li>
					<li class="w-full">
						<Button
							class="w-full py-2"
							scheme="destructive"
							label="Delete"
							icon={Trash}
							onclick={() => onDelete()}
						/>
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>
