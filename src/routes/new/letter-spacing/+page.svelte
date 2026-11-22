<script lang="ts">
	import project from '#lib/stores/project.svelte.js';
	import type { LetterSpacingUnit } from '#lib/types.js';

	import Separator from '#lib/ui/display/separator.svelte';
	import RadioCard from '#lib/ui/form/radio-card.svelte';

	type UnitOption<T extends string> = {
		value: T;
		description: string;
	};

	const letterSpacingUnits: UnitOption<LetterSpacingUnit>[] = [
		{
			value: 'em',
			description:
				"Relative to the element's own font size; tracking stays proportional at every size. The typical choice."
		},
		{
			value: 'rem',
			description:
				'Relative to the root font size; consistent spacing regardless of the text size.'
		},
		{
			value: 'ch',
			description:
				'Relative to the width of the "0" glyph; ties spacing to the typeface\'s proportions.'
		},
		{
			value: '%',
			description:
				"Percentage of the element's font size; mirrors design-tool tracking values (e.g. Figma)."
		},
		{
			value: 'px',
			description:
				'Fixed pixel units; exact spacing that does not scale with the text.'
		},
		{
			value: 'pt',
			description:
				'Print-oriented points; mainly for print styles, not typical screen UI type.'
		}
	];
</script>

<svelte:head>
	<title>Letter Spacing Unit - Reglet</title>
</svelte:head>

<div class="w-full">
	<Separator as="h2">Letter Spacing Unit</Separator>
	<div class="grid grid-cols-3 gap-2">
		{#each letterSpacingUnits as unit (unit.value)}
			<RadioCard value={unit.value} bind:group={project.letterSpacingUnit}>
				<span class="flex flex-col gap-1">
					<span class="text-2xl font-semibold">{unit.value}</span>
					<span class="text-sm">{unit.description}</span>
				</span>
			</RadioCard>
		{/each}
	</div>
</div>
