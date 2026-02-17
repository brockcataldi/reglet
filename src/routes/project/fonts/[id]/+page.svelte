<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import type { Family } from '$lib/types';

	import fonts from '$lib/stores/fonts.svelte';

	import Input from '$lib/components/input.svelte';
	import Button from '$lib/components/button.svelte';
	import LinkButton from '$lib/components/link-button.svelte';
	import Face from './_components/face.svelte';
	import ArrowLeft from '$lib/icons/arrow-left.svelte';
	import Plus from '$lib/icons/plus.svelte';

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

	const onclickAdd = () => {
		if(family){
			fonts.createFace(family.id, {
				id: crypto.randomUUID(),
				weight: '400',
				style: 'normal',
				stretch: 'normal',
				opticalSizing: 'auto',
				variationSettings: []
			})
		}
	}
</script>

{#if family}
	<main class="mx-auto my-0 max-w-2xl">
		<header class="py-4">
			<LinkButton icon={ArrowLeft} href={resolve('/project/fonts/')}
				>Back to Fonts</LinkButton
			>
		</header>

		<div class="mb-4 grid grid-cols-[1fr_150px] items-end gap-4">
			<Input
				id={`${data.id}-family-`}
				label="Family"
				value={family.family}
				oninput={oninputFamily}
			/>

			<Button color="destructive" width="fit" onclick={onclickDelete}>
				Delete Family
			</Button>
		</div>

		<div class="mb-4">
			<Button icon={Plus} onclick={onclickAdd}>Add Face</Button>
		</div>

		<ul class="flex w-full flex-col items-start justify-start gap-4">
			{#each family.faces as face (face.id)}
				<li class="w-full">
					<Face familyId={family.id} faceId={face.id} />
				</li>
			{/each}
		</ul>
	</main>
{/if}
