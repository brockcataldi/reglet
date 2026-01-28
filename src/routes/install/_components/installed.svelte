<script lang="ts">
	import fonts from '$lib/stores/fonts.svelte';

	import Button from '$lib/components/button.svelte';
	import FontFamily from './font-family.svelte';

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

	function handleClearFamilies() {
		fonts.clearFamilies();
	}
</script>

<section class="mb-8">
	<header class="mb-4 flex items-center justify-between gap-2">
		<div>
			<h2 class="mb-2 text-3xl font-bold">Fonts</h2>
			<p class="mb-4 text-base">
				The following fonts have been recognized by Reglet.
			</p>
		</div>
		<Button width="fit" onclick={handleAddFamily}>Add Font</Button>
	</header>
	<ul class="mb-4">
		{#each fonts.families as family, index (family.id)}
			<li class="mb-2">
				<FontFamily bind:family={fonts.families[index]} familyIndex={index} />
			</li>
		{/each}
	</ul>
	<div>
		<Button
			width="fit"
			disabled={fonts.families.length === 0}
			color="error"
			onclick={handleClearFamilies}>Clear Fonts</Button
		>
	</div>
</section>
