<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	import project from '$lib/stores/project.svelte';
	import settings from '$lib/stores/settings.svelte';
	import { formatMaybePlurals } from '$lib/utilities';

	let { children } = $props();

	let id = $derived(page.params.id);
</script>

<div class="h-dvh w-full">
	<header
		class="fixed top-0 left-0 z-10 w-full border-b border-b-black bg-white"
	>
		<div class="flex flex-row items-center justify-between">
			<div class="flex flex-row items-center justify-start">
				{#if id === undefined}
					<span class="w-40 border-r bg-black px-2 py-1">
						<h1
							class="text-3xl font-bold tracking-tighter text-sunburst-500"
						>
							Reglet
						</h1>
					</span>
				{:else}
					<a
						href={resolve('/editor')}
						class="w-40 border-r border-r-black bg-sunburst-500 px-2 py-1 text-black
                            hover:bg-cobalt-500 hover:text-white
							focus-visible:bg-cobalt-500 focus-visible:text-white"
					>
						<h1 class="text-3xl font-bold tracking-tighter">Reglet</h1>
					</a>
				{/if}
				<nav>
					<ul class="flex flex-row">
						{#each project.breakpoints as breakpoint (breakpoint.id)}
							{#if breakpoint.id === id}
								<li class="w-fit">
									<span
										class="block min-w-30 border-r border-r-black bg-black px-4 py-1 text-white"
									>
										<span class="block font-mono text-sm">
											{#if settings.type === 'standard' && breakpoint.width === 0}
												Root
											{:else}
												{breakpoint.width}px
											{/if}
										</span>
										<span class="block font-mono text-xs"
											>{breakpoint.lanes.length}
											{formatMaybePlurals(
												breakpoint.lanes.length,
												'lane'
											)}</span
										>
									</span>
								</li>
							{:else}
								<li class="w-fit">
									<a
										href={resolve(`/editor/${breakpoint.id}`)}
										class="block min-w-30 border-r border-r-black bg-white px-4 py-1 text-black hover:bg-cobalt-500 hover:text-white focus-visible:bg-cobalt-500 focus-visible:text-white"
									>
										<span class="block font-mono text-sm">
											{#if settings.type === 'standard' && breakpoint.width === 0}
												Root
											{:else}
												{breakpoint.width}px
											{/if}
										</span>
										<span class="block font-mono text-xs"
											>{breakpoint.lanes.length}
											{formatMaybePlurals(
												breakpoint.lanes.length,
												'lane'
											)}</span
										>
									</a>
								</li>
							{/if}
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
