<script lang="ts">
	import project from '#lib/stores/project.svelte.js';
	import type { ProjectType } from '#lib/types.js';

	import Banner from '#lib/ui/display/banner.svelte';
	import RadioCard from '#lib/ui/form/radio-card.svelte';

	const projectTypes: {
		value: ProjectType;
		name: string;
		description: string;
		// font size (y, up is bigger) against screen width (x)
		graph: string;
	}[] = [
		{
			value: 'standard',
			name: 'Breakpoints',
			description:
				'Start from a root and add breakpoints above it. Tags can move to other steps and lanes at each breakpoint.',
			graph: 'M4 40 H30 V26 H56 V12 H96'
		},
		{
			value: 'fluid',
			name: 'Fluid',
			description:
				'Place each tag at a min and a max width and its size slides between them.',
			graph: 'M4 40 H24 L76 12 H96'
		},
		{
			value: 'static',
			name: 'No breakpoints',
			description: 'One size per tag.',
			graph: 'M4 26 H96'
		}
	];
</script>

<svelte:head>
	<title>Project Type - Reglet</title>
</svelte:head>

<fieldset class="w-full">
	<legend class="mb-4">
		Graphs show font size against screen width.
	</legend>
	<div class="grid grid-cols-3 gap-2">
		{#each projectTypes as type (type.value)}
			<RadioCard
				name="project-type"
				value={type.value}
				bind:group={project.draft.type}
			>
				<span class="flex flex-col gap-2">
					<svg
						viewBox="0 0 100 48"
						class="h-12 w-full"
						aria-hidden="true"
						fill="none"
						stroke="currentColor"
					>
						<path d="M4 4 V44 H96" stroke-width="1" opacity="0.4" />
						<path d={type.graph} stroke-width="2.5" />
					</svg>
					<span class="text-2xl font-semibold">{type.name}</span>
					<span class="text-sm">{type.description}</span>
				</span>
			</RadioCard>
		{/each}
	</div>

	<Banner class="mt-4">
		The project type can't be changed once the project is created.
	</Banner>
</fieldset>
