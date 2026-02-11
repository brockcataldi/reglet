<script lang="ts">
	import { resolve } from '$app/paths';

	import fonts from '$lib/stores/fonts.svelte';

	import Button from '$lib/components/button.svelte';
	import LinkButton from '$lib/components/link-button.svelte';
	import Demo from './_components/demo.svelte';
</script>

<main class="mx-auto my-0 max-w-2xl">
	<header class="mb-4 pt-8">
		<h1 class="mb-2 text-5xl font-bold">Fonts</h1>
		<p>
			These are all of the fonts currently recognized by reglet. If you don't
			see one auto imported or missing a variable axis you'll have to add it
			manually.
		</p>
	</header>
	<ul class="flex flex-col gap-4">
		{#each fonts.families as family (family.id)}
			<li>
				<div class="rounded-md border border-neutral-300 p-4">
					<header class="flex flex-row items-center justify-between">
						<div>
							<h2 class="text-2xl font-bold">{family.family}</h2>
							<code
								class="rounded-md border border-neutral-300 bg-neutral-50 px-2 py-1 text-sm"
								>font-family: <span>"{family.family}"</span>;</code
							>
						</div>
						<div>
							<LinkButton href={resolve(`/project/fonts/${family.id}`)}
								>Edit</LinkButton
							>
							<Button
								color="destructive"
								onclick={() => fonts.deleteFamily(family.id)}>Delete</Button
							>
						</div>
					</header>

					<div class="pt-4">
						<ul class="flex w-full flex-col items-start justify-start">
							{#each family.faces as face (face.id)}
								<Demo family={family.family} {face} />
							{/each}
						</ul>
					</div>
				</div>
			</li>
		{/each}
	</ul>
</main>
