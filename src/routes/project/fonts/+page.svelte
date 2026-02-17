<script lang="ts">
	import { resolve } from '$app/paths';

	import fonts from '$lib/stores/fonts.svelte';

	import Button from '$lib/components/button.svelte';
	import LinkButton from '$lib/components/link-button.svelte';
	import ToggleButton from '$lib/components/toggle-button.svelte';

	import FontDemo from '$lib/components/font-demo.svelte';

	import Plus from '$lib/icons/plus.svelte';
	import Pencil from '$lib/icons/pencil.svelte';
	import Trash from '$lib/icons/trash.svelte';

	let showSliders = $state<boolean>(true);
	let showValues = $state<boolean>(true);

	const onclickAdd = async () => {
		fonts.createFamily({
			id: crypto.randomUUID(),
			family: 'Arial',
			from: 'local',
			faces: [
				{
					id: crypto.randomUUID(),
					weight: '400',
					style: 'normal',
					stretch: 'normal',
					opticalSizing: 'auto',
					variationSettings: []
				}
			]
		});
	};
</script>

<main class="mx-auto my-0 max-w-2xl">
	<header class="mb-4 pt-8">
		<h1 class="mb-2 text-5xl font-bold">Fonts</h1>
		<p>
			These are all of the fonts currently recognized by reglet. If you don't
			see one auto imported or missing a variable axis you'll have to add it
			manually. Modifyable values in this do not stick, the range sliders are
			here to ensure your variable fonts are loading successfully.
		</p>
	</header>
	<div class="flex flex-row items-center justify-between pb-4">
		<Button icon={Plus} onclick={onclickAdd}>Add Family</Button>

		<div class="flex flex-row items-center justify-end gap-2">
			<ToggleButton id="toggle-values" bind:checked={showValues}>
				Show Values
			</ToggleButton>
			<ToggleButton id="toggle-sliders" bind:checked={showSliders}>
				Show Sliders
			</ToggleButton>
		</div>
	</div>
	<ul class="flex flex-col gap-4">
		{#each fonts.families as family (family.id)}
			<li>
				<div class="rounded-md border border-neutral-300 p-4">
					<header class="flex flex-row items-center justify-between">
						<div>
							<h2 class="text-2xl font-bold">{family.family}</h2>

							{#if showValues}
								<code
									class="rounded-md border border-neutral-300 bg-neutral-50 px-2 py-1 text-sm"
									>font-family: <span>"{family.family}"</span>;</code
								>
							{/if}
						</div>
						<div class="flex flex-row items-center justify-end gap-2">
							<LinkButton
								icon={Pencil}
								hideText={true}
								href={resolve(`/project/fonts/${family.id}`)}>Edit</LinkButton
							>
							<Button
								icon={Trash}
								hideText={true}
								color="destructive"
								onclick={() => fonts.deleteFamily(family.id)}>Delete</Button
							>
						</div>
					</header>

					<div class="pt-4">
						<ul class="flex w-full flex-col items-start justify-start">
							{#each family.faces as face (face.id)}
								<FontDemo
									familyId={family.id}
									faceId={face.id}
									{showSliders}
									{showValues}
								/>
							{/each}
						</ul>
					</div>
				</div>
			</li>
		{/each}
	</ul>
</main>
