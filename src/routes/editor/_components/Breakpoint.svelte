<script lang="ts">
	import type { Breakpoint } from '$lib/types';

	import project from '$lib/stores/project.svelte';

	import Button from '$lib/ui/button/button.svelte';
	import Separator from '$lib/ui/display/separator.svelte';
	import Input from '$lib/ui/form/input.svelte';

	type BreakpointProps = {
		breakpoint: Breakpoint;
	};

	let { breakpoint }: BreakpointProps = $props();
</script>

<div class="w-full border border-black bg-white">
	<div class="group block p-4">
		<div class="flex flex-col items-start justify-start gap-4">
			<div>
				<Separator as="label" for={`breakpoint-label-${breakpoint.id}`}>
					Label
				</Separator>
				<Input
					id={`breakpoint-label-${breakpoint.id}`}
					class="text-4xl font-bold"
					value={breakpoint.label}
					oninput={(event) => {
						project.updateBreakpointName(
							breakpoint.id,
							event.currentTarget.value
						);
					}}
				/>
			</div>
			<div class="grid grid-cols-2 gap-4">
				<div>
					<Separator as="label" for={`breakpoint-width-${breakpoint.id}`}>
						Width Threshold
					</Separator>

					<div class="grid grid-cols-[1fr_32px]">
						<Input
							id={`breakpoint-width-${breakpoint.id}`}
							type="number"
							value={breakpoint.width}
							oninput={(event) => {
								const parsed = Number(event.currentTarget.value);
								project.updateBreakpointWidth(breakpoint.id, parsed);
							}}
						/>
						<p class="font-mono">px</p>
					</div>
				</div>
				<ul class="flex w-full flex-col items-start justify-start gap-2">
					<li class="w-full">
						<Button class="w-full" label="Duplicate" />
					</li>
					<li class="w-full">
						<Button
							class="w-full"
							variant="destructive"
							label="Delete"
							onclick={() => project.deleteBreakpoint(breakpoint.id)}
						/>
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>
