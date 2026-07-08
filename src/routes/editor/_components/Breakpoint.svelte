<script lang="ts">
	import type { Breakpoint } from '$lib/types';

	import Button from '$lib/ui/button/button.svelte';
	import Input from '$lib/ui/form/input.svelte';
	import InputUnit from '$lib/ui/form/input-unit.svelte';

	type BreakpointProps = {
		breakpoint: Breakpoint;
		onnamechange: (newName: string) => void;
		onwidthchange: (newWidth: number) => void;
		ondelete: () => void;
		onduplicate: () => void;
	};

	let {
		breakpoint,
		onnamechange,
		onwidthchange,
		ondelete,
		onduplicate
	}: BreakpointProps = $props();
</script>

<div class="w-full border border-black bg-white">
	<div class="block p-4">
		<div class="grid grid-cols-[3fr_1.5fr_1fr] gap-4">
			<div class="w-full">
				<Input
					id={`breakpoint-label-${breakpoint.id}`}
					placeholder="ex. Mobile"
					class="w-full text-4xl font-bold"
					value={breakpoint.label}
					oninput={(event) => onnamechange(event.currentTarget.value)}
				/>
				<label
					class="font-mono text-sm text-neutral-600 uppercase"
					for={`breakpoint-label-${breakpoint.id}`}
				>
					Breakpoint Label
				</label>
			</div>
			<div>
				<InputUnit
					id={`breakpoint-width-${breakpoint.id}`}
					unit="px"
					type="number"
					class="text-4xl font-bold"
					unitClass="text-2xl"
					min={0}
					step={1}
					value={breakpoint.width}
					oninput={(event) =>
						onwidthchange(Number(event.currentTarget.value))}
				/>

				<label
					class="font-mono text-sm text-neutral-600 uppercase"
					for={`breakpoint-label-${breakpoint.id}`}
				>
					Width Threshold
				</label>
			</div>

			<div>
				<ul class="flex flex-col items-start justify-start gap-2">
					<li class="w-full">
						<Button
							class="w-full py-2"
							label="Duplicate"
							onclick={() => onduplicate()}
						/>
					</li>
					<li class="w-full">
						<Button
							class="w-full py-2"
							variant="destructive"
							label="Delete"
							onclick={() => ondelete()}
						/>
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>
