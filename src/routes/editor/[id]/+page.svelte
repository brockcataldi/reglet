<script lang="ts">
	import type { PageProps } from './$types';
	import project from '$lib/stores/project.svelte';

	let { params }: PageProps = $props();
</script>

<pre>{JSON.stringify(
		{ id: params.id, breakpoints: project.breakpoints },
		null,
		4
	)}</pre>
