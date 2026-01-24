<script lang="ts">
	import Accordion from '$lib/components/accordion.svelte';
	import Input from '$lib/components/input.svelte';
	import type { Family } from '$lib/types';
	import FontFace from './font-face.svelte';

	type Props = {
		family: Family;
		familyIndex: number;
	};

	let { family = $bindable(), familyIndex }: Props = $props();
</script>

<Accordion justify="between">
	{#snippet header()}
		<h3>
			<code class="summary__family">
				font-family: "{family.family}", {family.stack};
			</code>
		</h3>

		<span class="summary__faces">
			{family.faces.length} faces
		</span>
	{/snippet}
	<div>
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

		<h4>Faces</h4>
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
	</div>
</Accordion>

<style>
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
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
		border: 1px solid white;
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

	h4 {
		margin: 1rem 0;
		font-family: var(--ff-ss);
		font-size: 1.25rem;
	}
</style>
