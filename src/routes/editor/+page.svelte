<script lang="ts">
	import settings from '$lib/stores/settings.svelte';
	import Standard from './_components/Standard.svelte';
</script>

{#if settings.type === 'standard'}
	<Standard />
{:else}
	<h1>Fluid Project</h1>
{/if}
