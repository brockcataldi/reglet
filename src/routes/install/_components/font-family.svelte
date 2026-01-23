<script lang="ts">
	import type { Family } from '$lib/types';
	import FontFace from './font-face.svelte';

	type Props = {
		family: Family;
		familyIndex: number;
	};

	let { family = $bindable(), familyIndex }: Props = $props();
</script>

<details>
	<summary>
		<span>
			<code>
				font-family: "{family.family}", {family.stack};
			</code>

			<span>
				{family.faces.length} faces
			</span>
		</span>
	</summary>
	<div>
		<label for={`family-${familyIndex}`}>Family</label>
		<input
			type="text"
			bind:value={family.family}
			id={`family-${familyIndex}`}
		/>
	</div>
	<div>
		<label for={`family-${familyIndex}`}>Stack</label>
		<input type="text" bind:value={family.stack} id={`family-${familyIndex}`} />
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
</details>

<style>
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	li {
		width: 100%;
	}
</style>
