<script lang="ts">
	import projectSettings from '$lib/stores/project-settings.svelte';

	import RadioCard from '$lib/ui/form/RadioCard.svelte';
</script>

<div class="w-full">
	<h2 class="font-mono text-sm text-neutral-400 uppercase">Project Type</h2>
	<hr class="my-2 text-neutral-400" />
	<div class="grid grid-cols-2 gap-2">
		<RadioCard value="standard" class="h-full" bind:group={projectSettings.type}>
			<span class="block font-semibold">Standard</span>
			<span class="text-sm">Type sizes change at specific screen widths using set breakpoints.</span
			>
		</RadioCard>
		<RadioCard value="fluid" class="h-full" bind:group={projectSettings.type}>
			<span class="block font-semibold">Fluid</span>
			<span class="text-sm"
				>Type scales smoothly between sizes based on the viewport or container.</span
			>
		</RadioCard>
	</div>
</div>

<div class="w-full">
	<h2 class="font-mono text-sm text-neutral-400 uppercase">Unit</h2>
	<hr class="my-2 text-neutral-400" />
	<div class="grid grid-cols-3 gap-2">
		<RadioCard value="rem" bind:group={projectSettings.unit}>
			<span class="block font-semibold">rem</span>
			<span class="text-sm"
				>Relative to the root font size; best for scalable, accessible type.</span
			>
		</RadioCard>
		<RadioCard value="px" bind:group={projectSettings.unit}>
			<span class="block font-semibold">px</span>
			<span class="text-sm"
				>Fixed pixel units; best when you need exact, device-independent sizing.
			</span>
		</RadioCard>
		<RadioCard value="pt" bind:group={projectSettings.unit}>
			<span class="block font-semibold">pt</span>
			<span class="text-sm"
				>Print-oriented points; mainly for print styles, not typical screen UI type.</span
			>
		</RadioCard>
	</div>
</div>
