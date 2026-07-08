<script lang="ts">
	import type { Breakpoint } from '$lib/types';

	import Button from '$lib/ui/button/button.svelte';
	import InputUnit from '$lib/ui/form/input-unit.svelte';
	import Input from '$lib/ui/form/input.svelte';

	let breakpoint = $state<Omit<Breakpoint, 'id'>>({
		label: '',
		width: 500,
		lanes: []
	});

	type AddBreakpointProps = {
		onadd: (newBreakpoint: Omit<Breakpoint, 'id'>) => void;
		oncancel: () => void;
	};

	let { onadd, oncancel }: AddBreakpointProps = $props();
</script>

<div class="w-full border border-black bg-white">
	<div class="block p-4">
		<div class="grid grid-cols-[3fr_1.5fr_1fr] gap-4">
			<div class="w-full">
				<Input
					id="breakpoint-label-new"
					placeholder="ex. Mobile"
					class="w-full text-4xl font-bold"
					bind:value={breakpoint.label}
				/>
				<label
					class="font-mono text-sm text-neutral-600 uppercase"
					for="breakpoint-label-new"
				>
					Breakpoint Label
				</label>
			</div>
			<div>
				<InputUnit
					id="breakpoint-label-width"
					unit="px"
					type="number"
					class="text-4xl font-bold"
					unitClass="text-2xl"
					min={0}
					step={1}
					bind:value={breakpoint.width}
				/>

				<label
					class="font-mono text-sm text-neutral-600 uppercase"
					for="breakpoint-label-width"
				>
					Width Threshold
				</label>
			</div>

			<div>
				<ul class="flex flex-col items-start justify-start gap-2">
					<li class="w-full">
						<Button
							class="w-full py-2"
							label="Add"
							onclick={() => {
								onadd(breakpoint);
								breakpoint = {
									label: '',
									width: 500,
									lanes: []
								};
							}}
						/>
					</li>
					<li class="w-full">
						<Button
							class="w-full py-2"
							variant="destructive"
							label="Cancel"
							onclick={() => oncancel()}
						/>
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>
