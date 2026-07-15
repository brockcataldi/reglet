<script lang="ts">
	import type { Breakpoint } from '$lib/types';

	type BreakpointProps = {
		breakpoint: Breakpoint;
	};

	let { breakpoint }: BreakpointProps = $props();
</script>

<pre>{JSON.stringify({ breakpoint: breakpoint }, null, 4)}</pre>
