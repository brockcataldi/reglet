<script lang="ts">
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';

	import styles from '$lib/stores/profiles.svelte';

	import LinkButton from '$lib/components/link-button.svelte';
	import ArrowLeft from '$lib/icons/arrow-left.svelte';

	import Measure from './_components/measure.svelte';

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

			<h1>Measurements</h1>

			<p>
				The objective is to analyze the typeface's anatomy in order to identify
				its natural visual rhythm.
			</p>
			<ul>
				<li>Align the ascender line to the top of the <code>d</code></li>
				<li>Align the cap height line to the top of the <code>H</code></li>
				<li>Align the x-height line to the top of the <code>x</code></li>
				<li>Align the baseline line to the bottom of the <code>x</code></li>
				<li>Align the descender line to the bottom of the <code>p</code></li>
			</ul>
		</header>

		<Measure id={data.id} />
	</main>
{/if}
