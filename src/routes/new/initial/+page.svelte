<script lang="ts">
	import projectSettings from '$lib/stores/project-settings.svelte';

	import Separator from '$lib/ui/display/separator.svelte';
	import RadioCard from '$lib/ui/form/radio-card.svelte';
</script>

<svelte:head>
	<title>Initial Settings - Reglet</title>
</svelte:head>

<div class="w-full">
	<Separator as="h2">Project Type</Separator>
	<div class="grid grid-cols-2 gap-2">
		<RadioCard
			value="standard"
			class="h-full"
			bind:group={projectSettings.type}
		>
			<span class="block text-2xl font-semibold">Standard</span>
			<span class="text-sm"
				>Type sizes change at specific screen widths using set breakpoints.</span
			>
		</RadioCard>
		<RadioCard value="fluid" class="h-full" bind:group={projectSettings.type}>
			<span class="block text-2xl font-semibold">Fluid</span>
			<span class="text-sm"
				>Type scales smoothly between sizes based on the viewport or container.</span
			>
		</RadioCard>
	</div>
</div>

<div class="mt-4 w-full">
	<Separator as="h2">Unit</Separator>
	<div class="grid grid-cols-3 gap-2">
		<RadioCard value="rem" bind:group={projectSettings.unit}>
			<span class="block text-2xl font-semibold">rem</span>
			<span class="text-sm"
				>Relative to the root font size; best for scalable, accessible type.</span
			>
		</RadioCard>
		<RadioCard value="px" bind:group={projectSettings.unit}>
			<span class="block text-2xl font-semibold">px</span>
			<span class="text-sm"
				>Fixed pixel units; best when you need exact, device-independent sizing.
			</span>
		</RadioCard>
		<RadioCard value="pt" bind:group={projectSettings.unit}>
			<span class="block text-2xl font-semibold">pt</span>
			<span class="text-sm"
				>Print-oriented points; mainly for print styles, not typical screen UI
				type.</span
			>
		</RadioCard>
	</div>
</div>
