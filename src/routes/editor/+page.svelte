<script lang="ts">
	import project from '$lib/stores/project.svelte';
</script>

<h2>Editor Index</h2>

<ul>
	{#each project.breakpoints as breakpoint (breakpoint.id)}
		<li>
			<h2>
				{breakpoint.width}
			</h2>
		</li>
	{/each}
</ul>
