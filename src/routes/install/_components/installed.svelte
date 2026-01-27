<script lang="ts">
	import FontFamily from './font-family.svelte';
	import Text from '$lib/components/text.svelte';

	import fonts from '$lib/stores/fonts.svelte';
	import Button from '$lib/components/button.svelte';

	const handleAddFamily = () => {
		fonts.createFamily({
			id: crypto.randomUUID(),
			family: 'New Font',
			stack: 'sans-serif',
			faces: [
				{
					weight: 400,
					style: 'normal',
					stretch: 'normal',
					opticalSize: 'auto',
					variationSettings: []
				}
			]
		});
	};
</script>

<section>
	<header>
		<div>
			<Text tag="h2">Fonts</Text>
			<Text tag="p">The following fonts have been recognized by Reglet.</Text>
		</div>
		<Button width="fit" onclick={handleAddFamily}>Add Font</Button>
	</header>
	<ul>
		{#each fonts.families as family, index (family.id)}
			<li>
				<FontFamily bind:family={fonts.families[index]} familyIndex={index} />
			</li>
		{/each}
	</ul>
</section>

<style>
	ul {
		list-style: none;
		padding: 0;
		margin: 0 0 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 1rem;
	}
</style>
