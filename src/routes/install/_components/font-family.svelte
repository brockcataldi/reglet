<script lang="ts">
	import type { Family } from '$lib/types';

	import Accordion from '$lib/components/accordion.svelte';
	import Input from '$lib/components/input.svelte';
	import Text from '$lib/components/text.svelte';

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
		<h3>
			<code>
				font-family: "{family.family}", {family.stack};
			</code>
		</h3>

		<span>
			{family.faces.length} faces
		</span>
	{/snippet}
	<fieldset>
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

	<div>
		<Text tag="h4">Faces</Text>
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

<style>
	ul {
		list-style: none;
		padding: 0;
		margin: 0 0 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	li {
		width: 100%;
	}

	code {
		font-family: var(--ff-m);
		font-size: 0.875rem;
	}

	span {
		font-family: var(--ff-ss);
		font-size: 0.875rem;
		padding: 0.25rem 0.5rem;
		border: 1px solid var(--c-whi);
		border-radius: 0.25rem;
	}

	h3 {
		font-weight: 400;
		font-size: 0.875rem;
		margin: 0;
	}

	fieldset {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		padding: 0;
		margin: 0;
		border: none;
	}

	div {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		margin: 1rem 0;
	}
</style>
