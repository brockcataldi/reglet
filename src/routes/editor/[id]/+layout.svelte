<!-- <script lang="ts">
	import { page } from '$app/state';
	import { MODULAR_SCALE_RATIOS } from '#lib/constants.js';

	import project from '#lib/stores/project.svelte.js';

	import Separator from '#lib/ui/display/separator.svelte';
	import InputUnit from '#lib/ui/form/input-unit.svelte';
	import Select from '#lib/ui/form/select.svelte';

	let { children } = $props();

	let breakpoint = $derived(
		page.params.id ? project.breakpoints.get(page.params.id) : undefined
	);
</script>

{#if breakpoint}
	<aside
		class="fixed top-9 left-0 box-border h-screen w-64 border-r border-black bg-white p-4"
	>
		<div class="flex flex-col items-start justify-start gap-4">
			<div class="flex w-full flex-col items-center justify-start">
				<Separator for="breakpoint-base-size">Base Size</Separator>
				<InputUnit
					id="breakpoint-base-size"
					class="w-full"
					value={breakpoint.defaultScale.baseSize}
					variant="default"
					unit="rem"
					onchange={(event) =>
						project.breakpoints.updateDefaultScaleValue(
							breakpoint.id,
							'baseSize',
							Number(event.currentTarget.value)
						)}
				/>
			</div>
			<div class="flex w-full flex-col items-center justify-start">
				<Separator for="breakpoint-ratio">Ratio</Separator>
				<Select
					id="breakpoint-ratio"
					class="w-full"
					value={breakpoint.defaultScale.ratio}
					variant="default"
					onchange={(event) =>
						project.breakpoints.updateDefaultScaleValue(
							breakpoint.id,
							'ratio',
							Number(event.currentTarget.value)
						)}
				>
					<option value="custom">Custom</option>
					<hr />
					{#each MODULAR_SCALE_RATIOS as modularScaleRatio (`ratio-${modularScaleRatio.ratio}`)}
						<option value={modularScaleRatio.ratio}
							>{modularScaleRatio.ratio} - {modularScaleRatio.label}</option
						>
					{/each}
				</Select>
			</div>
		</div>
	</aside>

	<article class="ml-64">
		{@render children?.()}
	</article>
{/if} -->
