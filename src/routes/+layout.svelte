<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import fonts from '$lib/stores/fonts.svelte';

	import '$lib/style.css';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />

	{#each fonts.stylesheets as url (url.hash)}
		<link rel="stylesheet" href={url.url} id={url.hash} />
	{/each}
</svelte:head>

{@render children()}
