<script lang="ts">
	import type { Family } from '$lib/types';

	import Accordion from '$lib/components/accordion.svelte';
	import Input from '$lib/components/input.svelte';

	import FontFace from './font-face.svelte';
	import Button from '$lib/components/button.svelte';

	import fonts from '$lib/stores/fonts.svelte';

	type Props = {
		family: Family;
		familyIndex: number;
	};

	let { family = $bindable(), familyIndex }: Props = $props();

	const handleDeleteFamily = () => {
		fonts.deleteFamily(familyIndex);
	};

	const handleAddFace = () => {
		fonts.createFace(familyIndex, {
			weight: 400,
			style: 'normal',
			stretch: 'normal',
			opticalSize: 'auto',
			variationSettings: []
		});
	};
</script>

<Accordion justify="between">
	{#snippet header()}
		<h3 class="align-start flex flex-col justify-center text-sm font-normal">
			<code class="font-mono">
				font-family: "{family.family}", {family.stack};
			</code>
		</h3>

		<span class="text-base">
			{family.faces.length} faces
		</span>
	{/snippet}

	<fieldset class="mb-4 flex gap-2">
		<legend class="sr-only">Family & Stack</legend>
		<Input
			id={`family-${familyIndex}`}
			label="Family"
			bind:value={family.family}
		/>
		<Input
			id={`stack-${familyIndex}`}
			label="Stack"
			bind:value={family.stack}
		/>
	</fieldset>

	<div class="mb-4 flex items-center justify-between gap-2">
		<h4 class="mb-2 text-xl font-bold">Faces</h4>
		<Button size="small" width="fit" color="primary" onclick={handleAddFace}
			>Add Face</Button
		>
	</div>

	<ul>
		{#each family.faces as _, faceIndex (`${familyIndex}-${faceIndex}`)}
			<li>
				<FontFace
					bind:face={family.faces[faceIndex]}
					{familyIndex}
					{faceIndex}
				/>
			</li>
		{/each}
	</ul>

	<Button size="small" width="full" color="error" onclick={handleDeleteFamily}
		>Delete Family</Button
	>
</Accordion>
