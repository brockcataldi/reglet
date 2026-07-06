<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	import project from '$lib/stores/project.svelte';
	import { formatMaybePlurals } from '$lib/utilities';
	import NavigationItem from './_components/NavigationItem.svelte';

	let { children } = $props();

	let id = $derived(page.params.id);
</script>

<div class="h-dvh w-full">
	<header
		class="fixed top-0 left-0 z-10 w-full border-b border-b-black bg-white"
	>
		<div class="flex flex-row items-center justify-between">
			<div class="flex flex-row items-center justify-start">
				<div
					class="w-40 border-r border-r-black bg-sunburst-500 px-2 py-1 text-black"
				>
					<p class="text-3xl font-bold tracking-tighter">Reglet</p>
				</div>
				<nav>
					<ul class="flex flex-row">
						<li class="w-fit">
							<NavigationItem
								href={resolve('/editor/')}
								active={id === undefined}
							>
								<span class="block font-mono text-sm font-bold">
									Home
								</span>
								<span class="block font-mono text-xs"
									>Edit Breakpoints</span
								>
							</NavigationItem>
						</li>
						{#each project.breakpoints as breakpoint (breakpoint.id)}
							<li class="w-fit">
								<NavigationItem
									href={resolve(`/editor/${breakpoint.id}`)}
									active={breakpoint.id === id}
								>
									<span class="block font-mono text-sm font-bold">
										{#if breakpoint.label === ''}
											Needs Title
										{:else}
											{breakpoint.label}
										{/if}
									</span>
									<span class="block font-mono text-xs"
										>{breakpoint.lanes.length}
										{formatMaybePlurals(
											breakpoint.lanes.length,
											'lane'
										)}</span
									>
								</NavigationItem>
							</li>
						{/each}
					</ul>
				</nav>
			</div>
		</div>
	</header>

	<main class="relative min-h-dvh w-full pt-11.25">
		{@render children?.()}
	</main>
</div>
