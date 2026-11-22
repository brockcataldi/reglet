<script lang="ts">
	import project from '#lib/stores/project.svelte.js';
	import type { FontSizeUnit } from '#lib/types.js';

	import Separator from '#lib/ui/display/separator.svelte';
	import RadioCard from '#lib/ui/form/radio-card.svelte';

	type UnitOption<T extends string> = {
		value: T;
		description: string;
	};

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
</script>

<svelte:head>
	<title>Font Size Unit - Reglet</title>
</svelte:head>

<div class="w-full">
	<Separator as="h2">Font Size Unit</Separator>
	<div class="grid grid-cols-4 gap-2">
		{#each fontSizeUnits as unit (unit.value)}
			<RadioCard value={unit.value} bind:group={project.fontSizeUnit}>
				<span class="flex flex-col gap-1">
					<span class="text-2xl font-semibold">{unit.value}</span>
					<span class="text-sm">{unit.description}</span>
				</span>
			</RadioCard>
		{/each}
	</div>
</div>
