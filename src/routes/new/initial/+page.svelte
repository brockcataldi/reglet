<script lang="ts">
	import project from '#lib/stores/project.svelte.js';
	import type {
		FontSizeUnit,
		LetterSpacingUnit,
		ProjectType
	} from '#lib/types.js';

	import Separator from '#lib/ui/display/separator.svelte';
	import RadioCard from '#lib/ui/form/radio-card.svelte';

	type UnitOption<T extends string> = {
		value: T;
		description: string;
	};

	const projectTypes: {
		value: ProjectType;
		name: string;
		description: string;
	}[] = [
		{
			value: 'standard',
			name: 'Breakpoints',
			description:
				'Start from a root and add breakpoints above it. Tags can move to other steps and lanes at each breakpoint; exports classes with media queries.'
		},
		{
			value: 'fluid',
			name: 'Fluid',
			description:
				'Sizes scale smoothly between a min and max width. Each tag stays on its lane; exports clamp() classes.'
		},
		{
			value: 'static',
			name: 'No breakpoints',
			description: 'One size per tag; exports plain classes.'
		}
	];

	const fontSizeUnits: UnitOption<FontSizeUnit>[] = [
		{
			value: 'rem',
			description:
				'Relative to the root font size; best for scalable, accessible type.'
		},
		{
			value: 'px',
			description:
				'Fixed pixel units; best when you need exact, device-independent sizing.'
		},
		{
			value: 'pt',
			description:
				'Print-oriented points; mainly for print styles, not typical screen UI type.'
		},
		{
			value: 'em',
			description:
				"Relative to the parent's font size; useful for components that scale with their context, but compounds when nested."
		}
	];

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
	<title>Initial Settings - Reglet</title>
</svelte:head>

<div class="mb-4 w-full">
	<Separator as="h2" description="Can't change later"
		>Project Type</Separator
	>
	<div class="flex flex-col gap-2">
		{#each projectTypes as type (type.value)}
			<RadioCard value={type.value} bind:group={project.draft.type}>
				<span class="flex flex-col gap-1">
					<span class="text-2xl font-semibold">{type.name}</span>
					<span class="text-sm">{type.description}</span>
				</span>
			</RadioCard>
		{/each}
	</div>
</div>

<div class="mb-4 w-full">
	<Separator as="h2">Font Size Unit</Separator>
	<div class="flex flex-col gap-2">
		{#each fontSizeUnits as unit (unit.value)}
			<RadioCard value={unit.value} bind:group={project.fontSizeUnit}>
				<span class="flex items-start gap-4">
					<span class="w-12 shrink-0 text-2xl font-semibold"
						>{unit.value}</span
					>
					<span class="text-sm">{unit.description}</span>
				</span>
			</RadioCard>
		{/each}
	</div>
</div>

<div class="w-full">
	<Separator as="h2">Letter Spacing Unit</Separator>
	<div class="flex flex-col gap-2">
		{#each letterSpacingUnits as unit (unit.value)}
			<RadioCard value={unit.value} bind:group={project.letterSpacingUnit}>
				<span class="flex items-start gap-4">
					<span class="w-12 shrink-0 text-2xl font-semibold"
						>{unit.value}</span
					>
					<span class="text-sm">{unit.description}</span>
				</span>
			</RadioCard>
		{/each}
	</div>
</div>
