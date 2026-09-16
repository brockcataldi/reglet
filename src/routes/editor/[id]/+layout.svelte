<script lang="ts">
	import { page } from '$app/state';
	import { MODULAR_SCALE_RATIOS } from '$lib/constants';

	import project from '$lib/stores/project.svelte';
	
    import Separator from '$lib/ui/display/separator.svelte';
	import InputUnit from '$lib/ui/form/input-unit.svelte';
	import Select from '$lib/ui/form/select.svelte';

	let { children } = $props();

    let breakpoint = $derived((page.params.id) ? project.readBreakpoint(page.params.id) : undefined);
</script>

{#if breakpoint}
    <aside class="w-48 h-screen top-11.25 fixed left-0 bg-white border-r border-black p-4 box-border">
        <div class="flex flex-col items-start justify-start gap-4">
            <div class="flex flex-col items-center justify-start w-full">
                <Separator for="breakpoint-base-size">
                    Base Size
                </Separator>
                <InputUnit id="breakpoint-base-size" class="w-full" value={breakpoint.defaultScale.baseSize} variant="default" unit="rem" onchange={(event) => project.updateBreakpointDefaultScaleBase(breakpoint.id, Number(event.currentTarget.value)) }/>
            </div>
            <div class="flex flex-col items-center justify-start w-full">
                <Separator for="breakpoint-ratio">
                    Ratio
                </Separator>
                <Select id="breakpoint-ratio" class="w-full" value={breakpoint.defaultScale.ratio} variant="default"  onchange={(event) => project.updateBreakpointDefaultScaleRatio(breakpoint.id, Number(event.currentTarget.value)) }>
                    {#each MODULAR_SCALE_RATIOS as modularScaleRatio (`ratio-${modularScaleRatio.ratio}`)}
                        <option value={modularScaleRatio.ratio}>{modularScaleRatio.ratio} - {modularScaleRatio.label}</option>
                    {/each}
                </Select>
            </div>
        </div>
    </aside>

    <article class="ml-48">
        {@render children?.()}
    </article>
{/if}