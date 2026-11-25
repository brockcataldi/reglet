<script lang="ts">
	import project from '#lib/stores/project.svelte.js';
	import {
		FONT_SIZE_UNITS,
		LETTER_SPACING_UNITS
	} from '#lib/domain/project/units.js';

	import Separator from '#lib/ui/display/separator.svelte';
	import RadioCard from '#lib/ui/form/radio-card.svelte';
</script>

<svelte:head>
	<title>Units - Reglet</title>
</svelte:head>

<div class="mb-4 w-full">
	<Separator as="h2">Font Size Unit</Separator>
	<div class="grid grid-cols-2 gap-2">
		{#each FONT_SIZE_UNITS as unit (unit.value)}
			<RadioCard
				name="font-size-unit"
				value={unit.value}
				bind:group={project.draft.fontSizeUnit}
			>
				<span class="flex flex-col gap-1">
					<span class="text-2xl font-semibold">{unit.value}</span>
					<span class="text-sm">{unit.description}</span>
				</span>
			</RadioCard>
		{/each}
	</div>
</div>

<div class="w-full">
	<Separator as="h2">Letter Spacing Unit</Separator>
	<div class="grid grid-cols-3 gap-2">
		{#each LETTER_SPACING_UNITS as unit (unit.value)}
			<RadioCard
				name="letter-spacing-unit"
				value={unit.value}
				bind:group={project.draft.letterSpacingUnit}
			>
				<span class="flex flex-col gap-1">
					<span class="text-2xl font-semibold">{unit.value}</span>
					<span class="text-sm">{unit.description}</span>
				</span>
			</RadioCard>
		{/each}
	</div>
</div>
