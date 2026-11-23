<script lang="ts">
	import project from '#lib/stores/project.svelte.js';
	import type { ProjectType } from '#lib/types.js';

	import RadioCard from '#lib/ui/form/radio-card.svelte';

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
</script>

<svelte:head>
	<title>Project Type - Reglet</title>
</svelte:head>

<div class="w-full">
	<div class="grid grid-cols-3 gap-2">
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
