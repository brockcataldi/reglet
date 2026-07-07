<script lang="ts">
	import type { Breakpoint } from '$lib/types';

	import Button from '$lib/ui/button/button.svelte';
	import Input from '$lib/ui/form/input.svelte';

    let breakpoint = $state<Omit<Breakpoint, 'id'>>({
        label: '',
        width: 500,
        lanes: []
    });

    type AddBreakpointProps = {
        onadd: (newBreakpoint: Omit<Breakpoint, 'id'>) => void
    }

    let { onadd }: AddBreakpointProps = $props();
</script>

<div class="w-full border border-black bg-white">
	<div class="group block p-4">
		<div class="flex flex-col items-start justify-start gap-4">
			<div>
				<Input
					id='breakpoint-label-new'
					placeholder="ex. Mobile"
					class="text-4xl font-bold"
					bind:value={breakpoint.label}
				/>
				<label
					class="font-mono text-sm text-neutral-600 uppercase"
					for='breakpoint-label-new'
				>
					Breakpoint Label
				</label>
			</div>
			<div class="grid grid-cols-[2fr_3fr] gap-4">
				<div>
					<div class="grid grid-cols-[1fr_32px] items-center gap-2">
						<Input
							id='breakpoint-width-new'
							type="number"
							class="text-lg font-bold"
							bind:value={breakpoint.width}
						/>
						<p class="font-mono">px</p>
					</div>

					<label
						class="font-mono text-sm text-neutral-600 uppercase"
						for='breakpoint-width-new'
					>
						Width Threshold
					</label>
				</div>
				<div>
					<ul class="grid grid-cols-2 gap-2">
						<li class="w-full">
							<Button
								class="w-full"
								label="Create"
								onclick={() => {
                                    onadd(breakpoint);
                                    breakpoint = {
                                        label: '',
                                        width: 500,
                                        lanes: []
                                    }
                                }}
							/>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
