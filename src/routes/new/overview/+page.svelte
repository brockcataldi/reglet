<script>
	import projectSettings from '$lib/stores/project-settings.svelte';
</script>

<svelte:head>
	<title>Overview // Reglet</title>
</svelte:head>

<dl>
	<div>
		<dt>Type</dt>
		<dd>{projectSettings.type}</dd>
	</div>
	<div>
		<dt>Units</dt>
		<dd>{projectSettings.unit}</dd>
	</div>
</dl>
