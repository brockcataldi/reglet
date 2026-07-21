<script lang="ts">
	import type { PageProps } from './$types';
	import project from '$lib/stores/project.svelte';
	import Breakpoint from './_components/Breakpoint.svelte';

	let { params }: PageProps = $props();

	let breakpoint = $derived(project.readBreakpoint(params.id));
</script>

<svelte:head>
	{#if breakpoint}
		<title>{breakpoint.label} - Reglet</title>
	{/if}
</svelte:head>

{#if breakpoint}
	<Breakpoint {breakpoint} />
{/if}
