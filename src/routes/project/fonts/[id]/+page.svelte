<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import type { Family } from '$lib/types';

	import fonts from '$lib/stores/fonts.svelte';
	import Input from '$lib/components/input.svelte';
	import Button from '$lib/components/button.svelte';
	import Face from './_components/face.svelte';

	let { data } = $props();

	$effect(() => {
		if (data.id === undefined) {
			goto(resolve('/project/fonts'));
		}
	});

	let family = $derived<Family | undefined>(
		fonts.families.find((family) => {
			return family.id === data.id;
		})
	);

	$effect(() => {
		if (family === undefined) {
			goto(resolve('/project/fonts'));
		}
	});

	const oninputFamily = (event: Event) => {
		const target = event.target as HTMLInputElement;

		if (family) {
			fonts.updateFamilyFamily(family.id, target.value);
		}
	};

	const onclickDelete = () => {
		if (family) {
			fonts.deleteFamily(family.id);
		}
	};
</script>

{#if family}
	<main class="p-4">
		<header class="mb-4 grid grid-cols-[1fr_150px] items-end gap-4">
			<Input
				id={`${data.id}-family-`}
				label="Family"
				value={family.family}
				oninput={oninputFamily}
			/>

			<Button color="error" width="fit" onclick={onclickDelete}>
				Delete Family
			</Button>
		</header>

		<ul class="flex flex-col items-start justify-start gap-4">
			{#each family.faces as face (face.id)}
				<li>
					<Face familyId={family.id} faceId={face.id} />
				</li>
			{/each}
		</ul>
	</main>
{/if}
