<script lang="ts">
	import '../app.css';
	import favicon from '#lib/assets/favicon.svg';
	import project from '#lib/stores/project.svelte.js';

	let { children } = $props();

	// picks up removed stylesheets; additions are handled by onload below
	$effect(() => {
		void project.fonts.stylesheets;
		project.fonts.refresh();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	{#each project.fonts.stylesheets as href (href)}
		<link rel="stylesheet" {href} onload={() => project.fonts.refresh()} />
	{/each}
</svelte:head>
{@render children()}
