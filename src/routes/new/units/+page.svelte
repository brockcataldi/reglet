<script lang="ts">
	import {
		FONT_SIZE_UNITS,
		LETTER_SPACING_UNITS,
		type UnitOption
	} from '#lib/domain/project/units.js';
	import project from '#lib/stores/project.svelte.js';

	import RadioCard from '#lib/ui/form/radio-card.svelte';

	const draft = project.draft;
</script>

<svelte:head>
	<title>Units - Reglet</title>
</svelte:head>

{#snippet option(unit: UnitOption<string>)}
	<span class="flex items-center gap-4">
		<span class="w-14 shrink-0 text-2xl font-bold">{unit.value}</span>
		<span class="flex flex-col gap-1">
			<span class="font-bold">{unit.useCase}</span>
			<span class="text-sm">{unit.description}</span>
		</span>
	</span>
{/snippet}

<fieldset class="w-full">
	<legend class="text-2xl font-semibold tracking-tight">
		What is the type for?
	</legend>
	<div class="mt-3 flex flex-col gap-2">
		{#each FONT_SIZE_UNITS as unit (unit.value)}
			<RadioCard
				name="font-size-unit"
				value={unit.value}
				bind:group={draft.fontSizeUnit}
			>
				{@render option(unit)}
			</RadioCard>
		{/each}
	</div>
</fieldset>

<fieldset class="mt-8 w-full">
	<legend class="text-2xl font-semibold tracking-tight">
		How should letter spacing behave?
	</legend>
	<div class="mt-3 flex flex-col gap-2">
		{#each LETTER_SPACING_UNITS as unit (unit.value)}
			<RadioCard
				name="letter-spacing-unit"
				value={unit.value}
				bind:group={draft.letterSpacingUnit}
			>
				{@render option(unit)}
			</RadioCard>
		{/each}
	</div>
</fieldset>
