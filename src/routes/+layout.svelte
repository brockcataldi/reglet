<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import stylesheets from '$lib/stores/stylesheets.svelte';
	import '$lib/style.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />

	{#each stylesheets.stylesheets as url (url.id)}
		<link rel="stylesheet" href={url.url} id={url.id} />
	{/each}
</svelte:head>

{@render children()}
