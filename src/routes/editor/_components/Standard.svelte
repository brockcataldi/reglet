<script lang="ts">
	import project from '$lib/stores/project.svelte';

	import Breakpoint from './Breakpoint.svelte';
	import AddBreakpoint from './AddBreakpoint.svelte';
	import Button from '$lib/ui/button/button.svelte';

	let showAdd = $state(false);

	const openAdd = () => (showAdd = true);
	const hideAdd = () => (showAdd = false);
</script>

<section class="w-full border-y border-black py-8">
	<div class="mx-auto my-0 max-w-200">
		<header class="flex flex-row items-center justify-between">
			<h2 class="mb-4 text-5xl font-bold tracking-tighter text-black">
				Breakpoints
			</h2>

			{#if showAdd === false}
				<Button
					label="Add Breakpoint"
					variant="primary"
					onclick={openAdd}
				/>
			{/if}
		</header>

		{#if showAdd}
			<AddBreakpoint
				onadd={(newBreakpoint) => {
					project.createBreakpoint(newBreakpoint);
					showAdd = false;
				}}
				oncancel={hideAdd}
			/>
			<hr class="my-4" />
		{/if}

		<ul class="flex w-full flex-col gap-4">
			{#each project.sortedBreakpoints as breakpoint (`breakpoint-${breakpoint.id}`)}
				<li class="w-full">
					<Breakpoint
						{breakpoint}
						onnamechange={(newName) =>
							project.updateBreakpointName(breakpoint.id, newName)}
						onwidthchange={(newWidth) =>
							project.updateBreakpointWidth(breakpoint.id, newWidth)}
						ondelete={() => project.deleteBreakpoint(breakpoint.id)}
						onduplicate={() => project.duplicateBreakpoint(breakpoint.id)}
					/>
				</li>
			{/each}
		</ul>
	</div>
</section>
