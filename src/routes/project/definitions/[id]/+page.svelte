<script lang="ts">
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';

	import Measure from './_components/measure.svelte';
	import LinkButton from '$lib/components/link-button.svelte';
	import ArrowLeft from '$lib/icons/arrow-left.svelte';
	import styles from '$lib/stores/profiles.svelte.js';

	let { data } = $props();

	$effect(() => {
		if (data.id === undefined) {
			goto(resolve('/project/definitions'));
		}
	});

	const exists = $derived(styles.exists(data.id));

	$effect(() => {
		if (exists === false) {
			goto(resolve('/project/definitions'));
		}
	});
</script>

{#if data.id}
	<main class="mx-auto my-0 max-w-2xl">
		<header>
			<LinkButton icon={ArrowLeft} href={resolve('/project/definitions/')}
				>Back to Definitions</LinkButton
			>
		</header>

		<Measure id={data.id} />
	</main>
{/if}
